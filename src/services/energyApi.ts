
import type { EnergyIntensityData, EnergyRegionData } from "@/types";

export interface EnergyData {
  nationalIntensityData: EnergyIntensityData;
  regionalIntensityData: EnergyRegionData[];
}

export const fetchEnergyData = async (): Promise<EnergyData> => {
  const response = await fetch('/energyData.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
