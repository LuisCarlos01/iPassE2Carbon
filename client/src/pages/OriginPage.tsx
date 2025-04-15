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
  city: yup.string().required("Cidade é obrigatória"),
  customCity: yup.boolean(),
  customCityName: yup.string().when("customCity", {
    is: true,
    then: (schema) => schema.required("Nome da cidade é obrigatório"),
    otherwise: (schema) => schema,
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

// Mock cities for each state (for demonstration purposes)
const getCitiesByState = (stateCode: string): string[] => {
  const cities: Record<string, string[]> = {
    SP: ["São Paulo", "Campinas", "Guarulhos", "Santos", "Ribeirão Preto"],
    RJ: ["Rio de Janeiro", "Niterói", "Búzios", "Petrópolis", "Angra dos Reis"],
    MG: ["Belo Horizonte", "Juiz de Fora", "Ouro Preto", "Uberlândia", "Tiradentes"],
    // Add more cities for other states as needed
  };
  
  return cities[stateCode] || [];
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
      
      <main className="flex-grow">
        <ProgressBar />
        
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Qual a sua cidade de origem?</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                id="state"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
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
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade
                </label>
                <select
                  id="city"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
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
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
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
              <label htmlFor="customCity" className="ml-2 block text-sm text-gray-700">
                Minha cidade não está na lista
              </label>
            </div>
            
            {watchCustomCity && (
              <div>
                <label htmlFor="customCityName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da cidade
                </label>
                <input
                  type="text"
                  id="customCityName"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
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
                className="action-button-secondary"
              >
                Voltar
              </button>
              
              <button
                type="submit"
                className="action-button-primary"
                disabled={isLoading}
              >
                {isLoading ? "Processando..." : "Próximo"}
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
