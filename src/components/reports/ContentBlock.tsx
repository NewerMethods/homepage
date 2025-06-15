
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ReportContentBlock as ReportContentBlockType } from '@/types/reports';
import { fetchChartData } from '@/services/reportApi';
import { AnimatedParagraph } from './AnimatedParagraph';
import { Section } from './Section';
import { ReportLineChart } from './ReportLineChart';
import { ReportHeatmap } from './ReportHeatmap';
import { Skeleton } from '@/components/ui/skeleton';

type ContentBlockProps = {
  block: ReportContentBlockType;
};

const ChartRenderer = ({ block }: ContentBlockProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['chartData', block.dataUrl],
    queryFn: () => fetchChartData(block.dataUrl!),
    enabled: !!block.dataUrl,
  });

  if (isLoading) return <Skeleton className="h-[400px] w-full my-8" />;
  if (error) return <div className="text-red-500 my-8">Error loading chart data.</div>;

  switch (block.chartType) {
    case 'line':
      return <ReportLineChart data={data} title={block.title} description={block.description} />;
    case 'heatmap':
      return <ReportHeatmap data={data} title={block.title} description={block.description} />;
    default:
      return null;
  }
};

export const ContentBlock = ({ block }: ContentBlockProps) => {
  const content = (
    <>
      {block.type === 'heading' && <h2 className="text-3xl font-bold mb-4">{block.content}</h2>}
      {block.type === 'paragraph' && <AnimatedParagraph>{block.content}</AnimatedParagraph>}
      {block.type === 'chart' && <ChartRenderer block={block} />}
    </>
  );

  if (block.id) {
    return <Section id={block.id}>{content}</Section>;
  }

  return <div className="py-8 first:pt-0 last:pb-0">{content}</div>;
};
