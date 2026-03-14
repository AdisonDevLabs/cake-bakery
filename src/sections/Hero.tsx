// src/sections/Hero.tsx
import { useBrand } from '../context/BrandContext';
import { Button } from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Hero = () => {

  const { data } = useBrand();
  const navigate = useNavigate();
  const location = useLocation();

  if (!data) return null;

  const { brand } = data;


  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
<div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=2000"
          alt="" // Marked as decorative for screen readers
          className="w-full h-full object-cover object-center lg:object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 lg:via-white/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl relative">
          <span className="inline-block px-4 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-black tracking-[0.2em] uppercase mb-8">
            Welcome to {brand.name}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] mb-6 tracking-tighter">
            {brand.tagline.includes(' ') ? (
              <>
                {brand.tagline.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-brand-primary">{brand.tagline.split(' ').pop()}</span>
              </>
            ) : (
              <span className="text-brand-primary">{brand.tagline}</span>
            )}
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed tracking-tight text-pretty max-w-xl">
            Every cake is a masterpiece, handcrafted with premium ingredients and 
            delivered fresh to your door. Experience the magic of <span className="text-slate-900 font-semibold">{brand.name}</span>.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="group px-8 h-16 text-lg shadow-xl shadow-brand-primary/20 gap-3" onClick={() => navigate(`/shop${location.search}`)}>
              Browse Cakes 
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="ghost" className="h-16 px-8 text-slate-500 hover:text-slate-900" onClick={() => navigate(`/gallery${location.search}`)}>
              Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};