import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { formatCurrency } from "../utils/calculationUtils";
import confetti from "canvas-confetti";
import { FaCheckCircle, FaTree, FaDownload, FaHome, FaShareAlt, FaLeaf, FaTwitter, FaFacebook, FaWhatsapp } from "react-icons/fa";

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

// Falling leaves animation
interface LeafProps {
  delay: number;
  x: number;
  size: number;
  rotation: number;
  duration: number;
}

const Leaf = ({ delay, x, size, rotation, duration }: LeafProps) => {
  return (
    <motion.div
      className="absolute z-0"
      initial={{ y: -20, x, opacity: 0, rotate: rotation }}
      animate={{ 
        y: [null, window.innerHeight + 50],
        opacity: [0, 1, 1, 0.5, 0],
        rotate: rotation + 360
      }}
      transition={{ 
        delay, 
        duration, 
        ease: "easeInOut",
        times: [0, 0.1, 0.7, 0.9, 1] 
      }}
      style={{ left: `${x}%` }}
    >
      <FaLeaf className="text-[#02ab89]" style={{ fontSize: `${size}px`, opacity: 0.7 }} />
    </motion.div>
  );
};

// Falling leaves component
const FallingLeaves = () => {
  const leaves = [];
  for (let i = 0; i < 20; i++) {
    leaves.push(
      <Leaf 
        key={i}
        delay={Math.random() * 2}
        x={Math.random() * 100}
        size={10 + Math.random() * 20}
        rotation={Math.random() * 360}
        duration={5 + Math.random() * 10}
      />
    );
  }
  return <>{leaves}</>;
};

export default function SuccessPage() {
  const [, setLocation] = useLocation();
  const { origin, transport, calculation, setCurrentStep } = useAppContext();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [treesPlanted, setTreesPlanted] = useState(0);
  
  // Generate a certificate ID
  const certificateId = `E2C-${Math.floor(Math.random() * 1000000)}-${new Date().getFullYear()}`;
  
  // Current date for the certificate
  const currentDate = new Date().toLocaleDateString('pt-BR');

  // Launch confetti and start tree counter
  useEffect(() => {
    // Launch confetti
    const launchConfetti = () => {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // Launch confetti from both sides
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#02ab89', '#4CAF50', '#8BC34A', '#CDDC39']
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#02ab89', '#4CAF50', '#8BC34A', '#CDDC39']
        });
      }, 250);
    };

    // Start tree counter
    const startTreeCounter = () => {
      // Calculate how many trees will be planted (1 tree for each R$ 10)
      const totalTrees = Math.max(1, Math.ceil(calculation?.compensationValue || 10 / 10));
      
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        setTreesPlanted(count);
        
        if (count >= totalTrees) {
          clearInterval(interval);
        }
      }, 300);
    };

    if (calculation) {
      launchConfetti();
      startTreeCounter();
    }
  }, [calculation]);
  
  // Redirect back to homepage after a timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep(0);
      setLocation("/");
    }, 180000); // 3 minutes
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle restart
  const handleRestart = () => {
    setCurrentStep(0);
    setLocation("/");
  };

  // Handle download certificate
  const handleDownloadCertificate = () => {
    // Simulate certificate download
    alert("Seu certificado foi baixado com sucesso!");
  };

  // Handle share
  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  // Share message
  const shareMessage = `Acabei de compensar ${calculation?.totalEmission.toFixed(1)}kg de CO2 para o STL Festival com a iPass E2Carbon! #STLSustentavel #E2Carbon`;
  
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
    <div className="min-h-screen flex flex-col overflow-hidden relative">
      <Header />
      
      {/* Falling leaves in the background */}
      <FallingLeaves />
      
      <main className="flex-grow bg-[#f5f5f5] relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#e6f7f4] mb-4">
              <FaCheckCircle className="w-10 h-10 text-[#02ab89]" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Compensação realizada com sucesso!</h1>
            <p className="text-gray-600 max-w-lg mx-auto">
              Obrigado por contribuir com o meio ambiente e com um festival mais sustentável.
            </p>
          </motion.div>
          
          {/* Trees planted */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-[#e6f7f4] rounded-lg p-6 mb-8 shadow-md border border-[#02ab89] text-center"
          >
            <div className="flex items-center justify-center mb-3">
              <FaTree className="text-[#02ab89] text-2xl mr-2" />
              <h2 className="text-xl font-bold text-[#02ab89]">Impacto Positivo</h2>
            </div>
            <p className="text-gray-700 mb-4">Sua compensação contribui para o plantio de:</p>
            
            <div className="text-5xl font-bold text-[#02ab89] mb-2 flex items-center justify-center">
              <span className="mr-2">{treesPlanted}</span>
              <FaTree className="text-[#02ab89] text-4xl" />
            </div>
            
            <p className="text-sm text-gray-600">
              {treesPlanted === 1 ? "árvore" : "árvores"} em projetos de reflorestamento da Mata Atlântica
            </p>
          </motion.div>
          
          {/* Certificate */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 mb-8 relative overflow-hidden"
            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#02ab89] opacity-5 rounded-full transform translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#02ab89] opacity-5 rounded-full transform -translate-x-20 translate-y-20"></div>
            
            <div className="text-center border-b border-gray-200 pb-6 mb-6 relative z-10">
              <div className="flex justify-center items-center mb-4">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="8" fill="#02ab89" />
                  <path d="M13 20H27M20 13V27" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="ml-2 text-xl font-semibold text-gray-900">iPass</span>
                <span className="ml-1 text-xl font-light text-[#02ab89]">E2Carbon</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Certificado de Compensação de Carbono</h2>
              <p className="text-sm text-gray-500">São Thomé das Letras - {new Date().getFullYear()}</p>
            </div>
            
            <div className="mb-6 relative z-10">
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
              
              <div className="flex flex-col items-center p-4 bg-[#e6f7f4] rounded-lg mb-6">
                <span className="text-sm font-medium text-[#02ab89]">Valor compensado</span>
                <span className="text-2xl font-bold text-[#02ab89]">
                  {formatCurrency(calculation.compensationValue)}
                </span>
              </div>
              
              <div className="text-center">
                <span className="text-xs text-gray-500">Certificado ID</span>
                <p className="font-mono text-sm">{certificateId}</p>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-600 relative z-10">
              <p>
                Esta compensação apoia diretamente projetos de reflorestamento e preservação da biodiversidade.
              </p>
            </div>
          </motion.div>
          
          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row justify-center gap-4 mb-8"
          >
            <motion.button
              type="button"
              onClick={handleDownloadCertificate}
              className="flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#02ab89] hover:bg-[#029678] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#02ab89] btn-shine"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload className="mr-2" /> Baixar Certificado
            </motion.button>
            
            <motion.button
              type="button"
              onClick={handleShare}
              className="flex items-center justify-center px-6 py-3 border border-[#02ab89] rounded-md shadow-sm text-base font-medium text-[#02ab89] bg-white hover:bg-[#f0faf8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#02ab89]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaShareAlt className="mr-2" /> Compartilhar
            </motion.button>
            
            <motion.button
              type="button"
              onClick={handleRestart}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHome className="mr-2" /> Voltar para o início
            </motion.button>
          </motion.div>
          
          {/* Share options */}
          {showShareOptions && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white p-4 rounded-lg shadow-md mb-8 border border-gray-200"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-3">Compartilhar nas redes sociais</h3>
              <p className="text-gray-600 mb-4">{shareMessage}</p>
              
              <div className="flex justify-center space-x-4">
                <motion.a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1DA1F2] text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTwitter size={20} />
                </motion.a>
                
                <motion.a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-[#4267B2] text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaFacebook size={20} />
                </motion.a>
                
                <motion.a 
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaWhatsapp size={20} />
                </motion.a>
              </div>
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <p className="text-gray-600 mb-4">
              Os detalhes da sua compensação também foram enviados para o seu e-mail cadastrado.
            </p>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
