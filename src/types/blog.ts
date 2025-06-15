
import type { ReportContentBlock } from '@/types/reports';

export interface BlogListItem {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO 8601 format: "YYYY-MM-DD"
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: ReportContentBlock[];
}
