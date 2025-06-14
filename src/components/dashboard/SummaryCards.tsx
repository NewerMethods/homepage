
import { Leaf, Zap } from "lucide-react";
import { IntensityCard } from "@/components/IntensityCard";
import type { EnergyIntensityData } from "@/types";
import TimeframeCard from "./TimeframeCard";

interface SummaryCardsProps {
  intensityData: EnergyIntensityData;
}

const SummaryCards = ({ intensityData }: SummaryCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <IntensityCard
        title="Carbon Intensity"
        value={intensityData.intensity.forecast}
        unit="gCO₂/kWh"
        icon={Leaf}
        color="text-green-400"
      />
      <IntensityCard
        title="Intensity Index"
        value={intensityData.intensity.index}
        unit="National Average"
        icon={Zap}
        color="text-yellow-400"
      />
      <TimeframeCard from={intensityData.from} to={intensityData.to} />
    </div>
  );
};

export default SummaryCards;
