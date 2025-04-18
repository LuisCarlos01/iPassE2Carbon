import { useAppContext } from "../../context/AppContext";

export default function TransportSummary() {
  const { origin, transport } = useAppContext();

  if (!origin || !transport) {
    return (
      <div className="card-container">
        <h2 className="card-title">Resumo da Viagem</h2>
        <p className="text-gray-500">Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className="card-container">
      <h2 className="card-title">Resumo da Viagem</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="value-label">Origem</span>
          <span className="value-display">
            {origin.city}, {origin.state}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="value-label">Destino</span>
          <span className="value-display">São Thomé das Letras (MG)</span>
        </div>
        <div className="flex flex-col">
          <span className="value-label">Veículo</span>
          <span className="value-display">{transport.vehicle}</span>
        </div>
        <div className="flex flex-col">
          <span className="value-label">Combustível</span>
          <span className="value-display">{transport.fuel}</span>
        </div>
        <div className="flex flex-col">
          <span className="value-label">Passageiros</span>
          <span className="value-display">
            {transport.passengers} {transport.passengers === 1 ? "pessoa" : "pessoas"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="value-label">Distância total</span>
          <span className="value-display">{transport.distance} km (ida e volta)</span>
        </div>
      </div>
    </div>
  );
}
