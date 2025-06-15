
import { useMemo } from 'react';
import type { YearlyEnergyData, TechnologyType, Metric } from '@/types';

export const useGenerationChartData = (
  data: YearlyEnergyData[] | undefined, 
  metrics: Metric[], 
  technologies: TechnologyType[], 
  yearRange: [number, number]
) => {
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

  return { chartData };
};
