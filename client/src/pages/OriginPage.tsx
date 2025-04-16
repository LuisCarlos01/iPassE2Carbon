import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
          <div className="ipass-card">
            <h1 className="text-2xl font-bold text-[#333333] mb-6">Qual a sua cidade de origem?</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="state" className="ipass-label">
                  Estado
                </label>
                <select
                  id="state"
                  className="ipass-input"
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
                  <p className="mt-2 text-sm text-red-600">{errors.state.message}</p>
                )}
              </div>
              
              {watchState && !watchCustomCity && (
                <div>
                  <label htmlFor="city" className="ipass-label">
                    Cidade
                  </label>
                  <select
                    id="city"
                    className="ipass-input"
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
                    <p className="mt-2 text-sm text-red-600">{errors.city.message}</p>
                  )}
                </div>
              )}
              
              <div className="flex items-center">
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
                <label htmlFor="customCity" className="ml-2 block text-sm text-[#333333]">
                  Minha cidade não está na lista
                </label>
              </div>
              
              {watchCustomCity && (
                <div>
                  <label htmlFor="customCityName" className="ipass-label">
                    Nome da cidade
                  </label>
                  <input
                    type="text"
                    id="customCityName"
                    className="ipass-input"
                    placeholder="Digite o nome da sua cidade"
                    {...register("customCityName")}
                  />
                  {errors.customCityName && (
                    <p className="mt-2 text-sm text-red-600">{errors.customCityName.message}</p>
                  )}
                </div>
              )}
              
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(0);
                    setLocation("/login");
                  }}
                  className="ipass-btn-secondary"
                >
                  Voltar
                </button>
                
                <button
                  type="submit"
                  className="ipass-btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Processando..." : "Próximo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
