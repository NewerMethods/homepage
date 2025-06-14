
import type { EnergyData } from "@/types";

export const fetchEnergyData = async (): Promise<EnergyData> => {
  const response = await fetch('/energyData.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: EnergyData = await response.json();
  return data;
};
