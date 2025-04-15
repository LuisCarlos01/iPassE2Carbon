import { useAppContext } from "../../context/AppContext";

export default function EmissionCalculator() {
  const { transport, calculation } = useAppContext();

  if (!transport || !calculation) {
    return (
      <div className="card-container">
        <h2 className="card-title">Emissão de CO₂</h2>
        <p className="text-gray-500">Calculando emissões...</p>
      </div>
    );
  }

  return (
    <div className="card-container">
      <h2 className="card-title">Emissão de CO₂</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Fator de emissão</h3>
          <p className="text-2xl font-bold text-gray-900">{calculation.emissionFactor.toFixed(2)} kg/km</p>
          <p className="mt-1 text-sm text-gray-500">
            Baseado no tipo de veículo e combustível
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Emissão total</h3>
          <p className="text-2xl font-bold text-gray-900">{calculation.totalEmission.toFixed(1)} kg</p>
          <p className="mt-1 text-sm text-gray-500">
            Distância × Fator de emissão
          </p>
        </div>
      </div>
    </div>
  );
}
