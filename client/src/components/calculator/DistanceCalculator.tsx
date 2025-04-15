import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { calculateRoundTripDistance } from "../../utils/calculationUtils";

export default function DistanceCalculator() {
  const { origin, transport, updateTransport, calculateEmissionAndCompensation } = useAppContext();

  if (!origin || !transport) {
    return (
      <div className="card-container">
        <h2 className="card-title">Distância</h2>
        <p className="text-gray-500">Carregando dados...</p>
      </div>
    );
  }

  // Toggle automatic calculation
  const toggleAutomaticCalc = () => {
    if (!transport.isAutomaticCalc) {
      // Turning on automatic calculation
      // Fix: Properly calculate round trip distance
      const roundTripDistance = calculateRoundTripDistance(origin);
      updateTransport({ 
        isAutomaticCalc: true,
        distance: roundTripDistance
      });
    } else {
      // Turning off automatic calculation
      updateTransport({ isAutomaticCalc: false });
    }
  };

  // Handle manual distance input
  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const distance = parseFloat(e.target.value) || 0;
    updateTransport({ distance });
  };

  // Update distance when origin changes if automatic calculation is on
  useEffect(() => {
    if (origin && transport && transport.isAutomaticCalc) {
      // Fix: Properly calculate round trip distance
      const roundTripDistance = calculateRoundTripDistance(origin);
      updateTransport({ distance: roundTripDistance });
    }
  }, [origin, transport?.isAutomaticCalc]);

  // Recalculate emissions when distance changes
  useEffect(() => {
    if (origin && transport) {
      calculateEmissionAndCompensation();
    }
  }, [transport?.distance]);

  return (
    <div className="card-container">
      <h2 className="card-title">Distância</h2>
      
      {/* Toggle Switch for automatic calculation */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-700">Cálculo automático da distância (ida e volta)</span>
        <button 
          type="button" 
          onClick={toggleAutomaticCalc}
          className={`relative inline-flex h-6 w-11 items-center rounded-full ${transport.isAutomaticCalc ? 'bg-green-600' : 'bg-gray-200'}`}
        >
          <span className="sr-only">Usar cálculo automático</span>
          <span className="inline-block h-4 w-9 rounded-full bg-gray-200"></span>
          <span 
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-1 ring-gray-200 transition-transform ${
              transport.isAutomaticCalc ? 'translate-x-5' : 'translate-x-0'
            }`}
          ></span>
        </button>
      </div>
      
      {/* Distance Input Field (shown when automatic calculation is off) */}
      {!transport.isAutomaticCalc && (
        <div className="mb-4">
          <label htmlFor="manual-distance" className="block text-sm font-medium text-gray-700 mb-1">
            Distância total (ida e volta em km)
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              id="manual-distance"
              className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="0"
              value={transport.distance}
              onChange={handleDistanceChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500 sm:text-sm">km</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Insira a distância total considerando ida e volta ao festival
          </p>
        </div>
      )}
      
      {/* Automatic Calculation Result (shown when automatic calculation is on) */}
      {transport.isAutomaticCalc && (
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Distância calculada (ida e volta)</h3>
              <p className="text-2xl font-bold text-gray-900">{transport.distance} km</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Distância calculada automaticamente considerando ida e volta entre sua origem e o STL Festival
          </p>
        </div>
      )}
    </div>
  );
}
