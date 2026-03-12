// src/pages/Testimonials.tsx
import { useBrand } from '../context/BrandContext';
import { Section } from '../components/common/Section';
import { Star, Quote } from 'lucide-react';

export const Testimonials = () => {
  const { data } = useBrand();

  if (!data) return null;

  return (
    <div className="pt-10">
      <Section 
        title="What Our Customers Say" 
        subtitle="Real stories from people who have shared their special moments with us."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.testimonials.map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/40 relative flex flex-col border border-slate-50">
              {/* Decorative Quote Icon - Moved and styled as a brand accent */}
              <div className="mb-6">
                <div className="w-10 h-10 bg-brand-secondary/20 rounded-xl flex items-center justify-center">
                  <Quote className="w-5 h-5 text-brand-primary" />
                </div>
              </div>
              
              {/* Star Rating with A11y Label */}
              <div 
                className="flex gap-0.5 mb-4" 
                aria-label={`Rated ${item.rating} out of 5 stars`}
              >
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < item.rating ? 'text-amber-400 fill-current' : 'text-slate-200'}`} 
                  />
                ))}
              </div>

              {/* Enhanced Quote Typography */}
              <p className="text-lg text-slate-700 leading-relaxed font-medium mb-8 flex-grow text-pretty">
                "{item.content}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 rounded-full object-cover ring-4 ring-brand-secondary/10"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-brand-secondary/30 flex items-center justify-center text-brand-primary font-black">
                    {item.name[0]}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-slate-900 leading-none mb-1">{item.name}</h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                    {item.role} <span className="mx-1 text-slate-200">•</span> {item.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};