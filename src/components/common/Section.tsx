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
    <section className={cn(
      // 1. Adjusted to py-12 for better mobile screen utilization
      'py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8', 
      dark ? 'bg-slate-50' : 'bg-white', 
      className
    )}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-10 md:mb-16 px-4">
            {title && (
              // 2. Upgraded font weight and added lg:text-5xl for desktop impact
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              // 3. Adjusted mobile text size slightly for better readability
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto text-pretty">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};