
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import type { YearlyEnergyData, TechnologyType, Metric } from '@/types';

interface GenerationChartProps {
  data: YearlyEnergyData[];
  metrics: Metric[];
  technologies: TechnologyType[];
}

const COLORS: { [key in TechnologyType]: string } = {
  solar: '#FFC300',
  wind: '#00A8E8',
  gas: '#8D99AE',
  hydro: '#4CAF50',
};

const METRIC_LABELS: { [key in Metric]: { name: string, unit: string } } = {
  installed_capacity: { name: 'Capacity', unit: 'GW' },
  electricity_generation: { name: 'Generation', unit: 'TWh' },
};

const GenerationChart = ({ data, metrics, technologies }: GenerationChartProps) => {

  const chartData = useMemo(() => data.map(yearlyData => {
    const record: { [key: string]: number | string } = { year: yearlyData.year };
    yearlyData.technologies.forEach(techData => {
      if (technologies.includes(techData.type)) {
        metrics.forEach(metric => {
            record[`${techData.type}-${metric}`] = techData[metric];
        });
      }
    });
    return record;
  }), [data, metrics, technologies]);

  const yAxis1Metric = metrics[0];
  const yAxis2Metric = metrics[1];

  if (metrics.length === 0 || technologies.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Energy Generation & Capacity</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Please select at least one metric and one technology to display the chart.</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Energy Generation & Capacity</CardTitle>
        <CardDescription>Projected values from 2025 to 2050.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis
              dataKey="year"
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={{ stroke: 'hsl(var(--border))' }}
            />
            {yAxis1Metric && (
              <YAxis
                yAxisId="left"
                unit={` ${METRIC_LABELS[yAxis1Metric].unit}`}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
              />
            )}
            {yAxis2Metric && (
              <YAxis
                yAxisId="right"
                orientation="right"
                unit={` ${METRIC_LABELS[yAxis2Metric].unit}`}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
              />
            )}
            <Tooltip />
            <Legend />
            {technologies.map(tech => (
              <React.Fragment key={tech}>
                {yAxis1Metric && (
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey={`${tech}-${yAxis1Metric}`}
                    stroke={COLORS[tech]}
                    name={`${tech} (${METRIC_LABELS[yAxis1Metric].name})`}
                    dot={false}
                  />
                )}
                {yAxis2Metric && (
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey={`${tech}-${yAxis2Metric}`}
                    stroke={COLORS[tech]}
                    strokeDasharray="5 5"
                    name={`${tech} (${METRIC_LABELS[yAxis2Metric].name})`}
                    dot={false}
                  />
                )}
              </React.Fragment>
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GenerationChart;
