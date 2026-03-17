// src/sections/Hero.tsx
import { useBrand } from '../context/BrandContext';
import { Button } from '../components/ui/Button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Hero = () => {
  const { data } = useBrand();
  const navigate = useNavigate();
  const location = useLocation();

  if (!data) return null;

  const { brand, cakes } = data;

  const heroImage = cakes.find(cake => cake.isFeatured)?.image || "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=2000";

  const waNumber = brand.contact.phone.replace(/\D/g, '');
  const waMessage = encodeURIComponent(`Hi ${brand.name}, I would like to inquire about ordering a custom cake!`);
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  const cityMatch = brand.contact.address.match(/([A-Za-z]+),\s*Kenya/);
  const city = cityMatch ? cityMatch[1] : 'Nakuru';

  return (
    <section className="relative min-h-[100dvh] md:min-h-[92vh] md:h-[80vh] flex items-center overflow-hidden">
      {/* Background Image with Dark Transparent Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src={heroImage}
          alt={`${brand.name} signature cake`} 
          className="w-full h-full object-cover object-center"
        />
        {/* Base dark tint to ensure readability on bright photos */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Mobile: Gradient fades up from the bottom. Desktop: Gradient fades left to right. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent md:bg-gradient-to-r md:from-black/95 md:via-black/60 md:to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Centered on mobile, Left-aligned on Desktop */}
        <div className="max-w-2xl relative flex flex-col items-center md:items-start text-center md:text-left pt-20 pb-10 md:py-0">
          
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-black/40 text-white text-xs font-black tracking-[0.2em] uppercase mb-6 md:mb-8 border border-white/20 backdrop-blur-md shadow-lg">
            Freshly baked daily in {city}
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.1] md:leading-[1.05] mb-6 tracking-tighter drop-shadow-lg">
            {brand.tagline.includes(' ') ? (
              <>
                {brand.tagline.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-brand-primary drop-shadow-md">{brand.tagline.split(' ').pop()}</span>
              </>
            ) : (
              <span className="text-brand-primary drop-shadow-md">{brand.tagline}</span>
            )}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-200 mb-8 md:mb-10 leading-relaxed tracking-tight text-pretty max-w-xl font-medium drop-shadow-md">
            Every cake is a masterpiece, handcrafted with premium ingredients and delivered fresh to your door. Experience the magic of <span className="text-white font-bold">{brand.name}</span>.
          </p>
          
          {/* Mobile-First Buttons: Stack full-width on mobile, side-by-side on tablet/desktop */}
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 items-center">
            <Button 
              size="lg" 
              className="w-full sm:w-auto group px-8 h-16 text-lg shadow-xl shadow-brand-primary/20 gap-3" 
              onClick={() => navigate(`/shop${location.search}`)}
            >
              Browse Cakes 
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <a 
              href={waLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center h-16 px-8 text-lg font-bold rounded-2xl bg-[#25D366] text-white hover:bg-[#128C7E] transition-colors gap-3 shadow-xl shadow-[#25D366]/20"
            >
              <MessageCircle className="w-6 h-6" />
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};