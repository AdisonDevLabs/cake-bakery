// src/pages/PolicyPage.tsx
import React from 'react';
import { useBrand } from '../context/BrandContext';
import { Section } from '../components/common/Section';

interface PolicyProps {
  slug: string; // Changed from data to slug
}

export const PolicyPage: React.FC<PolicyProps> = ({ slug }) => {
  const { data } = useBrand();
  
  if (!data) return null;
  
  // Find the specific policy based on the passed slug
  const policy = data.policies.find(p => p.slug === slug);
  
  if (!policy) return <div className="p-10 text-center">Policy not found.</div>;

  return (
    <div className="pt-10">
      <Section title={policy.title}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 pb-8 mb-12 border-b border-slate-100">
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Last Updated: {policy.lastUpdated}
            </p>
          </div>
          <div className="space-y-16"> {/* Increased spacing between major policy blocks */}
            {policy.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                {/* Slimmer border and tighter tracking for a premium feel */}
                <h3 className="text-xl font-bold text-slate-900 border-l-2 border-brand-primary pl-5 tracking-tight">
                  {section.title}
                </h3>
                {/* Added text-pretty and balanced leading */}
                <p className="text-slate-600 leading-relaxed text-pretty pl-6">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Added a 'Trust/Conversion' Footer to prevent a dead-end UX */}
          <div className="mt-20 p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center">
            <h4 className="text-lg font-bold text-slate-900 mb-2">Still have questions?</h4>
            <p className="text-sm text-slate-500 mb-6">
              Our team is here to help with any specifics regarding our {policy.title.toLowerCase()}.
            </p>
            <div className="flex justify-center gap-4">
               <a href="/contact" className="text-sm font-bold text-brand-primary hover:text-brand-accent transition-colors">
                 Contact Support
               </a>
               <span className="text-slate-300">•</span>
               <a href="/shop" className="text-sm font-bold text-brand-primary hover:text-brand-accent transition-colors">
                 Back to Shop
               </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};