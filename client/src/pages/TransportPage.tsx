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
import { motion } from "framer-motion";
import { FaCar, FaMotorcycle, FaShuttleVan, FaBus, FaGasPump, FaUserFriends, FaArrowRight, FaArrowLeft } from "react-icons/fa";

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
      if (vehicle === 'Moto' && value !== undefined) return value <= 1; // Máximo 1 passageiro para moto
      if (vehicle === 'Carro' && value !== undefined) return value <= 4; // Máximo 4 passageiros para carro
      if ((vehicle === 'Van' || vehicle === 'Ônibus') && value !== undefined) return value <= 15; // Máximo 15 passageiros para van/ônibus
      return true;
    })
    .required("Número de passageiros é obrigatório")
}).required();

type FormData = yup.InferType<typeof schema>;

// Vehicle options
const vehicleOptions = [
  { value: "Moto", label: "Moto", icon: <FaMotorcycle className="text-3xl" /> },
  { value: "Carro", label: "Carro", icon: <FaCar className="text-3xl" /> },
  { value: "Van", label: "Van", icon: <FaShuttleVan className="text-3xl" /> },
  { value: "Ônibus", label: "Ônibus", icon: <FaBus className="text-3xl" /> },
];

// Fuel options with icons
const fuelOptions = [
  { value: "Gasolina", label: "Gasolina", color: "#FF9933" },
  { value: "Álcool", label: "Álcool", color: "#3399FF" },
  { value: "Diesel", label: "Diesel", color: "#666666" },
  { value: "Flex", label: "Flex", color: "#9933CC" },
  { value: "Elétrico", label: "Elétrico", color: "#33CC33" },
  { value: "GNV", label: "GNV", color: "#00CCCC" },
];

// Animações
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

  // Set fuel when clicked
  const handleFuelClick = (fuel: string) => {
    setValue("fuel", fuel);
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
      
      <main className="flex-grow bg-[#f5f5f5]">
        <ProgressBar />
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                <FaCar className="text-[#02ab89] text-2xl mr-3" />
                <h1 className="text-2xl font-bold text-[#333333]">Qual transporte você utilizará?</h1>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Vehicle Selection */}
                <motion.div variants={itemVariants} className="card-container">
                  <h2 className="card-title flex items-center">
                    <FaCar className="mr-2 text-[#02ab89]" />
                    Tipo de Veículo
                  </h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {vehicleOptions.map((option) => (
                      <motion.div
                        key={option.value}
                        onClick={() => handleVehicleClick(option.value)}
                        className={`cursor-pointer rounded-lg border p-4 flex flex-col items-center transition-all hover-shadow ${
                          watchVehicle === option.value
                            ? "border-[#02ab89] bg-[#e6f7f4] shadow-md"
                            : "border-gray-200 hover:border-[#02ab89] hover:bg-[#f0faf8]"
                        }`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`mb-2 ${watchVehicle === option.value ? "text-[#02ab89]" : "text-gray-500"}`}>
                          {option.icon}
                        </div>
                        <div className={`text-sm font-medium ${watchVehicle === option.value ? "text-[#02ab89]" : "text-gray-900"}`}>
                          {option.label}
                        </div>
                        <input
                          type="radio"
                          className="hidden"
                          {...register("vehicle")}
                          value={option.value}
                        />
                      </motion.div>
                    ))}
                  </div>
                  {errors.vehicle && (
                    <motion.p 
                      className="mt-2 text-sm text-red-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.vehicle.message}
                    </motion.p>
                  )}
                </motion.div>
                
                {/* Fuel Selection */}
                <motion.div variants={itemVariants} className="card-container">
                  <h2 className="card-title flex items-center">
                    <FaGasPump className="mr-2 text-[#02ab89]" />
                    Tipo de Combustível
                  </h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {fuelOptions.map((option) => (
                      <motion.div
                        key={option.value}
                        onClick={() => handleFuelClick(option.value)}
                        className={`cursor-pointer rounded-lg border p-4 flex items-center transition-all hover-shadow ${
                          watchFuel === option.value
                            ? "border-[#02ab89] bg-[#e6f7f4] shadow-md"
                            : "border-gray-200 hover:border-[#02ab89] hover:bg-[#f0faf8]"
                        }`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div 
                          className="w-4 h-4 rounded-full mr-3" 
                          style={{ backgroundColor: option.color }}
                        ></div>
                        <div className={`text-sm font-medium ${watchFuel === option.value ? "text-[#02ab89]" : "text-gray-900"}`}>
                          {option.label}
                        </div>
                        <input
                          type="radio"
                          className="hidden"
                          {...register("fuel")}
                          value={option.value}
                        />
                      </motion.div>
                    ))}
                  </div>
                  {errors.fuel && (
                    <motion.p 
                      className="mt-2 text-sm text-red-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.fuel.message}
                    </motion.p>
                  )}
                </motion.div>
                
                {/* Passengers Input */}
                <motion.div variants={itemVariants} className="card-container">
                  <h2 className="card-title flex items-center">
                    <FaUserFriends className="mr-2 text-[#02ab89]" />
                    Passageiros Adicionais
                  </h2>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-3">
                      Quantas pessoas estão viajando com você? (Não inclua o motorista)
                    </p>
                    
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => setValue("passengers", Math.max(0, Number(watchPassengers) - 1))}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-l"
                      >
                        -
                      </button>
                      
                      <input
                        type="number"
                        className="ipass-input w-20 rounded-none text-center"
                        min="0"
                        max={watchVehicle === "Moto" ? 1 : watchVehicle === "Carro" ? 4 : 15}
                        {...register("passengers")}
                      />
                      
                      <button
                        type="button"
                        onClick={() => {
                          const maxPassengers = watchVehicle === "Moto" ? 1 : watchVehicle === "Carro" ? 4 : 15;
                          setValue("passengers", Math.min(maxPassengers, Number(watchPassengers) + 1));
                        }}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-r"
                      >
                        +
                      </button>
                    </div>
                    
                    {errors.passengers && (
                      <motion.p 
                        className="mt-2 text-sm text-red-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {errors.passengers.message}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
                
                {/* Action Buttons */}
                <motion.div variants={itemVariants} className="flex justify-between pt-4">
                  <motion.button
                    type="button"
                    onClick={() => {
                      setCurrentStep(1);
                      setLocation("/origem");
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
