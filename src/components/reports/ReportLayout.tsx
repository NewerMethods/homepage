
import React from 'react';
import { FloatingNav } from './FloatingNav';

type Section = {
  id: string;
  title: string;
};

type ReportLayoutProps = {
  children: React.ReactNode;
  sections: Section[];
};

export const ReportLayout = ({ children, sections }: ReportLayoutProps) => {
  return (
    <div className="relative flex">
      <FloatingNav sections={sections} />
      <div className="flex-1 pl-0 md:pl-64">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {children}
        </div>
      </div>
    </div>
  );
};
