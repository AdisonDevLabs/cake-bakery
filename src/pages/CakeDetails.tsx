// src/pages/CakeDetails.tsx
import React from 'react';
import type { Cake } from '../types';
import { Button } from '../components/ui/Button';
import { Section } from '../components/common/Section';
import { useCart } from '../context/CartContext';
import { cn } from '../utils/cn';

import { ChevronLeft, Star, Clock, ShieldCheck, Truck } from 'lucide-react';

interface CakeDetailsProps {
  cake: Cake;
  onBack: () => void;
}

export const CakeDetails: React.FC<CakeDetailsProps> = ({ cake, onBack }) => {

  const { addItem } = useCart();

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center text-slate-500 hover:text-brand-primary transition-colors mb-8 group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Shop</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image Gallery Placeholder */}
          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 bg-slate-100 aspect-square group/image">
            <img 
              src={cake.image} 
              alt={cake.name} 
              className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex gap-2 mb-4">
              {cake.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-brand-secondary/30 text-brand-accent text-xs font-bold uppercase rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 tracking-tighter">
              {cake.name}
            </h1>
            
            <div className="flex items-center gap-6 mb-8">
              <span className="text-4xl font-black text-brand-primary tracking-tight">
                ${cake.price.toFixed(2)}
              </span>
              <div className="h-8 w-px bg-slate-200 rotate-12" />
              <div className="flex flex-col">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-4 h-4 fill-current", i === 4 && "text-slate-300")} />
                  ))}
                  <span className="ml-2 text-slate-900 font-bold">4.9</span>
                </div>
                <span className="text-slate-400 text-xs font-medium">From 120+ happy customers</span>
              </div>
            </div>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {cake.description}
            </p>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/80">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Clock className="w-5 h-5 text-brand-primary" />
                </div>
                <span className="text-sm font-bold text-slate-700">Baked Fresh</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/80">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-brand-primary" />
                </div>
                <span className="text-sm font-bold text-slate-700">Premium Quality</span>
              </div>
            </div>

            {/* CTA Group */}
            <div className="mt-auto p-2 bg-slate-50 rounded-[2rem]">
              <Button size="lg" className="w-full h-16 text-xl shadow-lg" onClick={() => addItem(cake)}>
                Add to Cart
              </Button>
              <div className="py-3 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <Truck className="w-4 h-4" />
                <span>Pickup or Local Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended/Details Section */}
      <Section title="Ingredients & Allergy Info" dark className="mb-0">
        <div className="max-w-3xl mx-auto text-slate-600 space-y-4">
          <p>
            Our <strong>{cake.name}</strong> is crafted using organic flour, grass-fed butter, and 
            locally sourced eggs. We never use artificial preservatives or flavors.
          </p>
          <div className="p-6 rounded-2xl bg-white border border-amber-100 shadow-sm text-slate-700 text-sm flex gap-4">
            <span className="text-2xl mt-[-4px]">⚠️</span>
            <div>
              <strong className="text-amber-900 block mb-1">Allergy Warning</strong>
              Contains dairy, eggs, and gluten. Made in a facility 
              that also processes nuts and soy.
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};