// src/components/common/Section.tsx
import React from 'react';
import { cn } from '../../utils/cn';

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export const Section: React.FC<SectionProps> = ({ title, subtitle, children, className, dark }) => {
  return (
    <section className={cn('py-16 md:py-24 px-4 sm:px-6 lg:px-8', dark ? 'bg-slate-50' : 'bg-white', className)}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>}
            {subtitle && <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};