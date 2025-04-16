import { useState } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMask from 'react-input-mask';
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaUser, FaIdCard, FaMobile, FaArrowRight } from "react-icons/fa";

// Form validation schema
const schema = yup.object({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  phone: yup
    .string()
    .required("Celular é obrigatório")
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Celular inválido"),
}).required();

type FormData = yup.InferType<typeof schema>;

// Animação para os itens do formulário
const formItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1 + 0.3,
      duration: 0.5,
    },
  }),
};

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { setUser, setCurrentStep } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      cpf: "",
      phone: "",
    }
  });

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Save user data
      setUser({
        name: data.name,
        cpf: data.cpf,
        phone: data.phone
      });
      
      // Update current step
      setCurrentStep(1);
      
      // Show success toast
      toast.success("Login realizado com sucesso!");
      
      // Navigate to origin page
      setLocation("/origem");
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-[#02ab89] h-2.5 rounded-full" style={{ width: "0%" }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span className="font-medium text-[#02ab89]">Login</span>
            <span>Origem</span>
            <span>Transporte</span>
            <span>Cálculo</span>
            <span>Resultado</span>
            <span>Pagamento</span>
          </div>
        </div>
        
        <motion.div 
          className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="ipass-card relative overflow-hidden"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#02ab89] opacity-10"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#02ab89] opacity-10"></div>
            
            <motion.h1 
              className="text-2xl font-bold text-[#333333] mb-6 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Entre com seus dados
            </motion.h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
              <motion.div
                custom={0}
                variants={formItemVariants}
                initial="hidden"
                animate="visible"
              >
                <label htmlFor="name" className="ipass-label flex items-center">
                  Nome Completo
                  <FaUser className="ml-2 text-[#02ab89]" size={16} />
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    className="ipass-input pr-10 hover-shadow transition-all"
                    placeholder="Seu nome completo"
                    {...register("name")}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" size={16} />
                  </div>
                </div>
                {errors.name && (
                  <motion.p 
                    className="mt-2 text-sm text-red-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                custom={1}
                variants={formItemVariants}
                initial="hidden"
                animate="visible"
              >
                <label htmlFor="cpf" className="ipass-label flex items-center">
                  CPF
                  <FaIdCard className="ml-2 text-[#02ab89]" size={16} />
                </label>
                <div className="relative">
                  <InputMask
                    mask="999.999.999-99"
                    id="cpf"
                    type="text"
                    className="ipass-input pr-10 hover-shadow transition-all"
                    placeholder="000.000.000-00"
                    {...register("cpf")}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FaIdCard className="text-gray-400" size={16} />
                  </div>
                </div>
                {errors.cpf && (
                  <motion.p 
                    className="mt-2 text-sm text-red-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.cpf.message}
                  </motion.p>
                )}
              </motion.div>
              
              <motion.div
                custom={2}
                variants={formItemVariants}
                initial="hidden"
                animate="visible"
              >
                <label htmlFor="phone" className="ipass-label flex items-center">
                  Celular
                  <FaMobile className="ml-2 text-[#02ab89]" size={16} />
                </label>
                <div className="relative">
                  <InputMask
                    mask="(99) 99999-9999"
                    id="phone"
                    type="text"
                    className="ipass-input pr-10 hover-shadow transition-all"
                    placeholder="(00) 00000-0000"
                    {...register("phone")}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FaMobile className="text-gray-400" size={16} />
                  </div>
                </div>
                {errors.phone && (
                  <motion.p 
                    className="mt-2 text-sm text-red-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.phone.message}
                  </motion.p>
                )}
              </motion.div>
              
              <motion.div
                custom={3}
                variants={formItemVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.button
                  type="submit"
                  className="ipass-btn-primary w-full flex items-center justify-center btn-shine"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Entrando...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Entrar <FaArrowRight className="ml-2" />
                    </span>
                  )}
                </motion.button>
              </motion.div>
            </form>
            
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <p className="text-sm text-[#666666]">
                Ao entrar, você concorda com nossos <a href="#" className="text-[#02ab89] hover:underline">Termos de Serviço</a> e <a href="#" className="text-[#02ab89] hover:underline">Política de Privacidade</a>.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
