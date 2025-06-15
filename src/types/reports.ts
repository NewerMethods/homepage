
export interface ReportListItem {
  slug: string;
  title: string;
  description: string;
}

export interface ReportContentBlock {
  type: 'heading' | 'paragraph' | 'chart';
  id?: string;
  content?: string;
  chartType?: 'line' | 'heatmap' | 'image';
  dataUrl?: string;
  title?: string;
  description?: string;
}

export interface ReportSection {
  id: string;
  title: string;
}

export interface Report {
  slug: string;
  title: string;
  sections: ReportSection[];
  content: ReportContentBlock[];
}
