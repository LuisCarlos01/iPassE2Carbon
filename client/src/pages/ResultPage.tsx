import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import { formatCurrency } from "../utils/calculationUtils";

export default function ResultPage() {
  const [, setLocation] = useLocation();
  const { origin, transport, calculation, setCurrentStep } = useAppContext();

  // Check if we have the required data
  useEffect(() => {
    if (!origin || !transport || !calculation) {
      // If missing data, redirect to appropriate page
      if (!origin) {
        setCurrentStep(1);
        setLocation("/origem");
      } else if (!transport) {
        setCurrentStep(2);
        setLocation("/transporte");
      } else if (!calculation) {
        setCurrentStep(3);
        setLocation("/calculo");
      }
    }
  }, []);

  // Handle navigation
  const handleBack = () => {
    setCurrentStep(3);
    setLocation("/calculo");
  };

  const handleCompensate = () => {
    setCurrentStep(5);
    setLocation("/pagamento");
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
        <ProgressBar />
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="section-title">Resultado do Cálculo</h1>
          
          {/* Result Summary */}
          <div className="card-container">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Resumo da sua emissão</h2>
              <p className="text-gray-600">
                Viagem de ida e volta entre {origin.city}, {origin.state} e STL Festival
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-500 mb-1">Distância total</span>
                <span className="text-3xl font-bold text-gray-900">{transport.distance} km</span>
                <span className="text-xs text-gray-500 mt-1">Ida e volta</span>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-500 mb-1">Veículo</span>
                <span className="text-3xl font-bold text-gray-900">{transport.vehicle}</span>
                <span className="text-xs text-gray-500 mt-1">{transport.fuel}</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-green-50 rounded-lg mb-8">
              <span className="text-sm font-medium text-green-800 mb-1">Emissão total de CO₂</span>
              <span className="text-4xl font-bold text-green-700">{calculation.totalEmission.toFixed(1)} kg</span>
              <span className="text-xs text-green-600 mt-1">
                Fator de emissão: {calculation.emissionFactor.toFixed(2)} kg/km
              </span>
            </div>
            
            <div className="bg-white border border-green-200 rounded-lg p-6 shadow-md">
              <div className="flex flex-col items-center mb-4">
                <span className="text-sm font-medium text-gray-700 mb-1">Valor para compensação</span>
                <span className="text-4xl font-bold text-green-600">
                  {formatCurrency(calculation.compensationValue)}
                </span>
                {calculation.compensationValue === 9.84 && (
                  <span className="text-xs text-gray-500 mt-1">
                    Valor mínimo aplicado
                  </span>
                )}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <p className="text-sm text-gray-600 mb-4">
                  Ao compensar suas emissões, você contribui diretamente para projetos de reflorestamento e preservação ambiental que removem CO₂ da atmosfera.
                </p>
                
                <button
                  type="button"
                  onClick={handleCompensate}
                  className="w-full py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Compensar minhas emissões
                </button>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-6">
            <button type="button" onClick={handleBack} className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Voltar para o cálculo
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
