import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaFacebook, FaTwitter, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Animação para os itens do footer
  const footerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <footer className="bg-[#02ab89] text-white py-8 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white opacity-5"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1 - Informações da empresa */}
          <motion.div
            custom={0}
            variants={footerItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 border-b border-[#01997a] pb-2">iPass E2Carbon</h3>
            <p className="text-sm mb-4">
              Compensação de emissões de carbono para eventos e viagens, contribuindo para um futuro mais sustentável.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.instagram.com/ipass.oficial/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/ipass/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="https://www.facebook.com/ipass.oficial/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com/ipass_oficial" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
                <FaTwitter size={20} />
              </a>
            </div>
          </motion.div>

          {/* Coluna 2 - Links úteis */}
          <motion.div
            custom={1}
            variants={footerItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 border-b border-[#01997a] pb-2">Links úteis</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://ipass.com.br/quem-somos" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors flex items-center">
                  <span className="mr-2">•</span> Quem Somos
                </a>
              </li>
              <li>
                <a href="https://ipass.com.br/termos-de-uso" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors flex items-center">
                  <span className="mr-2">•</span> Termos de Uso
                </a>
              </li>
              <li>
                <a href="https://ipass.com.br/fale-conosco" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors flex items-center">
                  <span className="mr-2">•</span> Fale Conosco
                </a>
              </li>
              <li>
                <a href="https://ipass.com.br/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors flex items-center">
                  <span className="mr-2">•</span> Política de Privacidade
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Coluna 3 - Contato e Logo */}
          <motion.div
            custom={2}
            variants={footerItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-[#01997a] pb-2">Contato</h3>
              <div className="space-y-2 text-sm">
                <a href="mailto:contato@ipass.com.br" className="hover:text-gray-200 transition-colors flex items-center">
                  <FaEnvelope className="mr-2" /> contato@ipass.com.br
                </a>
                <a href="tel:+551140028922" className="hover:text-gray-200 transition-colors flex items-center">
                  <FaPhone className="mr-2" /> (35) xxxx-xxxx
                </a>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-end space-x-4">
              <img src="/assets/logos/Ipass_logo.png" alt="iPass Logo" className="h-8 w-auto" />
              <img src="/assets/logos/E2carbon.png" alt="E2Carbon Logo" className="h-8 w-auto" />
            </div>
          </motion.div>
        </div>
        
        {/* Copyright */}
        <motion.div 
          className="text-center mt-8 pt-4 border-t border-[#01997a]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-xs">
            &copy; 2015 - {currentYear} iPass E2Carbon. TODOS OS DIREITOS RESERVADOS
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
