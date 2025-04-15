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

export default function PaymentPage() {
  const [, setLocation] = useLocation();
  const { calculation, setCurrentStep } = useAppContext();
  const [showQRCode, setShowQRCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
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
    
    // Simulate payment processing
    setTimeout(() => {
      setCurrentStep(6);
      setLocation("/sucesso");
      setIsLoading(false);
    }, 1500);
  };
  
  // Handle copy PIX key
  const handleCopyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    toast.success("Chave PIX copiada para a área de transferência!");
  };
  
  if (!calculation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p>Carregando dados de pagamento...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <ProgressBar />
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="section-title">Pagamento</h1>
          
          <div className="card-container">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Compensação de Carbono</h2>
              <p className="text-gray-600">
                Efetue o pagamento via PIX para compensar suas emissões
              </p>
            </div>
            
            <div className="border border-green-200 rounded-lg p-4 mb-6 bg-green-50">
              <div className="flex justify-between items-center">
                <div>
                  <span className="block text-sm font-medium text-green-800">Valor a pagar</span>
                  <span className="text-2xl font-bold text-green-700">
                    {formatCurrency(calculation.compensationValue)}
                  </span>
                </div>
                <div className="bg-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {!showQRCode ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <p className="mb-6 text-gray-600">
                  Ao fazer o pagamento, você está apoiando projetos de reflorestamento e preservação da biodiversidade que removem CO₂ da atmosfera.
                </p>
                
                <button 
                  type="button" 
                  onClick={() => setShowQRCode(true)}
                  className="w-full py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Gerar QR Code PIX
                </button>
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
                
                <div className="bg-white p-4 rounded-lg mb-6">
                  <QRCode
                    value={`${pixKey}|${calculation.compensationValue}|${paymentId}`}
                    size={180}
                    level="H"
                  />
                </div>
                
                <div className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Chave PIX:</span>
                    <button 
                      type="button" 
                      onClick={handleCopyPixKey}
                      className="text-sm text-green-600 hover:text-green-700 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                      </svg>
                      Copiar
                    </button>
                  </div>
                  <p className="text-gray-900 font-mono bg-white p-2 rounded border border-gray-200">
                    {pixKey}
                  </p>
                </div>
                
                <p className="text-sm text-gray-500 mb-4">
                  Após realizar o pagamento, clique no botão abaixo para confirmar:
                </p>
                
                <button 
                  type="button" 
                  onClick={handleConfirmPayment}
                  className="w-full py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Confirmando pagamento...
                    </span>
                  ) : "Confirmar pagamento"}
                </button>
              </motion.div>
            )}
          </div>
          
          <div className="mt-6">
            <button type="button" onClick={handleBack} className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Voltar para o resultado
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
