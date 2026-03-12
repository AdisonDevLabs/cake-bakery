// src/pages/PolicyPage.tsx
import React from 'react';
import type { PolicyPageData } from '../types';
import { Section } from '../components/common/Section';

interface PolicyProps {
  data: PolicyPageData;
}

export const PolicyPage: React.FC<PolicyProps> = ({ data }) => {
  return (
    <div className="pt-10">
      <Section title={data.title}>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-slate-400 mb-12">Last Updated: {data.lastUpdated}</p>
          
          <div className="space-y-12">
            {data.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 border-l-4 border-brand-primary pl-4">
                  {section.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};