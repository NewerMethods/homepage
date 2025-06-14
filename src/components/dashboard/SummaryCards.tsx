
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Leaf, Zap } from "lucide-react";
import { IntensityCard } from "@/components/IntensityCard";
import type { EnergyIntensityData } from "@/types";

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
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Data Timeframe</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">From: {new Date(intensityData.from).toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">To: {new Date(intensityData.to).toLocaleString()}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
