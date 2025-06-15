
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchReport } from '@/services/reportApi';
import { ReportLayout } from '@/components/reports/ReportLayout';
import { ContentBlock } from '@/components/reports/ContentBlock';
import { Skeleton } from '@/components/ui/skeleton';

const ReportPage = () => {
  const { reportSlug } = useParams<{ reportSlug: string }>();

  const { data: report, isLoading, error } = useQuery({
    queryKey: ['report', reportSlug],
    queryFn: () => fetchReport(reportSlug!),
    enabled: !!reportSlug,
  });

  if (isLoading) {
    return (
      <div className="flex">
        <div className="w-56 hidden md:block mr-8">
            <Skeleton className="h-48 w-full" />
        </div>
        <div className="flex-1">
          <Skeleton className="h-10 w-3/4 mb-12" />
          <Skeleton className="h-8 w-1/2 mb-4" />
          <Skeleton className="h-24 w-full mb-8" />
          <Skeleton className="h-8 w-1/2 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (error || !report) {
    return <div>Error loading report. It may not exist or there was a problem fetching it.</div>;
  }

  return (
    <ReportLayout sections={report.sections}>
      {report.content.map((block, index) => (
        <ContentBlock key={index} block={block} />
      ))}
    </ReportLayout>
  );
};

export default ReportPage;
