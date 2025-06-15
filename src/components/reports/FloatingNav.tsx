
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type Section = {
  id: string;
  title: string;
};

type FloatingNavProps = {
  sections: Section[];
};

export const FloatingNav = ({ sections }: FloatingNavProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const intersectingEntry = entries.find(entry => entry.isIntersecting);
        if (intersectingEntry) {
            setActiveSection(intersectingEntry.target.id);
        }
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    const currentObserver = observer.current;

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) {
        currentObserver.observe(el);
      }
    });

    return () => {
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          currentObserver.unobserve(el);
        }
      });
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-1/4 left-4 lg:left-8 h-auto w-56 hidden md:block">
      <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
        <h3 className="font-semibold mb-4 text-lg">On this page</h3>
        <ul>
          {sections.map((section) => (
            <li key={section.id} className="mb-2">
              <button
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  'text-left text-sm w-full transition-colors hover:text-primary',
                  activeSection === section.id ? 'font-bold text-primary' : 'text-muted-foreground'
                )}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
