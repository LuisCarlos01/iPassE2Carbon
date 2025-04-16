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
        
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="ipass-card">
            <h1 className="text-2xl font-bold text-[#333333] mb-6">Entre com seus dados</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="ipass-label">
                  Nome Completo
                </label>
                <input
                  id="name"
                  type="text"
                  className="ipass-input"
                  placeholder="Seu nome completo"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="cpf" className="ipass-label">
                  CPF
                </label>
                <InputMask
                  mask="999.999.999-99"
                  id="cpf"
                  type="text"
                  className="ipass-input"
                  placeholder="000.000.000-00"
                  {...register("cpf")}
                />
                {errors.cpf && (
                  <p className="mt-2 text-sm text-red-600">{errors.cpf.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="ipass-label">
                  Celular
                </label>
                <InputMask
                  mask="(99) 99999-9999"
                  id="phone"
                  type="text"
                  className="ipass-input"
                  placeholder="(00) 00000-0000"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
              
              <div>
                <button
                  type="submit"
                  className="ipass-btn-primary w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Entrando...
                    </span>
                  ) : "Entrar"}
                </button>
              </div>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-[#666666]">
                Ao entrar, você concorda com nossos Termos de Serviço e Política de Privacidade.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
