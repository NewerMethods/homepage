
import type { Report, ReportListItem } from '@/types/reports';

// Import JSON data directly instead of fetching
import reportList from '@/data/reports/report-list.json';
import report1 from '@/data/reports/energy-report-1.json';
import report2 from '@/data/reports/energy-report-2.json';
import report3 from '@/data/reports/energy-report-3.json';

import renewableGrowthData from '@/data/reports/report-data/renewable-growth-linechart.json';
import regionalEnergyData from '@/data/reports/report-data/regional-energy-heatmap.json';

const reports: Record<string, Report> = {
  'energy-report-1': report1,
  'energy-report-2': report2,
  'energy-report-3': report3,
};

const chartData: Record<string, any> = {
  '/data/reports/report-data/renewable-growth-linechart.json': renewableGrowthData,
  '/data/reports/report-data/regional-energy-heatmap.json': regionalEnergyData,
};


export const fetchReportList = async (): Promise<ReportListItem[]> => {
  return Promise.resolve(reportList as ReportListItem[]);
};

export const fetchReport = async (slug: string): Promise<Report> => {
  const report = reports[slug];
  if (report) {
    return Promise.resolve(report);
  }
  return Promise.reject(new Error(`Report with slug "${slug}" not found.`));
};

export const fetchChartData = async (url: string): Promise<any> => {
    const data = chartData[url];
    if (data) {
        return Promise.resolve(data);
    }
    return Promise.reject(new Error(`Chart data for url "${url}" not found.`));
}
