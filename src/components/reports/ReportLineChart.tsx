
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type ReportLineChartProps = {
  data: any[];
  title?: string;
  description?: string;
};

export const ReportLineChart = ({ data, title, description }: ReportLineChartProps) => {
  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle>{title || 'Renewable Energy Growth'}</CardTitle>
        <CardDescription>{description || 'Solar vs. Wind Generation (in TWh)'}</CardDescription>
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
