import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HomePage() {
  const [, setLocation] = useLocation();
  const { setCurrentStep } = useAppContext();

  useEffect(() => {
    // Redirect to login page after a short delay
    const timer = setTimeout(() => {
      setCurrentStep(0);
      setLocation("/login");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-center p-8 ipass-card max-w-md w-full">
          <div className="flex justify-center mb-6">
            <img src="/assets/logos/Ipass_logo.png" alt="iPass Logo" className="h-16 w-auto" />
            <img src="/assets/logos/E2carbon.png" alt="E2Carbon Logo" className="h-16 w-auto ml-2" />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-[#333333]">iPass</span>
            <span className="text-[#02ab89]">E2Carbon</span>
          </h1>
          <p className="text-xl text-[#666666] mb-8">Compensação para São Thomé das Letras</p>
          <div className="animate-pulse text-[#02ab89]">Redirecionando...</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
