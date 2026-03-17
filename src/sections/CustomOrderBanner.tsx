// src/sections/CustomOrderBanner.tsx
import { useBrand } from '../context/BrandContext';
import { Section } from '../components/common/Section';
import { Wand2, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const CustomOrderBanner = () => {
  const { data } = useBrand();
  const navigate = useNavigate();
  const location = useLocation();

  if (!data || !data.cakes) return null;

  // Safely find the image with strict fallbacks
  const weddingCake = data.cakes.find(cake => cake.categoryId === 'wedding');
  const featuredCake = data.cakes.find(cake => cake.isFeatured);
  
  const bannerImage = weddingCake?.image || featuredCake?.image || "https://images.unsplash.com/photo-1535241749838-299277b6305f?auto=format&fit=crop&q=80&w=2000";

  return (
    <Section className="py-8 md:py-16">
      <div className="relative w-full min-h-[450px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 group border border-slate-100 bg-slate-900">
        
        {/* Simplified Background to guarantee the image is visible */}
        <div className="absolute inset-0 z-0">
          <img 
            src={bannerImage} 
            alt="Custom cake design inspiration" 
            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000"
          />
          {/* A simple, single gradient so the text is readable but the image shines through */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent md:bg-gradient-to-r md:from-slate-900/95 md:via-slate-900/50 md:to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-start md:items-center justify-between p-8 sm:p-12 lg:p-16 gap-10 mt-auto md:mt-0">
          
          {/* Text Area */}
          <div className="text-left max-w-xl mt-auto md:mt-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-md mb-6 shadow-lg">
              <Sparkles className="w-4 h-4 text-brand-secondary" />
              <span className="text-xs font-black tracking-[0.2em] uppercase">
                Bespoke Creations
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-5 tracking-tighter">
              Have a dream <br className="hidden sm:block" />
              <span className="text-brand-secondary">design in mind?</span>
            </h2>
            
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-medium max-w-md">
              From corporate events to extravagant weddings, share your inspiration with us and let's bake your imagination into reality.
            </p>
          </div>

          {/* CTA Area */}
          <div className="flex-shrink-0 w-full md:w-auto flex flex-col md:items-end mt-6 md:mt-0">
            <button 
              onClick={() => navigate(`/custom-order${location.search}`)}
              className="w-full md:w-auto inline-flex items-center justify-center h-16 px-8 sm:px-10 text-lg font-bold rounded-2xl bg-white text-slate-900 hover:bg-slate-50 transition-all gap-3 active:scale-95"
            >
              <Wand2 className="w-5 h-5 text-brand-primary" />
              Start Custom Order
              <ArrowRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>

        </div>
      </div>
    </Section>
  );
};