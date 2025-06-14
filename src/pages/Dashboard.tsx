
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Zap, Leaf, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { EnergyIntensityData, EnergyRegionData } from "@/types";

const fetchIntensity = async (): Promise<EnergyIntensityData> => {
  const res = await fetch("https://api.carbonintensity.org.uk/intensity");
  if (!res.ok) throw new Error("Failed to fetch national intensity");
  const data = await res.json();
  return data.data[0];
};

const fetchRegionalIntensity = async (): Promise<EnergyRegionData[]> => {
  const res = await fetch("https://api.carbonintensity.org.uk/regional");
  if (!res.ok) throw new Error("Failed to fetch regional intensity");
  const data = await res.json();
  return data.data[0].regions;
};

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
  const { data: intensity, isLoading: isLoadingIntensity, error: errorIntensity } = useQuery({
    queryKey: ["ukIntensity"],
    queryFn: fetchIntensity,
  });

  const { data: regional, isLoading: isLoadingRegional, error: errorRegional } = useQuery({
    queryKey: ["ukRegionalIntensity"],
    queryFn: fetchRegionalIntensity,
  });

  const error = errorIntensity || errorRegional;

  const chartData = regional?.map(r => ({
    name: r.shortname,
    intensity: r.data[0]?.intensity.forecast || 0,
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
        <p className="text-lg text-muted-foreground">Live data on Great Britain's electricity grid.</p>
      </header>

      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Fetching Data</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoadingIntensity ? <Skeleton className="h-28" /> : intensity && (
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
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Regional Carbon Intensity</CardTitle>
          <CardDescription>Forecasted gCO₂/kWh by region.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingRegional ? <Skeleton className="h-96" /> : (
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
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Dashboard;
