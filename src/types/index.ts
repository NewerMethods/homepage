
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

export interface EnergyIntensityData {
  from: string;
  to: string;
  intensity: {
    forecast: number;
    actual: number;
    index: string;
  };
}

export interface EnergyRegionData {
  regionid: number;
  dnoregion: string;
  shortname: string;
  intensity: {
    forecast: number;
    index: string;
  };
}
