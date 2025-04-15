import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { calculateRoundTripDistance } from "../utils/calculationUtils";
import { Transport } from "../context/AppContext"; // Importar o tipo Transport

// Form validation schema
const schema = yup.object({
  vehicle: yup.string().required("Veículo é obrigatório"),
  fuel: yup.string().required("Combustível é obrigatório"),
  passengers: yup
    .number()
    .min(0, "O número de passageiros não pode ser negativo")
    .transform((value) => (isNaN(value) ? 0 : value))
    .test('max-passengers', 'Número máximo de passageiros excedido', function(value) {
      const vehicle = this.parent.vehicle;
      if (vehicle === 'Moto') return value <= 1; // Máximo 1 passageiro para moto
      if (vehicle === 'Carro') return value <= 4; // Máximo 4 passageiros para carro
      if (vehicle === 'Van' || vehicle === 'Ônibus') return value <= 15; // Máximo 15 passageiros para van/ônibus
      return true;
    })
    .required("Número de passageiros é obrigatório")
}).required();

type FormData = yup.InferType<typeof schema>;

// Vehicle options
const vehicleOptions = [
  { value: "Moto", label: "Moto", icon: "🏍️" },
  { value: "Carro", label: "Carro", icon: "🚗" },
  { value: "Van", label: "Van", icon: "🚐" },
  { value: "Ônibus", label: "Ônibus", icon: "🚌" },
];

// Fuel options
const fuelOptions = [
  { value: "Gasolina", label: "Gasolina" },
  { value: "Álcool", label: "Álcool" },
  { value: "Diesel", label: "Diesel" },
  { value: "Flex", label: "Flex" },
  { value: "Elétrico", label: "Elétrico" },
  { value: "GNV", label: "GNV" },
];

export default function TransportPage() {
  const [, setLocation] = useLocation();
  const { origin, transport, setTransport, setCurrentStep } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize form with existing transport data
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      vehicle: transport?.vehicle || "Carro",
      fuel: transport?.fuel || "Gasolina",
      passengers: transport?.passengers || 0,
    }
  });
  
  const watchVehicle = watch("vehicle");
  const watchFuel = watch("fuel");
  const watchPassengers = watch("passengers");
  
  // Handle form submission
  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    
    // Calculate round trip distance if not already set
    let distance = transport?.distance || 0;
    if (!distance && origin) {
      // Fix: Properly calculate round trip distance
      distance = calculateRoundTripDistance(origin);
    }
    
    // Save transport data
    setTransport({
      vehicle: data.vehicle as any,
      fuel: data.fuel as any,
      distance: distance,
      isAutomaticCalc: transport?.isAutomaticCalc || true,
      passengers: data.passengers,
    } as Transport);
    
    // Update current step
    setCurrentStep(3);
    
    // Navigate to calculation page
    setTimeout(() => {
      setLocation("/calculo");
      setIsLoading(false);
    }, 500);
  };
  
  // Set vehicle when clicked
  const handleVehicleClick = (vehicle: string) => {
    setValue("vehicle", vehicle);
  };
  
  // Initialize with default values if not set
  useEffect(() => {
    if (!transport && origin) {
      // Fix: Properly calculate round trip distance
      const distance = calculateRoundTripDistance(origin);
      setTransport({
        vehicle: "Carro",
        fuel: "Gasolina",
        distance,
        isAutomaticCalc: true,
        passengers: 0, // Nenhum passageiro adicional por padrão
      } as Transport);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <ProgressBar />
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Qual transporte você utilizará?</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Vehicle Selection */}
            <div className="card-container">
              <h2 className="card-title">Tipo de Veículo</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {vehicleOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleVehicleClick(option.value)}
                    className={`cursor-pointer rounded-lg border p-4 flex flex-col items-center transition-all ${
                      watchVehicle === option.value
                        ? "border-green-500 bg-green-50 shadow-md"
                        : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.icon}</div>
                    <div className="text-sm font-medium text-gray-900">{option.label}</div>
                    <input
                      type="radio"
                      className="hidden"
                      {...register("vehicle")}
                      value={option.value}
                      id={`vehicle-${option.value}`}
                    />
                  </div>
                ))}
              </div>
              {errors.vehicle && (
                <p className="mt-2 text-sm text-red-600">{errors.vehicle.message}</p>
              )}
            </div>
            
            {/* Fuel Selection */}
            <div className="card-container">
              <h2 className="card-title">Tipo de Combustível</h2>
              
              <div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {fuelOptions.map((option) => (
                    <div key={option.value} className="relative flex items-center">
                      <input
                        id={`fuel-${option.value}`}
                        type="radio"
                        className="peer sr-only"
                        {...register("fuel")}
                        value={option.value}
                      />
                      <label
                        htmlFor={`fuel-${option.value}`}
                        className="w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-green-300 hover:bg-green-50 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-600 cursor-pointer"
                      >
                        {option.label}
                      </label>
                      {watchFuel === option.value && (
                        <svg className="absolute right-2 top-3 h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
                {errors.fuel && (
                  <p className="mt-2 text-sm text-red-600">{errors.fuel.message}</p>
                )}
              </div>
            </div>
            
            {/* Passenger Selection */}
            <div className="card-container">
              <h2 className="card-title">Número de Passageiros (além do motorista)</h2>
              
              <div className="mt-4">
                <div className="flex flex-col">
                  <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="passengers">
                    {watchVehicle === "Moto" 
                      ? "Máximo: 1 passageiro" 
                      : watchVehicle === "Carro" 
                        ? "Máximo: 4 passageiros" 
                        : "Máximo: 15 passageiros"}
                  </label>
                  <input
                    type="number"
                    id="passengers"
                    min="0"
                    max={
                      watchVehicle === "Moto" 
                        ? 1 
                        : watchVehicle === "Carro" 
                          ? 4 
                          : 15
                    }
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-green-500 focus:ring-green-500"
                    {...register("passengers")}
                  />
                  {errors.passengers && (
                    <p className="mt-2 text-sm text-red-600">{errors.passengers.message}</p>
                  )}
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    O número de passageiros influencia diretamente no cálculo de emissão de CO2 e,
                    consequentemente, no valor da compensação. Cada passageiro adicional representa
                    um aumento de 15% na emissão base do veículo.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Travel Summary */}
            {origin && (
              <div className="card-container">
                <h2 className="card-title">Resumo da Viagem</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="value-label">Origem</span>
                    <span className="value-display">
                      {origin.city}, {origin.state}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="value-label">Destino</span>
                    <span className="value-display">São Thomé das Letras (MG)</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="value-label">Veículo</span>
                    <span className="value-display">{watchVehicle}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="value-label">Combustível</span>
                    <span className="value-display">{watchFuel}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="value-label">Passageiros</span>
                    <span className="value-display">
                      {watchPassengers || 0} {Number(watchPassengers) === 1 ? "pessoa" : "pessoas"}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="action-buttons-container">
              <button
                type="button"
                onClick={() => {
                  setCurrentStep(1);
                  setLocation("/origem");
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
