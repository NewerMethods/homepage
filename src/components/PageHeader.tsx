
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <>
      <h1 className="text-5xl font-extrabold font-display mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400 pb-2">{title}</h1>
      {description && <p className="text-lg text-muted-foreground mt-1">{description}</p>}
    </>
  );
};

export default PageHeader;
