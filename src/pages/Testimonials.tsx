// src/pages/Testimonials.tsx
import { useBrand } from '../context/BrandContext';
import { Section } from '../components/common/Section';
import { Star, Quote } from 'lucide-react';

export const Testimonials = () => {
  const { data } = useBrand();

  if (!data || !data.testimonials) return null;

  return (
    <Section 
      title="What Our Customers Say" 
      subtitle="Real stories from people who have shared their special moments with us."
      dark={true}
      className="px-0 sm:px-0 overflow-hidden" // Full bleed for the marquee effect
    >
      {/* 1. Inject custom CSS for the infinite smooth scroll */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes infinite-scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 35s linear infinite;
        }
        /* Crucial UX: Pause the moving cards when a user touches or hovers over them to read */
        .animate-infinite-scroll:hover,
        .animate-infinite-scroll:active {
          animation-play-state: paused;
        }
      `}} />

      {/* 2. Wrapper with CSS masking for faded left/right edges */}
      <div 
        className="relative flex w-full overflow-hidden mt-10 pb-12 pt-4" 
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', 
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' 
        }}
      >
        {/* 3. The scrolling track */}
        <div className="flex w-max animate-infinite-scroll">
          
          {/* We render two identical blocks side-by-side to create the infinite loop illusion. 
              Translating the parent by -50% perfectly loops them. */}
          {[1, 2].map((set) => (
            <div key={set} className="flex gap-6 pr-6 w-max">
              {data.testimonials.map((item) => (
                <div 
                  key={`${set}-${item.id}`} 
                  className="flex-none w-[85vw] max-w-[380px] bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/40 relative flex flex-col border border-slate-50 cursor-grab active:cursor-grabbing transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="mb-6">
                    <div className="w-10 h-10 bg-brand-secondary/30 rounded-xl flex items-center justify-center">
                      <Quote className="w-5 h-5 text-brand-primary" />
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mb-5" aria-label={`Rated ${item.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < item.rating ? 'text-amber-400 fill-current drop-shadow-sm' : 'text-slate-200'}`} 
                      />
                    ))}
                  </div>

                  <p className="text-lg text-slate-700 leading-relaxed font-medium mb-8 flex-grow text-pretty italic">
                    "{item.content}"
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 rounded-full object-cover ring-4 ring-brand-secondary/10"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-brand-secondary/30 flex items-center justify-center text-brand-primary font-black text-lg">
                        {item.name[0]}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900 leading-none mb-1.5">{item.name}</h4>
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                        {item.role} <span className="mx-1 text-slate-300">•</span> {item.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          
        </div>
      </div>
    </Section>
  );
};