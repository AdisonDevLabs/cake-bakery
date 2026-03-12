// src/pages/Testimonials.tsx
import { testimonials } from '../data';
import { Section } from '../components/common/Section';
import { Star, Quote } from 'lucide-react';

export const Testimonials = () => {
  return (
    <div className="pt-10">
      <Section 
        title="What Our Customers Say" 
        subtitle="Real stories from people who have shared their special moments with us."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative flex flex-col">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-brand-secondary opacity-40" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < item.rating ? 'text-amber-400 fill-current' : 'text-slate-200'}`} 
                  />
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed italic mb-8 flex-grow">
                "{item.content}"
              </p>

              <div className="flex items-center gap-4">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-secondary"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-brand-primary font-bold">
                    {item.name[0]}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">{item.role} • {item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};