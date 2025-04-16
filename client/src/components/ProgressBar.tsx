import { useAppContext } from "../context/AppContext";

type StepProps = {
  currentStep: number;
};

const steps = [
  { name: "Login", step: 0 },
  { name: "Origem", step: 1 },
  { name: "Transporte", step: 2 },
  { name: "Cálculo", step: 3 },
  { name: "Resultado", step: 4 },
  { name: "Pagamento", step: 5 },
];

export default function ProgressBar() {
  const { currentStep } = useAppContext();
  
  // Calculate progress percentage (steps are 0-based)
  const progressPercentage = Math.min(100, ((currentStep) / (steps.length - 1)) * 100);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-[#02ab89] h-2.5 rounded-full" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-600 mt-2">
        {steps.map((step) => (
          <span 
            key={step.step}
            className={currentStep === step.step ? "font-medium text-[#02ab89]" : ""}
          >
            {step.name}
          </span>
        ))}
      </div>
    </div>
  );
}
