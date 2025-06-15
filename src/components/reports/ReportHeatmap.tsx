import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type ReportHeatmapProps = {
  data: any[];
  title?: string;
  description?: string;
};

const regions = ['North', 'South', 'East', 'West', 'Central'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getColor = (value: number) => {
    const max = 250;
    const min = 50;
    const ratio = (value - min) / (max - min);
    const hue = (1 - ratio) * 240; 
    return `hsl(${hue}, 80%, 60%)`;
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-2 border bg-background rounded-md shadow-lg">
          <p className="font-bold">{`${data.region} - ${data.month}`}</p>
          <p>{`Energy Usage: ${data.value} GWh`}</p>
        </div>
      );
    }
    return null;
};

export const ReportHeatmap = ({ data, title, description }: ReportHeatmapProps) => {
  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle>{title || 'Regional Energy Usage Heatmap'}</CardTitle>
        <CardDescription>{description || 'Monthly energy usage across different regions (in GWh)'}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
              <CartesianGrid />
              <XAxis 
                dataKey="monthIndex" 
                type="number" 
                name="Month" 
                domain={[-0.5, 11.5]}
                ticks={months.map((_, i) => i)}
                tickFormatter={(tick) => months[tick] || ''}
                angle={-45}
                textAnchor="end"
                interval={0}
              />
              <YAxis 
                dataKey="regionIndex" 
                type="number" 
                name="Region"
                domain={[-0.5, 4.5]}
                ticks={regions.map((_, i) => i)}
                tickFormatter={(tick) => regions[tick] || ''}
                interval={0}
              />
              <ZAxis dataKey="value" type="number" range={[200, 800]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
              <Scatter name="Energy Usage" data={data} shape="square">
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(entry.value)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
