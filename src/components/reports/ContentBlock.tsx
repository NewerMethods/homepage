
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ReportContentBlock as ReportContentBlockType } from '@/types/reports';
import { fetchChartData } from '@/services/reportApi';
import { Section } from './Section';
import { ReportLineChart } from './ReportLineChart';
import { ReportHeatmap } from './ReportHeatmap';
import { Skeleton } from '@/components/ui/skeleton';
import { debounce } from '@/lib/utils';
import { motion } from 'framer-motion';

type ContentBlockProps = {
  block: ReportContentBlockType;
};

const ChartRenderer = ({ block }: ContentBlockProps) => {
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    const handleResize = debounce(() => {
      setRenderKey(prev => prev + 1);
    }, 200);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['chartData', block.dataUrl],
    queryFn: () => fetchChartData(block.dataUrl!),
    enabled: !!block.dataUrl && block.chartType !== 'image',
  });
  
  if (block.chartType === 'image') {
    return (
      <figure className="my-8">
        <img src={block.dataUrl} alt={block.description} className="rounded-lg w-full shadow-md" />
        {block.title && <figcaption className="text-center text-sm text-muted-foreground mt-2">{block.title}</figcaption>}
      </figure>
    );
  }

  if (isLoading) return <Skeleton className="h-[400px] w-full my-8" />;
  if (error) return <div className="text-red-500 my-8">Error loading chart data.</div>;

  switch (block.chartType) {
    case 'line':
      return <ReportLineChart key={renderKey} data={data} title={block.title} description={block.description} />;
    case 'heatmap':
      return <ReportHeatmap key={renderKey} data={data} title={block.title} description={block.description} />;
    default:
      return null;
  }
};

const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const ContentBlock = ({ block }: ContentBlockProps) => {
  const content = (
    <>
      {block.type === 'heading' && <h2 className="text-3xl font-bold mt-4 mb-2">{block.content}</h2>}
      {block.type === 'paragraph' && block.content && (
        <motion.div
          variants={paragraphVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      )}
      {block.type === 'chart' && <ChartRenderer block={block} />}
    </>
  );

  if (block.id) {
    return <Section id={block.id}>{content}</Section>;
  }

  return <div className="py-2 first:pt-0 last:pb-0">{content}</div>;
};
