// src/pages/CakeDetails.tsx
import React from 'react';
import type { Cake } from '../types';
import { Button } from '../components/ui/Button';
import { Section } from '../components/common/Section';
import { ChevronLeft, Star, Clock, ShieldCheck, Truck } from 'lucide-react';

interface CakeDetailsProps {
  cake: Cake;
  onBack: () => void;
}

export const CakeDetails: React.FC<CakeDetailsProps> = ({ cake, onBack }) => {
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
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-slate-100 aspect-square">
            <img 
              src={cake.image} 
              alt={cake.name} 
              className="w-full h-full object-cover"
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
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              {cake.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-brand-primary">
                ${cake.price.toFixed(2)}
              </span>
              <div className="h-6 w-px bg-slate-200" />
              <div className="flex items-center text-amber-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="ml-1 text-slate-900 font-bold">4.9</span>
                <span className="ml-1 text-slate-500 text-sm">(120+ reviews)</span>
              </div>
            </div>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {cake.description}
            </p>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Clock className="w-5 h-5 text-brand-primary" />
                <span className="text-sm font-medium text-slate-700">Baked Fresh</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <ShieldCheck className="w-5 h-5 text-brand-primary" />
                <span className="text-sm font-medium text-slate-700">Premium Ingredients</span>
              </div>
            </div>

            <div className="mt-auto space-y-4">
              <Button size="lg" className="w-full h-16 text-xl">
                Add to Cart
              </Button>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <Truck className="w-4 h-4" />
                <span>Available for pickup or local delivery</span>
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
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 text-amber-800 text-sm">
            <strong>Allergy Warning:</strong> Contains dairy, eggs, and gluten. Made in a facility 
            that also processes nuts and soy.
          </div>
        </div>
      </Section>
    </div>
  );
};