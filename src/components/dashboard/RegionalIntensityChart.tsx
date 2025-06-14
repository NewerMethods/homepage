
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import type { EnergyRegionData } from "@/types";

const chartConfig = {
  intensity: {
    label: "Intensity (gCO₂/kWh)",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

interface RegionalIntensityChartProps {
    regionalData: EnergyRegionData[];
}

const RegionalIntensityChart = ({ regionalData }: RegionalIntensityChartProps) => {
    const chartData = regionalData.map(r => ({
        name: r.shortname,
        intensity: r.intensity?.forecast || 0,
    })).sort((a,b) => b.intensity - a.intensity);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Regional Carbon Intensity</CardTitle>
                <CardDescription>Forecasted gCO₂/kWh by region.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            fontSize={12}
                        />
                        <YAxis
                           tickLine={false}
                           axisLine={false}
                           fontSize={12}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="intensity"
                            fill="var(--color-intensity)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default RegionalIntensityChart;
