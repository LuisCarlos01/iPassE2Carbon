import { useState } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import { formatCurrency } from "../utils/calculationUtils";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaMoneyBillWave, FaQrcode, FaArrowLeft, FaClipboard, FaLeaf, FaSpinner } from "react-icons/fa";

// Animations
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

export default function PaymentPage() {
  const [, setLocation] = useLocation();
  const { calculation, setCurrentStep } = useAppContext();
  const [showQRCode, setShowQRCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentProgress, setPaymentProgress] = useState(0);
  
  // Dummy PIX key
  const pixKey = "ipass@exemplo.com.br";
  
  // Generate a payment ID
  const paymentId = `E2CARBON-${Math.floor(Math.random() * 1000000)}`;
  
  // Handle back button
  const handleBack = () => {
    setCurrentStep(4);
    setLocation("/resultado");
  };
  
  // Handle payment confirmation
  const handleConfirmPayment = () => {
    setIsLoading(true);
    
    // Simulate payment processing with progress updates
    const progressInterval = setInterval(() => {
      setPaymentProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setCurrentStep(6);
            setLocation("/sucesso");
            setIsLoading(false);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };
  
  // Handle copy PIX key
  const handleCopyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    toast.success("Chave PIX copiada para a área de transferência!", {
      icon: <FaClipboard className="text-[#02ab89]" />,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  
  if (!calculation) {
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
            <p className="text-lg text-gray-700">Carregando dados de pagamento...</p>
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
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <FaMoneyBillWave className="text-[#02ab89] text-2xl mr-3" />
                <h1 className="text-2xl font-bold text-[#333333]">Pagamento</h1>
              </div>
              
              <motion.div variants={itemVariants} className="card-container">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Compensação de Carbono</h2>
                  <p className="text-gray-600">
                    Efetue o pagamento via PIX para compensar suas emissões
                  </p>
                </div>
                
                <motion.div 
                  className="border border-[#02ab89] rounded-lg p-4 mb-6 bg-[#e6f7f4] shadow-md"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="block text-sm font-medium text-[#02ab89]">Valor a pagar</span>
                      <span className="text-2xl font-bold text-[#02ab89]">
                        {formatCurrency(calculation.compensationValue)}
                      </span>
                    </div>
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <FaLeaf className="w-8 h-8 text-[#02ab89]" />
                    </div>
                  </div>
                </motion.div>
                
                {!showQRCode ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Benefícios da sua compensação</h3>
                      <ul className="text-left text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <span className="text-[#02ab89] mr-2">•</span>
                          <span>Neutralização de {calculation.totalEmission.toFixed(1)} kg de CO₂</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#02ab89] mr-2">•</span>
                          <span>Apoio a projetos de reflorestamento na Mata Atlântica</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#02ab89] mr-2">•</span>
                          <span>Contribuição para um festival mais sustentável</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#02ab89] mr-2">•</span>
                          <span>Certificado digital de compensação</span>
                        </li>
                      </ul>
                    </div>
                    
                    <motion.button 
                      type="button" 
                      onClick={() => setShowQRCode(true)}
                      className="w-full py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#02ab89] hover:bg-[#029678] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#02ab89] btn-shine flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaQrcode className="mr-2" /> Gerar QR Code PIX
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center"
                  >
                    <p className="mb-4 text-center text-gray-600">
                      Escaneie o QR Code abaixo com o aplicativo do seu banco para efetuar o pagamento:
                    </p>
                    
                    <motion.div 
                      className="bg-white p-6 rounded-lg mb-6 shadow-md border border-gray-100"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    >
                      <QRCode
                        value={`${pixKey}|${calculation.compensationValue}|${paymentId}`}
                        size={200}
                        level="H"
                        className="mx-auto"
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 mb-6 shadow-sm"
                      whileHover={{ backgroundColor: "#f9fafb" }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Chave PIX:</span>
                        <motion.button 
                          type="button" 
                          onClick={handleCopyPixKey}
                          className="text-sm text-[#02ab89] hover:text-[#029678] flex items-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaClipboard className="w-4 h-4 mr-1" />
                          Copiar
                        </motion.button>
                      </div>
                      <p className="text-gray-900 font-mono bg-white p-2 rounded border border-gray-200">
                        {pixKey}
                      </p>
                    </motion.div>
                    
                    <p className="text-sm text-gray-500 mb-4">
                      Após realizar o pagamento, clique no botão abaixo para confirmar:
                    </p>
                    
                    {isLoading ? (
                      <div className="w-full">
                        <div className="w-full h-2 bg-gray-200 rounded-full mb-2 overflow-hidden">
                          <motion.div 
                            className="h-full bg-[#02ab89]" 
                            initial={{ width: 0 }}
                            animate={{ width: `${paymentProgress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <div className="text-center text-sm text-gray-600 mb-4">
                          {paymentProgress < 100 ? (
                            <span>Processando pagamento... {paymentProgress}%</span>
                          ) : (
                            <span>Pagamento confirmado! Redirecionando...</span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <motion.button 
                        type="button" 
                        onClick={handleConfirmPayment}
                        className="w-full py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#02ab89] hover:bg-[#029678] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#02ab89] btn-shine flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Confirmar pagamento
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </motion.div>
              
              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="mt-6">
                <motion.button 
                  type="button" 
                  onClick={handleBack} 
                  className="text-sm text-gray-600 hover:text-[#02ab89] flex items-center transition-colors"
                  whileHover={{ x: -3 }}
                  disabled={isLoading}
                >
                  <FaArrowLeft className="w-4 h-4 mr-1" />
                  Voltar para o resultado
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
