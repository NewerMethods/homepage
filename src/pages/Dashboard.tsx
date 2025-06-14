
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Zap, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import type { EnergyIntensityData, EnergyRegionData } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const IntensityCard = ({ title, value, unit, icon: Icon, color }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 text-muted-foreground ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{unit}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const fetchEnergyData = async (): Promise<{ nationalIntensityData: EnergyIntensityData; regionalIntensityData: EnergyRegionData[] }> => {
    const response = await fetch('/energyData.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['energyData'],
    queryFn: fetchEnergyData
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <header className="mb-12">
          <Skeleton className="h-12 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </header>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[108px]" />
          <Skeleton className="h-[108px]" />
          <Skeleton className="h-[108px]" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/4 mb-2" />
            <Skeleton className="h-4 w-1/3" />
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-[400px]" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading energy data: {error.message}</div>;
  }
  
  const intensity = data!.nationalIntensityData;
  const regional = data!.regionalIntensityData;

  const chartData = regional.map(r => ({
    name: r.shortname,
    intensity: r.intensity?.forecast || 0,
  })).sort((a,b) => b.intensity - a.intensity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold font-display mb-2">UK Energy Dashboard</h1>
        <p className="text-lg text-muted-foreground">A snapshot of Great Britain's electricity grid.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <>
            <IntensityCard title="Carbon Intensity" value={intensity.intensity.forecast} unit="gCO₂/kWh" icon={Leaf} color="text-green-400" />
            <IntensityCard title="Intensity Index" value={intensity.intensity.index} unit="National Average" icon={Zap} color="text-yellow-400" />
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">Data Timeframe</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground">From: {new Date(intensity.from).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">To: {new Date(intensity.to).toLocaleString()}</p>
                </CardContent>
            </Card>
          </>
      </div>

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
    </motion.div>
  );
};

export default Dashboard;
