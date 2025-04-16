import { useState } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { FaUser, FaQuestionCircle, FaHome } from "react-icons/fa";

export default function Header() {
  const { user } = useAppContext();
  const [, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#02ab89] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo com animação */}
        <motion.div 
          className="header-logo flex items-center cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setLocation("/")}
        >
          <img src="/assets/logos/Ipass_logo.png" alt="iPass Logo" className="h-12 w-auto" />
        </motion.div>

        {/* Menu para desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {user && (
            <motion.div 
              className="text-white flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <FaUser className="mr-2" />
              Olá, <span className="font-medium ml-1">{user.name.split(' ')[0]}</span>
            </motion.div>
          )}
          
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <button 
              onClick={() => setLocation("/")}
              className="text-white hover:text-gray-200 flex items-center transition-colors"
            >
              <FaHome className="mr-1" />
              <span className="text-sm">Início</span>
            </button>
            
            <button 
              onClick={() => window.open("https://ipass.com.br/fale-conosco", "_blank")}
              className="text-white hover:text-gray-200 flex items-center transition-colors"
            >
              <FaQuestionCircle className="mr-1" />
              <span className="text-sm">Ajuda</span>
            </button>
          </motion.div>
        </div>

        {/* Menu hamburguer para mobile */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile dropdown */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-[#02ab89] border-t border-[#01997a] py-2 px-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-3">
            {user && (
              <div className="text-white py-2 border-b border-[#01997a] flex items-center">
                <FaUser className="mr-2" />
                Olá, <span className="font-medium ml-1">{user.name.split(' ')[0]}</span>
              </div>
            )}
            
            <button 
              onClick={() => {
                setLocation("/");
                setIsMenuOpen(false);
              }}
              className="text-white hover:text-gray-200 flex items-center py-2"
            >
              <FaHome className="mr-2" />
              <span>Início</span>
            </button>
            
            <button 
              onClick={() => {
                window.open("https://ipass.com.br/fale-conosco", "_blank");
                setIsMenuOpen(false);
              }}
              className="text-white hover:text-gray-200 flex items-center py-2"
            >
              <FaQuestionCircle className="mr-2" />
              <span>Ajuda</span>
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
