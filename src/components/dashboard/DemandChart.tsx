
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import type { YearlyDemandData, DemandSectorType, FuelType } from '@/types';

interface DemandChartProps {
  data: YearlyDemandData[];
  sectors: DemandSectorType[];
  fuels: FuelType[];
}

const SECTOR_COLORS: { [key in DemandSectorType]: string } = {
  heat_pumps: '#FF6B6B',
  electric_vehicles: '#4D96FF',
  industry: '#6BCB77',
};

const FUEL_STROKE: { [key in FuelType]: string | undefined } = {
    electricity: undefined, // solid line
    hydrogen: '5 5', // dashed line
}

const DemandChart = ({ data, sectors, fuels }: DemandChartProps) => {

  const chartData = useMemo(() => data.map(yearlyData => {
    const record: { [key: string]: number | string } = { year: yearlyData.year };
    yearlyData.sectors.forEach(sectorData => {
      if (sectors.includes(sectorData.type)) {
        sectorData.fuels.forEach(fuelData => {
            if (fuels.includes(fuelData.type)) {
                record[`${sectorData.type}-${fuelData.type}`] = fuelData.energy_required;
            }
        });
      }
    });
    return record;
  }), [data, sectors, fuels]);

  if (sectors.length === 0 || fuels.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Energy Demand</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Please select at least one demand sector and one fuel type to display the chart.</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Energy Demand by Sector</CardTitle>
        <CardDescription>Projected values from 2025 to 2050 in TWh.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis
              dataKey="year"
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis
              unit=" TWh"
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={{ stroke: 'hsl(var(--border))' }}
            />
            <Tooltip />
            <Legend />
            {sectors.map(sector => (
              <React.Fragment key={sector}>
                {fuels.map(fuel => (
                  <Line
                    key={`${sector}-${fuel}`}
                    type="monotone"
                    dataKey={`${sector}-${fuel}`}
                    stroke={SECTOR_COLORS[sector]}
                    strokeDasharray={FUEL_STROKE[fuel]}
                    name={`${sector.replace(/_/g, ' ')} (${fuel.charAt(0).toUpperCase() + fuel.slice(1)})`}
                    dot={false}
                  />
                ))}
              </React.Fragment>
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DemandChart;
