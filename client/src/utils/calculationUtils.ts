/**
 * Calculate the round trip distance based on origin city
 * @param origin The origin city and state
 * @returns The round trip distance in kilometers
 */
export function calculateRoundTripDistance(origin: { city: string; state: string; customCity?: boolean }): number {
  // Distances are one-way from the origin to São Thomé das Letras (MG) in kilometers
  const oneWayDistances: Record<string, Record<string, number>> = {
    "SP": {
      "São Paulo": 320,
      "Guarulhos": 340,
      "Campinas": 280,
      "Santos": 390,
      "Santo André": 330,
      "São Bernardo do Campo": 335,
      "Osasco": 330,
      "Ribeirão Preto": 370,
      "DEFAULT": 350,
    },
    "RJ": {
      "Rio de Janeiro": 430,
      "Niterói": 450,
      "São Gonçalo": 460,
      "Búzios": 540,
      "Petrópolis": 390,
      "Angra dos Reis": 500,
      "Nova Iguaçu": 420,
      "Duque de Caxias": 410,
      "DEFAULT": 450,
    },
    "MG": {
      "Belo Horizonte": 280,
      "Juiz de Fora": 220,
      "Ouro Preto": 340,
      "Uberlândia": 480,
      "Tiradentes": 180,
      "Contagem": 290,
      "Uberaba": 400,
      "São Thomé das Letras": 0, // Mesmo local
      "DEFAULT": 300,
    },
    "PA": {
      "Belém": 2800,
      "Ananindeua": 2820,
      "Santarém": 3200,
      "Marabá": 2500,
      "Castanhal": 2850,
      "Parauapebas": 2400,
      "DEFAULT": 2800,
    },
    "BA": {
      "Salvador": 1700,
      "Feira de Santana": 1650,
      "Vitória da Conquista": 1200,
      "Camaçari": 1720,
      "Porto Seguro": 1500,
      "Ilhéus": 1450,
      "DEFAULT": 1600,
    },
    "PR": {
      "Curitiba": 650,
      "Londrina": 720,
      "Maringá": 780,
      "Foz do Iguaçu": 1050,
      "Ponta Grossa": 700,
      "Cascavel": 900,
      "DEFAULT": 750,
    },
    "RS": {
      "Porto Alegre": 1300,
      "Caxias do Sul": 1350,
      "Pelotas": 1450,
      "Canoas": 1320,
      "Santa Maria": 1500,
      "Gramado": 1400,
      "DEFAULT": 1400,
    },
    "SC": {
      "Florianópolis": 850,
      "Joinville": 800,
      "Blumenau": 830,
      "Balneário Camboriú": 870,
      "Criciúma": 950,
      "Chapecó": 1050,
      "DEFAULT": 900,
    },
    "GO": {
      "Goiânia": 800,
      "Anápolis": 820,
      "Rio Verde": 850,
      "Aparecida de Goiânia": 810,
      "Caldas Novas": 700,
      "Catalão": 650,
      "DEFAULT": 800,
    },
    "PE": {
      "Recife": 2300,
      "Jaboatão dos Guararapes": 2310,
      "Olinda": 2290,
      "Caruaru": 2200,
      "Petrolina": 1900,
      "Paulista": 2320,
      "DEFAULT": 2200,
    },
    "CE": {
      "Fortaleza": 2700,
      "Caucaia": 2720,
      "Juazeiro do Norte": 2400,
      "Maracanaú": 2710,
      "Sobral": 2650,
      "Crato": 2450,
      "DEFAULT": 2600,
    },
    "AM": {
      "Manaus": 3500,
      "Parintins": 3600,
      "Itacoatiara": 3550,
      "Manacapuru": 3580,
      "Coari": 3650,
      "Tefé": 3700,
      "DEFAULT": 3600,
    },
    "ES": {
      "Vitória": 750,
      "Vila Velha": 760,
      "Serra": 740,
      "Cariacica": 755,
      "Cachoeiro de Itapemirim": 680,
      "Linhares": 800,
      "DEFAULT": 750,
    },
    "DF": {
      "Brasília": 950,
      "Ceilândia": 960,
      "Taguatinga": 955,
      "Plano Piloto": 945,
      "Samambaia": 965,
      "Águas Claras": 950,
      "DEFAULT": 950,
    },
    "MT": {
      "Cuiabá": 1350,
      "Várzea Grande": 1360,
      "Rondonópolis": 1250,
      "Sinop": 1600,
      "Tangará da Serra": 1550,
      "Cáceres": 1450,
      "DEFAULT": 1400,
    },
    "MS": {
      "Campo Grande": 1050,
      "Dourados": 1100,
      "Três Lagoas": 800,
      "Corumbá": 1350,
      "Ponta Porã": 1200,
      "Naviraí": 1050,
      "DEFAULT": 1100,
    },
    // Estados do Nordeste
    "MA": {
      "São Luís": 2500,
      "Imperatriz": 2200,
      "DEFAULT": 2400,
    },
    "PI": {
      "Teresina": 2400,
      "Parnaíba": 2500,
      "DEFAULT": 2450,
    },
    "RN": {
      "Natal": 2600,
      "Mossoró": 2550,
      "DEFAULT": 2600,
    },
    "PB": {
      "João Pessoa": 2450,
      "Campina Grande": 2400,
      "DEFAULT": 2450,
    },
    "AL": {
      "Maceió": 2200,
      "Arapiraca": 2150,
      "DEFAULT": 2200,
    },
    "SE": {
      "Aracaju": 2050,
      "Nossa Senhora do Socorro": 2060,
      "DEFAULT": 2050,
    },
    // Estados do Norte
    "AC": {
      "Rio Branco": 3600,
      "Cruzeiro do Sul": 3800,
      "DEFAULT": 3700,
    },
    "RO": {
      "Porto Velho": 2900,
      "Ji-Paraná": 2800,
      "DEFAULT": 2850,
    },
    "RR": {
      "Boa Vista": 4100,
      "Caracaraí": 4000,
      "DEFAULT": 4050,
    },
    "AP": {
      "Macapá": 3300,
      "Santana": 3310,
      "DEFAULT": 3300,
    },
    "TO": {
      "Palmas": 1800,
      "Araguaína": 1750,
      "DEFAULT": 1800,
    },
    // Valor padrão para qualquer estado não listado
    "DEFAULT": {
      "DEFAULT": 1500,
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
