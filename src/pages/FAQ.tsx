// src/pages/FAQ.tsx
import { useState } from 'react';
import { faqs } from '../data';
import { Section } from '../components/common/Section';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '../utils/cn';

export const FAQ = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="pt-10">
      <Section 
        title="Common Questions" 
        subtitle="Everything you need to know about our cakes, ordering process, and sweet deliveries."
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <HelpCircle className="w-5 h-5 text-brand-primary shrink-0" />
                  <span className="font-bold text-slate-900">{faq.question}</span>
                </div>
                <ChevronDown 
                  className={cn(
                    "w-5 h-5 text-slate-400 transition-transform duration-300",
                    openId === faq.id && "rotate-180 text-brand-primary"
                  )} 
                />
              </button>
              
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  openId === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50">
                  {faq.answer}
                  <div className="mt-4">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase rounded-full">
                      Category: {faq.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};