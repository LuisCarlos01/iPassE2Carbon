/**
 * Calculate the round trip distance based on origin city
 * @param origin The origin city and state
 * @returns The round trip distance in kilometers
 */
export function calculateRoundTripDistance(origin: { city: string; state: string; customCity?: boolean }): number {
  // Distances are one-way from the origin to the festival in kilometers
  const oneWayDistances: Record<string, Record<string, number>> = {
    "SP": {
      "São Paulo": 30,
      "Guarulhos": 40,
      "Campinas": 100,
      "Santos": 80,
      "Santo André": 25,
      "São Bernardo do Campo": 30,
      "Osasco": 20,
      // Add more cities as needed
      "DEFAULT": 50, // Default distance for SP cities not in the list
    },
    "RJ": {
      "Rio de Janeiro": 430,
      "Niterói": 450,
      "São Gonçalo": 460,
      // Add more cities as needed
      "DEFAULT": 450, // Default distance for RJ cities not in the list
    },
    "MG": {
      "Belo Horizonte": 580,
      "Uberlândia": 600,
      // Add more cities as needed
      "DEFAULT": 600, // Default distance for MG cities not in the list
    },
    // Add more states as needed
    "DEFAULT": {
      "DEFAULT": 500, // Default distance for states not in the list
    },
  };

  // Get the state-specific distances or use DEFAULT state if not found
  const stateDistances = oneWayDistances[origin.state] || oneWayDistances["DEFAULT"];
  
  // Get the city-specific distance or use DEFAULT city if not found
  let oneWayDistance = stateDistances[origin.city] || stateDistances["DEFAULT"];
  
  // For custom cities, use the state default distance
  if (origin.customCity) {
    oneWayDistance = stateDistances["DEFAULT"];
  }

  // Return the round trip distance (multiply by 2)
  // Fix: This properly applies the round trip calculation by multiplying by 2
  return oneWayDistance * 2;
}

/**
 * Format a number as currency in BRL
 * @param value The number to format
 * @returns Formatted string in BRL currency
 */
export function formatCurrency(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

/**
 * Calculate compensation value based on emissions
 * @param emission Total emission in kg
 * @returns Compensation value in BRL
 */
export function calculateCompensationValue(emission: number): number {
  // Convert kg to ton
  const emissionTons = emission / 1000;
  
  // Price per ton of CO2 (in R$)
  const pricePerTon = 40;
  
  // Calculate raw compensation value
  let rawValue = emissionTons * pricePerTon;
  
  // Apply minimum value of R$ 9.84
  // Fix: Ensure values below R$ 9.84 are set to R$ 9.84
  return Math.max(rawValue, 9.84);
}
