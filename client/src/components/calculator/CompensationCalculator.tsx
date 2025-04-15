import { useAppContext } from "../../context/AppContext";
import { formatCurrency } from "../../utils/calculationUtils";

export default function CompensationCalculator() {
  const { calculation } = useAppContext();

  if (!calculation) {
    return (
      <div className="card-container">
        <h2 className="card-title">Valor da Compensação</h2>
        <p className="text-gray-500">Calculando valor...</p>
      </div>
    );
  }

  return (
    <div className="card-container">
      <h2 className="card-title">Valor da Compensação</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Preço por tonelada de CO₂</h3>
          <p className="text-2xl font-bold text-gray-900">R$ 40,00</p>
          <p className="mt-1 text-sm text-gray-500">
            Valor de mercado de créditos de carbono
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Valor a compensar</h3>
          <p className="text-3xl font-bold text-green-600">
            {formatCurrency(calculation.compensationValue)}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Valor mínimo para compensação: R$ 9,84
          </p>
        </div>
      </div>
      
      {/* Compensation Value Explanation */}
      <div className="mt-6 bg-green-50 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Sobre o valor da compensação</h3>
            <div className="mt-2 text-sm text-green-700">
              <p>
                O valor da compensação é calculado com base na emissão de CO₂ e no preço por tonelada.
                Aplicamos um valor mínimo de R$ 9,84 para compensações cujo cálculo resulte em valores inferiores a este montante.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
