import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import TransportSummary from "../components/calculator/TransportSummary";
import DistanceCalculator from "../components/calculator/DistanceCalculator";
import EmissionCalculator from "../components/calculator/EmissionCalculator";
import CompensationCalculator from "../components/calculator/CompensationCalculator";

export default function CalculatorPage() {
  const [, setLocation] = useLocation();
  const { origin, transport, calculation, setCurrentStep, calculateEmissionAndCompensation } = useAppContext();

  // Check if we have the required data
  useEffect(() => {
    if (!origin || !transport) {
      // If missing data, redirect to appropriate page
      if (!origin) {
        setCurrentStep(1);
        setLocation("/origem");
      } else if (!transport) {
        setCurrentStep(2);
        setLocation("/transporte");
      }
    } else {
      // Calculate emission and compensation when component mounts
      calculateEmissionAndCompensation();
    }
  }, []);

  // Handle navigation
  const handleBack = () => {
    setCurrentStep(2);
    setLocation("/transporte");
  };

  const handleNext = () => {
    if (calculation) {
      setCurrentStep(4);
      setLocation("/resultado");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <ProgressBar />
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="section-title">Cálculo de Emissão</h1>
          
          {/* Transport Summary */}
          <TransportSummary />
          
          {/* Distance Calculator */}
          <DistanceCalculator />
          
          {/* Emission Calculator */}
          <EmissionCalculator />
          
          {/* Compensation Calculator */}
          <CompensationCalculator />
          
          {/* Action Buttons */}
          <div className="action-buttons-container">
            <button type="button" onClick={handleBack} className="action-button-secondary">
              Voltar
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="action-button-primary"
              disabled={!calculation}
            >
              Prosseguir para Resultado
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
