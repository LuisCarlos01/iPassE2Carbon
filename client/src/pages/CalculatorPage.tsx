import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import TransportSummary from "../components/calculator/TransportSummary";
import DistanceCalculator from "../components/calculator/DistanceCalculator";
import EmissionCalculator from "../components/calculator/EmissionCalculator";
import CompensationCalculator from "../components/calculator/CompensationCalculator";
import { motion } from "framer-motion";
import { FaCalculator, FaArrowRight, FaArrowLeft } from "react-icons/fa";

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

export default function CalculatorPage() {
  const [, setLocation] = useLocation();
  const { origin, transport, calculation, setCurrentStep, calculateEmissionAndCompensation } = useAppContext();

  // Check if we have the required data
  useEffect(() => {
    if (!origin || !transport) {
      // If missing data, redirect to appropriate page
      if (!origin) {
        setCurrentStep(1);
        setLocation("/origem");
      } else if (!transport) {
        setCurrentStep(2);
        setLocation("/transporte");
      }
    } else {
      // Calculate emission and compensation when component mounts
      calculateEmissionAndCompensation();
    }
  }, []);

  // Handle navigation
  const handleBack = () => {
    setCurrentStep(2);
    setLocation("/transporte");
  };

  const handleNext = () => {
    if (calculation) {
      setCurrentStep(4);
      setLocation("/resultado");
    }
  };

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
                <FaCalculator className="text-[#02ab89] text-2xl mr-3" />
                <h1 className="text-2xl font-bold text-[#333333]">Cálculo de Emissão</h1>
              </div>
              
              {/* Transport Summary */}
              <motion.div variants={itemVariants}>
                <TransportSummary />
              </motion.div>
              
              {/* Distance Calculator */}
              <motion.div variants={itemVariants}>
                <DistanceCalculator />
              </motion.div>
              
              {/* Emission Calculator */}
              <motion.div variants={itemVariants}>
                <EmissionCalculator />
              </motion.div>
              
              {/* Compensation Calculator */}
              <motion.div variants={itemVariants}>
                <CompensationCalculator />
              </motion.div>
              
              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex justify-between pt-4 mt-6">
                <motion.button
                  type="button" 
                  onClick={handleBack} 
                  className="ipass-btn-secondary flex items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaArrowLeft className="mr-2" /> Voltar
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={handleNext}
                  className="ipass-btn-primary flex items-center btn-shine"
                  disabled={!calculation}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Prosseguir para Resultado <FaArrowRight className="ml-2" />
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
