
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import type { EnergyRegionData } from "@/types";

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
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{
                                background: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                            }}
                        />
                        <Legend />
                        <Bar dataKey="intensity" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default RegionalIntensityChart;
