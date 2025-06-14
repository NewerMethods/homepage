
import type { YearlyEnergyData } from "@/types";

export interface GenerationCapacityData {
  data: YearlyEnergyData[];
}

// Function to generate mock data
const generateMockData = (): YearlyEnergyData[] => {
  const data: YearlyEnergyData[] = [];
  let solarCapacity = 15; // GW
  let windCapacity = 25; // GW
  let gasCapacity = 40; // GW

  for (let year = 2025; year <= 2050; year++) {
    // simple growth/decline models
    solarCapacity *= 1.12;
    windCapacity *= 1.08;
    gasCapacity *= 0.97;

    data.push({
      year,
      technologies: [
        { type: 'solar', installed_capacity: Math.round(solarCapacity), electricity_generation: Math.round(solarCapacity * 1.3) }, // TWh from GW
        { type: 'wind', installed_capacity: Math.round(windCapacity), electricity_generation: Math.round(windCapacity * 3) }, // TWh from GW
        { type: 'gas', installed_capacity: Math.round(gasCapacity), electricity_generation: Math.round(gasCapacity * 4) }, // TWh from GW
      ],
    });
  }
  return data;
};

export const fetchEnergyData = async (): Promise<GenerationCapacityData> => {
  // In a real app, this would be an API call.
  // For now, we'll return mock data.
  const mockData = generateMockData();
  await new Promise(resolve => setTimeout(resolve, 500)); // simulate network delay
  return Promise.resolve({ data: mockData });
};
