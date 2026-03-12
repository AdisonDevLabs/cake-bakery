// src/pages/FAQ.tsx
import { useState } from 'react';
import { useBrand } from '../context/BrandContext';
import { Section } from '../components/common/Section';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '../utils/cn';

export const FAQ = () => {
  const { data } = useBrand();
  const [openId, setOpenId] = useState<string | null>(null);

  if (!data) return null;

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
          {data.faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id} 
                className={cn(
                  "border rounded-2xl bg-white transition-all duration-300",
                  isOpen 
                    ? "border-brand-primary/30 shadow-md ring-1 ring-brand-primary/5" 
                    : "border-slate-200 shadow-sm hover:border-slate-300"
                )}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${faq.id}`}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                      isOpen ? "bg-brand-primary text-white" : "bg-brand-secondary/20 text-brand-primary"
                    )}>
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <span className={cn(
                      "font-bold transition-colors",
                      isOpen ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"
                    )}>
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-slate-400 transition-transform duration-500 ease-in-out",
                      isOpen && "rotate-180 text-brand-primary"
                    )} 
                  />
                </button>
                
                {/* Modern Grid Height Transition */}
                <div 
                  id={`faq-content-${faq.id}`}
                  role="region"
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                      <div className="mb-4 flex items-center gap-2">
                        <span className="w-8 h-px bg-slate-100" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                          {faq.category}
                        </span>
                      </div>
                      <p className="pl-10 text-pretty">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
};