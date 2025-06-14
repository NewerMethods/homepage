export interface SubstackPost {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: {
    link: string;
    type: string;
    length: number;
  };
  categories: string[];
}

export type TechnologyType = 'solar' | 'wind' | 'gas';
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
