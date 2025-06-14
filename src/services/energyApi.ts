
import type { GenerationCapacityData } from "@/types";

export const fetchEnergyData = async (): Promise<GenerationCapacityData> => {
  const response = await fetch('/energyData.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: GenerationCapacityData = await response.json();
  return data;
};
