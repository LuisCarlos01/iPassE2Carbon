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
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center p-8">
          <div className="flex justify-center mb-6">
            <svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="#15803D" />
              <path d="M13 20H27M20 13V27" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-gray-900">iPass</span>
            <span className="text-green-600">E2Carbon</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">Compensação para o STL Festival</p>
          <div className="animate-pulse text-gray-500">Redirecionando...</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
