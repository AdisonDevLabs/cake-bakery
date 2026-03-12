// src/sections/Hero.tsx
import { brand } from '../data';
import { Button } from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=2000"
          alt="Bakery background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-secondary text-brand-accent text-sm font-bold tracking-widest uppercase mb-6 animate-fade-in">
            Welcome to {brand.name}
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
            {brand.tagline.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-brand-primary">{brand.tagline.split(' ').pop()}</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Every cake is a masterpiece, handcrafted with premium ingredients and 
            delivered fresh to your door. Experience the magic of {brand.name}.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="gap-2">
              Browse Cakes <ArrowRight className="w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline">
              Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};