import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCity, FaArrowRight, FaArrowLeft, FaGlobeAmericas, FaCheck } from "react-icons/fa";

// Form validation schema
const schema = yup.object({
  state: yup.string().required("Estado é obrigatório"),
  city: yup.string().when("customCity", {
    is: false,
    then: (schema) => schema.required("Cidade é obrigatória"),
    otherwise: (schema) => schema
  }),
  customCity: yup.boolean(),
  customCityName: yup.string().when("customCity", {
    is: true,
    then: (schema) => schema.required("Nome da cidade é obrigatório"),
    otherwise: (schema) => schema
  }),
}).required();

type FormData = yup.InferType<typeof schema>;

// Brazilian states
const states = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

// Cities for each state
const getCitiesByState = (stateCode: string): string[] => {
  const cities: Record<string, string[]> = {
    SP: ["São Paulo", "Campinas", "Guarulhos", "Santos", "Ribeirão Preto", "São Bernardo do Campo", "Santo André", "Osasco"],
    RJ: ["Rio de Janeiro", "Niterói", "Búzios", "Petrópolis", "Angra dos Reis", "São Gonçalo", "Nova Iguaçu", "Duque de Caxias"],
    MG: ["Belo Horizonte", "Juiz de Fora", "Ouro Preto", "Uberlândia", "Tiradentes", "Contagem", "Uberaba", "São Thomé das Letras"],
    BA: ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Porto Seguro", "Ilhéus"],
    PR: ["Curitiba", "Londrina", "Maringá", "Foz do Iguaçu", "Ponta Grossa", "Cascavel"],
    RS: ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria", "Gramado"],
    SC: ["Florianópolis", "Joinville", "Blumenau", "Balneário Camboriú", "Criciúma", "Chapecó"],
    GO: ["Goiânia", "Anápolis", "Rio Verde", "Aparecida de Goiânia", "Caldas Novas", "Catalão"],
    PE: ["Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru", "Petrolina", "Paulista"],
    CE: ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral", "Crato"],
    PA: ["Belém", "Ananindeua", "Santarém", "Marabá", "Castanhal", "Parauapebas"],
    AM: ["Manaus", "Parintins", "Itacoatiara", "Manacapuru", "Coari", "Tefé"],
    ES: ["Vitória", "Vila Velha", "Serra", "Cariacica", "Cachoeiro de Itapemirim", "Linhares"],
    DF: ["Brasília", "Ceilândia", "Taguatinga", "Plano Piloto", "Samambaia", "Águas Claras"],
    MS: ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã", "Naviraí"],
    MT: ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Tangará da Serra", "Cáceres"],
    MA: ["São Luís", "Imperatriz", "Timon", "Caxias", "Codó", "Açailândia"],
    AL: ["Maceió", "Arapiraca", "Rio Largo", "Palmeira dos Índios", "União dos Palmares", "Penedo"],
    PI: ["Teresina", "Parnaíba", "Picos", "Piripiri", "Campo Maior", "Floriano"],
    RN: ["Natal", "Mossoró", "Parnamirim", "São Gonçalo do Amarante", "Macauíba", "Caicó"],
    PB: ["João Pessoa", "Campina Grande", "Santa Rita", "Patos", "Bayeux", "Cabedelo"],
    SE: ["Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Itabaiana", "São Cristóvão", "Estância"],
    RO: ["Porto Velho", "Ji-Paraná", "Ariquemes", "Vilhena", "Cacoal", "Rolim de Moura"],
    TO: ["Palmas", "Araguaína", "Gurupi", "Porto Nacional", "Paraíso do Tocantins", "Colinas do Tocantins"],
    AC: ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Tarauacá", "Feijó", "Brasileia"],
    AP: ["Macapá", "Santana", "Laranjal do Jari", "Oiapoque", "Mazagão", "Porto Grande"],
    RR: ["Boa Vista", "Caracaraí", "Rorainópolis", "Alto Alegre", "Mucajaí", "Cantá"],
  };
  
  // If the state code is not found, return an empty array
  if (!cities[stateCode]) {
    return ["Cidade não disponível"];
  }
  
  return cities[stateCode];
};

// Animations for elements
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function OriginPage() {
  const [, setLocation] = useLocation();
  const { origin, setOrigin, setCurrentStep } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      state: origin?.state || "",
      city: origin?.city || "",
      customCity: origin?.customCity || false,
      customCityName: "",
    }
  });
  
  const watchState = watch("state");
  const watchCustomCity = watch("customCity");
  
  // Load cities when state changes
  useEffect(() => {
    if (watchState) {
      setAvailableCities(getCitiesByState(watchState));
    }
  }, [watchState]);
  
  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    
    // Save origin data
    setOrigin({
      state: data.state,
      city: data.customCity ? data.customCityName! : data.city,
      customCity: data.customCity,
    });
    
    // Update current step
    setCurrentStep(2);
    
    // Navigate to transport page
    setTimeout(() => {
      setLocation("/transporte");
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-[#f5f5f5]">
        <ProgressBar />
        
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            className="ipass-card relative overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#02ab89] opacity-10"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#02ab89] opacity-10"></div>
            
            <motion.div variants={itemVariants} className="relative z-10">
              <div className="flex items-center mb-6">
                <FaMapMarkerAlt className="text-[#02ab89] text-2xl mr-3" />
                <h1 className="text-2xl font-bold text-[#333333]">Qual a sua cidade de origem?</h1>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label htmlFor="state" className="ipass-label flex items-center">
                    <FaGlobeAmericas className="mr-2 text-[#02ab89]" />
                    Estado
                  </label>
                  <select
                    id="state"
                    className="ipass-input hover-shadow transition-all"
                    {...register("state")}
                  >
                    <option value="">Selecione um estado</option>
                    {states.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <motion.p 
                      className="mt-2 text-sm text-red-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.state.message}
                    </motion.p>
                  )}
                </motion.div>
                
                {watchState && !watchCustomCity && (
                  <motion.div 
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="city" className="ipass-label flex items-center">
                      <FaCity className="mr-2 text-[#02ab89]" />
                      Cidade
                    </label>
                    <select
                      id="city"
                      className="ipass-input hover-shadow transition-all"
                      {...register("city")}
                    >
                      <option value="">Selecione uma cidade</option>
                      {availableCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <motion.p 
                        className="mt-2 text-sm text-red-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {errors.city.message}
                      </motion.p>
                    )}
                  </motion.div>
                )}
                
                <motion.div variants={itemVariants} className="flex items-center">
                  <div className="relative inline-flex items-center">
                    <input
                      id="customCity"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-[#02ab89] focus:ring-[#02ab89]"
                      {...register("customCity")}
                      onChange={(e) => {
                        setValue("customCity", e.target.checked);
                        if (e.target.checked) {
                          setValue("city", "");
                        } else {
                          setValue("customCityName", "");
                        }
                      }}
                    />
                    <div className="absolute left-0 top-0 h-4 w-4 pointer-events-none flex items-center justify-center">
                      {watchCustomCity && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-white text-xs"
                        >
                          <FaCheck className="text-white text-[8px]" />
                        </motion.span>
                      )}
                    </div>
                  </div>
                  <label htmlFor="customCity" className="ml-2 block text-sm text-[#333333]">
                    Minha cidade não está na lista
                  </label>
                </motion.div>
                
                {watchCustomCity && (
                  <motion.div 
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="customCityName" className="ipass-label flex items-center">
                      <FaCity className="mr-2 text-[#02ab89]" />
                      Nome da cidade
                    </label>
                    <input
                      type="text"
                      id="customCityName"
                      className="ipass-input hover-shadow transition-all"
                      placeholder="Digite o nome da sua cidade"
                      {...register("customCityName")}
                    />
                    {errors.customCityName && (
                      <motion.p 
                        className="mt-2 text-sm text-red-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {errors.customCityName.message}
                      </motion.p>
                    )}
                  </motion.div>
                )}
                
                <motion.div variants={itemVariants} className="flex justify-between pt-4">
                  <motion.button
                    type="button"
                    onClick={() => {
                      setCurrentStep(0);
                      setLocation("/login");
                    }}
                    className="ipass-btn-secondary flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaArrowLeft className="mr-2" /> Voltar
                  </motion.button>
                  
                  <motion.button
                    type="submit"
                    className="ipass-btn-primary flex items-center btn-shine"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? "Processando..." : (
                      <>
                        Próximo <FaArrowRight className="ml-2" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
