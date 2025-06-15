
import React from 'react';

type SectionProps = {
  id: string;
  children: React.ReactNode;
};

export const Section = ({ id, children }: SectionProps) => {
  return (
    <section id={id} className="py-6">
      {children}
    </section>
  );
};
