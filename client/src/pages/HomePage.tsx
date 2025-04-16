import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function HomePage() {
  const [, setLocation] = useLocation();
  const { setCurrentStep } = useAppContext();

  useEffect(() => {
    // Redirect to login page after a short delay
    const timer = setTimeout(() => {
      setCurrentStep(0);
      setLocation("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-[#f5f5f5]">
        <motion.div 
          className="text-center p-8 ipass-card max-w-md w-full hover-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.img 
              src="/assets/logos/Ipass_logo.png" 
              alt="iPass Logo" 
              className="h-16 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.img 
              src="/assets/logos/E2carbon.png" 
              alt="E2Carbon Logo" 
              className="h-16 w-auto ml-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>
          <motion.h1 
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <span className="text-[#333333]">iPass</span>
            <span className="text-[#02ab89]">E2Carbon</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-[#666666] mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Compensação para São Thomé das Letras
          </motion.p>
          <motion.div 
            className="text-[#02ab89] font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
          >
            Redirecionando...
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
