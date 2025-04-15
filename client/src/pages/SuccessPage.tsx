import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { formatCurrency } from "../utils/calculationUtils";

export default function SuccessPage() {
  const [, setLocation] = useLocation();
  const { origin, transport, calculation, setCurrentStep } = useAppContext();
  
  // Generate a certificate ID
  const certificateId = `E2C-${Math.floor(Math.random() * 1000000)}-${new Date().getFullYear()}`;
  
  // Current date for the certificate
  const currentDate = new Date().toLocaleDateString('pt-BR');
  
  // Redirect back to homepage after a timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep(0);
      setLocation("/");
    }, 120000); // 2 minutes
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle restart
  const handleRestart = () => {
    setCurrentStep(0);
    setLocation("/");
  };
  
  if (!origin || !transport || !calculation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p>Carregando dados...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Compensação realizada com sucesso!</h1>
            <p className="text-gray-600">
              Obrigado por contribuir com o meio ambiente e com um festival mais sustentável.
            </p>
          </motion.div>
          
          {/* Certificate */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 mb-8"
          >
            <div className="text-center border-b border-gray-200 pb-6 mb-6">
              <div className="flex justify-center items-center mb-4">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="8" fill="#15803D" />
                  <path d="M13 20H27M20 13V27" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="ml-2 text-xl font-semibold text-gray-900">iPass</span>
                <span className="ml-1 text-xl font-light text-green-600">E2Carbon</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Certificado de Compensação de Carbono</h2>
              <p className="text-sm text-gray-500">São Thomé das Letras - {new Date().getFullYear()}</p>
            </div>
            
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Nome</span>
                  <span className="font-medium">Participante</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Data</span>
                  <span className="font-medium">{currentDate}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Origem</span>
                  <span className="font-medium">{origin.city}, {origin.state}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Veículo</span>
                  <span className="font-medium">{transport.vehicle} ({transport.fuel})</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Distância</span>
                  <span className="font-medium">{transport.distance} km</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Emissão</span>
                  <span className="font-medium">{calculation.totalEmission.toFixed(1)} kg CO₂</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg mb-6">
                <span className="text-sm font-medium text-green-800">Valor compensado</span>
                <span className="text-2xl font-bold text-green-700">
                  {formatCurrency(calculation.compensationValue)}
                </span>
              </div>
              
              <div className="text-center">
                <span className="text-xs text-gray-500">Certificado ID</span>
                <p className="font-mono text-sm">{certificateId}</p>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-600">
              <p>
                Esta compensação apoia diretamente projetos de reflorestamento e preservação da biodiversidade.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <p className="text-gray-600 mb-4">
              Os detalhes da sua compensação também foram enviados para o seu e-mail cadastrado.
            </p>
            
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Voltar para o início
            </button>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
