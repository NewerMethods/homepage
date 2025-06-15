
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { year: '2018', solar: 400, wind: 240 },
  { year: '2019', solar: 300, wind: 139 },
  { year: '2020', solar: 200, wind: 980 },
  { year: '2021', solar: 278, wind: 390 },
  { year: '2022', solar: 189, wind: 480 },
  { year: '2023', solar: 239, wind: 380 },
  { year: '2024', solar: 349, wind: 430 },
];

export const ReportLineChart = () => {
  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle>Renewable Energy Growth</CardTitle>
        <CardDescription>Solar vs. Wind Generation (in TWh)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="solar" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="wind" stroke="hsl(var(--secondary-foreground))" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
