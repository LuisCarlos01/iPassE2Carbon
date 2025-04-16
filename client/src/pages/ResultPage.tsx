import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import { formatCurrency } from "../utils/calculationUtils";
import { motion } from "framer-motion";
import { FaCheckCircle, FaArrowRight, FaArrowLeft, FaRoad, FaCar, FaLeaf, FaMoneyBillWave } from "react-icons/fa";

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

export default function ResultPage() {
  const [, setLocation] = useLocation();
  const { origin, transport, calculation, setCurrentStep } = useAppContext();

  // Check if we have the required data
  useEffect(() => {
    if (!origin || !transport || !calculation) {
      // If missing data, redirect to appropriate page
      if (!origin) {
        setCurrentStep(1);
        setLocation("/origem");
      } else if (!transport) {
        setCurrentStep(2);
        setLocation("/transporte");
      } else if (!calculation) {
        setCurrentStep(3);
        setLocation("/calculo");
      }
    }
  }, []);

  // Handle navigation
  const handleBack = () => {
    setCurrentStep(3);
    setLocation("/calculo");
  };

  const handleCompensate = () => {
    setCurrentStep(5);
    setLocation("/pagamento");
  };

  if (!origin || !transport || !calculation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-[#f5f5f5]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center p-8"
          >
            <div className="w-16 h-16 border-4 border-t-[#02ab89] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-gray-700">Carregando dados...</p>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-[#f5f5f5]">
        <ProgressBar />
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <FaCheckCircle className="text-[#02ab89] text-2xl mr-3" />
                <h1 className="text-2xl font-bold text-[#333333]">Resultado do Cálculo</h1>
              </div>
              
              {/* Result Summary */}
              <motion.div variants={itemVariants} className="card-container">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Resumo da sua emissão</h2>
                  <p className="text-gray-600">
                    Viagem de ida e volta entre {origin.city}, {origin.state} e São Thomé das Letras
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <motion.div 
                    className="flex flex-col items-center p-4 bg-[#f0faf8] rounded-lg border border-[#e6f7f4] shadow-sm"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <FaRoad className="text-[#02ab89] text-2xl mb-2" />
                    <span className="text-sm font-medium text-gray-500 mb-1">Distância total</span>
                    <span className="text-3xl font-bold text-[#02ab89]">{transport.distance} km</span>
                    <span className="text-xs text-gray-500 mt-1">Ida e volta</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-col items-center p-4 bg-[#f0faf8] rounded-lg border border-[#e6f7f4] shadow-sm"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <FaCar className="text-[#02ab89] text-2xl mb-2" />
                    <span className="text-sm font-medium text-gray-500 mb-1">Veículo</span>
                    <span className="text-3xl font-bold text-[#02ab89]">{transport.vehicle}</span>
                    <span className="text-xs text-gray-500 mt-1">{transport.fuel}</span>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="flex flex-col items-center p-6 bg-[#e6f7f4] rounded-lg mb-8 border border-[#02ab89] shadow-md"
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <FaLeaf className="text-[#02ab89] text-3xl mb-2" />
                  <span className="text-sm font-medium text-[#02ab89] mb-1">Emissão total de CO₂</span>
                  <span className="text-4xl font-bold text-[#02ab89]">{calculation.totalEmission.toFixed(1)} kg</span>
                  <span className="text-xs text-gray-600 mt-1">
                    Fator de emissão: {calculation.emissionFactor.toFixed(2)} kg/km
                  </span>
                </motion.div>
                
                <motion.div 
                  className="bg-white border border-[#02ab89] rounded-lg p-6 shadow-lg"
                  variants={itemVariants}
                  whileHover={{ boxShadow: "0 10px 25px -5px rgba(2, 171, 137, 0.1), 0 10px 10px -5px rgba(2, 171, 137, 0.04)" }}
                >
                  <div className="flex flex-col items-center mb-4">
                    <FaMoneyBillWave className="text-[#02ab89] text-3xl mb-2" />
                    <span className="text-sm font-medium text-gray-700 mb-1">Valor para compensação</span>
                    <span className="text-4xl font-bold text-[#02ab89]">
                      {formatCurrency(calculation.compensationValue)}
                    </span>
                    {calculation.compensationValue === 9.84 && (
                      <span className="text-xs text-gray-500 mt-1">
                        Valor mínimo aplicado
                      </span>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <p className="text-sm text-gray-600 mb-4">
                      Ao compensar suas emissões, você contribui diretamente para projetos de reflorestamento e preservação ambiental que removem CO₂ da atmosfera.
                    </p>
                    
                    <motion.button
                      type="button"
                      onClick={handleCompensate}
                      className="w-full py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#02ab89] hover:bg-[#029678] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#02ab89] btn-shine"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Compensar minhas emissões <FaArrowRight className="ml-2 inline" />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="mt-6">
                <motion.button 
                  type="button" 
                  onClick={handleBack} 
                  className="text-sm text-gray-600 hover:text-[#02ab89] flex items-center transition-colors"
                  whileHover={{ x: -3 }}
                >
                  <FaArrowLeft className="w-4 h-4 mr-1" />
                  Voltar para o cálculo
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
