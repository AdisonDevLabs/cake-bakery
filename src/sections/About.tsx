// src/sections/About.tsx
import { useBrand } from '../context/BrandContext';
import { Section } from '../components/common/Section';
import { Heart } from 'lucide-react';

export const About = () => {
  const { data } = useBrand();
  
  if (!data) return null;
  const { brand, gallery } = data; //

  // Dynamic image fetching with fallbacks
  const mainImage = gallery[0]?.image || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000";
  const accentImage = gallery[1]?.image || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800";

  return (
    <Section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center max-w-7xl mx-auto">
        
        {/* Mobile-First Visual Side: Fluid scaling using percentages */}
        <div className="relative w-full max-w-[400px] lg:max-w-none lg:w-1/2 flex-shrink-0 mx-auto px-4 sm:px-0">
          
          {/* Main large image - locked to 85% width to leave room for the overlap */}
          <div className="aspect-[4/5] w-[85%] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 border border-slate-100">
            <img 
              src={mainImage} 
              alt={`A glimpse into ${brand.name}`} //
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Overlapping accent image - perfectly scaled to 55% of the container */}
          <div className="absolute -bottom-6 -right-0 sm:-right-4 w-[55%] aspect-square rounded-full border-8 border-white overflow-hidden shadow-xl z-20 bg-slate-50">
            <img 
              src={accentImage} 
              alt="Artisanal details" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Soft background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        </div>

        {/* Mobile-First Text Side: Centered on mobile, Left-aligned on Desktop */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8 px-4 sm:px-0">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/50 text-brand-primary border border-brand-primary/10">
            <Heart className="w-4 h-4 fill-brand-primary/20" />
            <span className="text-xs font-black tracking-[0.2em] uppercase">Our Story</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Baking joy into every single bite.
          </h2>

          <div className="space-y-5 text-base sm:text-lg text-slate-600 leading-relaxed text-pretty">
            <p>
              At <span className="font-bold text-slate-900">{brand.name}</span>, we are proud to be {brand.tagline.toLowerCase()}. We believe that every celebration deserves a spectacular centerpiece that looks stunning and tastes completely unforgettable. {/* */}
            </p>
            <p>
              Handcrafted locally with passion and premium ingredients, our creations are designed to bring pure joy to your most special moments. We are here to bake your dreams into reality.
            </p>
          </div>

          {/* Brand grounding signature */}
          <div className="pt-6 mt-2 w-full flex justify-center lg:justify-start border-t border-slate-100">
             {brand.logo ? ( //
               <img src={brand.logo} alt={`${brand.name} signature`} className="h-10 sm:h-12 w-auto grayscale opacity-40 mix-blend-multiply" />
             ) : (
               <span className="font-serif italic text-2xl text-slate-300 select-none">{brand.name}</span> //
             )}
          </div>
        </div>

      </div>
    </Section>
  );
};