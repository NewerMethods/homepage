
import type { Report, ReportListItem } from '@/types/reports';

const fetchData = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
    }
    return response.json();
};

export const fetchReportList = async (): Promise<ReportListItem[]> => {
    return fetchData<ReportListItem[]>('/data/reports/report-list.json');
};

export const fetchReport = async (slug: string): Promise<Report> => {
    return fetchData<Report>(`/data/reports/${slug}.json`);
};

export const fetchChartData = async (url: string): Promise<any> => {
    return fetchData<any>(url);
}
