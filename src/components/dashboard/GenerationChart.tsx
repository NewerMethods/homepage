
import React, { useMemo, useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Download } from 'lucide-react';
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
  emissions: { name: 'Emissions', unit: 'MtCO2e' },
};

const GenerationChart = ({ data, metrics, technologies }: GenerationChartProps) => {
  const [minYear, maxYear] = useMemo(() => {
    if (!data || data.length === 0) return [2025, 2050];
    return [data[0].year, data[data.length - 1].year];
  }, [data]);

  const [yearRange, setYearRange] = useState<[number, number]>([minYear, maxYear]);

  useEffect(() => {
    setYearRange([minYear, maxYear]);
  }, [minYear, maxYear]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(d => d.year >= yearRange[0] && d.year <= yearRange[1]);
  }, [data, yearRange]);

  const chartData = useMemo(() => filteredData.map(yearlyData => {
    const record: { [key: string]: number | string } = { year: yearlyData.year };
    yearlyData.technologies.forEach(techData => {
      if (technologies.includes(techData.type)) {
        metrics.forEach(metric => {
            record[`${techData.type}-${metric}`] = techData[metric];
        });
      }
    });
    return record;
  }), [filteredData, metrics, technologies]);

  const yAxis1Metric = metrics[0];
  const yAxis2Metric = metrics[1];

  const handleDownload = () => {
    if (!chartData || chartData.length === 0) return;

    const headers = Object.keys(chartData[0]);
    const csvRows = [
        headers.join(','),
        ...chartData.map(row => 
            headers.map(header => {
                const value = row[header as keyof typeof row];
                const stringValue = typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
                return stringValue;
            }).join(',')
        )
    ];
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'generation-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
            <CardTitle>Energy Generation & Capacity</CardTitle>
            <CardDescription>Projected values from {yearRange[0]} to {yearRange[1]}.</CardDescription>
        </div>
        <Button variant="outline" size="icon" onClick={handleDownload} disabled={chartData.length === 0}>
            <Download className="h-4 w-4" />
            <span className="sr-only">Download Data as CSV</span>
        </Button>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 40, right: yAxis2Metric ? 60 : 30, left: 30, bottom: 40 }}>
            <XAxis
              dataKey="year"
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={{ stroke: 'hsl(var(--border))' }}
              tick={{ dy: 10, fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickCount={8}
              domain={yearRange}
              type="number"
            />
            {yAxis1Metric && (
              <YAxis
                yAxisId="left"
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
                tick={{ dx: -5, fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                label={{
                  value: METRIC_LABELS[yAxis1Metric].unit,
                  position: 'top',
                  dy: -15,
                  style: { textAnchor: 'start', fill: 'hsl(var(--muted-foreground))' },
                }}
              />
            )}
            {yAxis2Metric && (
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
                tick={{ dx: 5, fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                label={{
                  value: METRIC_LABELS[yAxis2Metric].unit,
                  position: 'top',
                  dy: -15,
                  style: { textAnchor: 'end', fill: 'hsl(var(--muted-foreground))' },
                }}
              />
            )}
            <Tooltip />
            <Legend verticalAlign="bottom" />
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
      <CardFooter className="flex flex-col items-center gap-4 border-t pt-6">
        <div className="w-full max-w-md">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>{yearRange[0]}</span>
                <span>{yearRange[1]}</span>
            </div>
            <Slider
                min={minYear}
                max={maxYear}
                step={1}
                value={yearRange}
                onValueChange={(value) => setYearRange(value as [number, number])}
                className="w-full"
            />
            <p className="text-center text-sm text-muted-foreground mt-2">
                Year Range
            </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GenerationChart;
