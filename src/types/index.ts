
export type TechnologyType = 'solar' | 'wind' | 'gas' | 'hydro';
export type Metric = 'installed_capacity' | 'electricity_generation';

export interface TechnologyData {
  type: TechnologyType;
  installed_capacity: number; // in GW
  electricity_generation: number; // in TWh
}

export interface YearlyEnergyData {
  year: number;
  technologies: TechnologyData[];
}

// New Demand Types
export type DemandSectorType = 'heat_pumps' | 'electric_vehicles' | 'industry';
export type FuelType = 'electricity' | 'hydrogen';

export interface FuelData {
  type: FuelType;
  energy_required: number; // in TWh
}

export interface DemandSectorData {
  type: DemandSectorType;
  fuels: FuelData[];
}

export interface YearlyDemandData {
  year: number;
  sectors: DemandSectorData[];
}

// New top-level data structure
export interface EnergyData {
  supply: YearlyEnergyData[];
  demand: YearlyDemandData[];
}

export interface SubstackPost {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: object;
  categories: string[];
}
