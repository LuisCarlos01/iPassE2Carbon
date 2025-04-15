import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the types for our context state
export interface User {
  name: string;
  cpf?: string;
  phone?: string;
}

export interface Origin {
  city: string;
  state: string;
  customCity?: boolean;
}

export interface Transport {
  vehicle: "Moto" | "Carro" | "Van" | "Ônibus";
  fuel: "Gasolina" | "Álcool" | "Diesel" | "Flex" | "Elétrico" | "GNV";
  distance: number;
  isAutomaticCalc: boolean;
  passengers: number; // Número de passageiros (além do motorista)
}

export interface Calculation {
  emissionFactor: number; // kg/km
  totalEmission: number; // kg
  compensationValue: number; // R$
}

interface AppContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  user: User;
  setUser: (user: User) => void;
  origin: Origin | null;
  setOrigin: (origin: Origin) => void;
  transport: Transport | null;
  setTransport: (transport: Transport) => void;
  calculation: Calculation | null;
  setCalculation: (calculation: Calculation) => void;
  updateTransport: (partialTransport: Partial<Transport>) => void;
  calculateEmissionAndCompensation: () => void;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
export function AppProvider({ children }: { children: ReactNode }) {
  // Initialize state
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [user, setUser] = useState<User>({ name: "João Silva" });
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [transport, setTransport] = useState<Transport | null>(null);
  const [calculation, setCalculation] = useState<Calculation | null>(null);

  // Function to update part of the transport object
  const updateTransport = (partialTransport: Partial<Transport>) => {
    if (transport) {
      setTransport({ ...transport, ...partialTransport });
    } else {
      // Default values if transport object doesn't exist yet
      setTransport({
        vehicle: "Carro",
        fuel: "Gasolina",
        distance: 120,
        isAutomaticCalc: true,
        passengers: 0, // Nenhum passageiro adicional por padrão
        ...partialTransport,
      } as Transport);
    }
  };

  // Load state from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedOrigin = localStorage.getItem("origin");
    const savedTransport = localStorage.getItem("transport");
    const savedCalculation = localStorage.getItem("calculation");
    const savedStep = localStorage.getItem("currentStep");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedOrigin) setOrigin(JSON.parse(savedOrigin));
    if (savedTransport) setTransport(JSON.parse(savedTransport));
    if (savedCalculation) setCalculation(JSON.parse(savedCalculation));
    if (savedStep) setCurrentStep(JSON.parse(savedStep));
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("currentStep", JSON.stringify(currentStep));
    if (origin) localStorage.setItem("origin", JSON.stringify(origin));
    if (transport) localStorage.setItem("transport", JSON.stringify(transport));
    if (calculation) localStorage.setItem("calculation", JSON.stringify(calculation));
  }, [user, origin, transport, calculation, currentStep]);

  // Function to calculate emission and compensation
  const calculateEmissionAndCompensation = () => {
    if (!transport) return;

    // Emission factors by vehicle type and fuel (kg/km)
    const emissionFactors: Record<string, Record<string, number>> = {
      Moto: {
        Gasolina: 0.07,
        Álcool: 0.05,
        Flex: 0.06,
        Elétrico: 0.01,
        Diesel: 0.08,
        GNV: 0.06,
      },
      Carro: {
        Gasolina: 0.12,
        Álcool: 0.08,
        Flex: 0.10,
        Elétrico: 0.02,
        Diesel: 0.14,
        GNV: 0.10,
      },
      Van: {
        Gasolina: 0.18,
        Álcool: 0.14,
        Flex: 0.16,
        Elétrico: 0.03,
        Diesel: 0.20,
        GNV: 0.15,
      },
      Ônibus: {
        Diesel: 0.25,
        Elétrico: 0.05,
        GNV: 0.18,
        Gasolina: 0.28,
        Álcool: 0.22,
        Flex: 0.24,
      },
    };

    // Get emission factor based on vehicle and fuel
    const emissionFactor = emissionFactors[transport.vehicle]?.[transport.fuel] || 0.12;

    // Calculate per-vehicle emission (kg)
    const vehicleEmission = transport.distance * emissionFactor;
    
    // Add passenger factor - cada passageiro adiciona 15% à emissão base do veículo
    const passengerFactor = transport.passengers ? (1 + (transport.passengers * 0.15)) : 1;
    
    // Calculate total emission including passengers (kg)
    const totalEmission = vehicleEmission * passengerFactor;

    // Convert kg to ton
    const emissionTons = totalEmission / 1000;
    
    // Price per ton of CO2 (in R$)
    const pricePerTon = 40;
    
    // Calculate raw compensation value
    let rawValue = emissionTons * pricePerTon;
    
    // Apply minimum value of R$ 9.84
    // Fix: Ensure values below R$ 9.84 are set to R$ 9.84
    const compensationValue = Math.max(rawValue, 9.84);

    // Update calculation state
    setCalculation({
      emissionFactor,
      totalEmission,
      compensationValue,
    });
  };

  // Value object that will be provided to consumers
  const value = {
    currentStep,
    setCurrentStep,
    user,
    setUser,
    origin,
    setOrigin,
    transport,
    setTransport,
    calculation,
    setCalculation,
    updateTransport,
    calculateEmissionAndCompensation,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use the AppContext
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
