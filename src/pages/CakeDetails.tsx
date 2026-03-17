// src/pages/CakeDetails.tsx
import React, { useState } from 'react';
import type { Cake } from '../types';
import { Button } from '../components/ui/Button';
import { Section } from '../components/common/Section';
import { useCart } from '../context/CartContext';
import { cn } from '../utils/cn';

import { 
  ChevronLeft, 
  Star, 
  Clock, 
  ShieldCheck, 
  Truck, 
  Minus, 
  Plus, 
  Info, 
  Utensils,
  Sparkles
} from 'lucide-react';

interface CakeDetailsProps {
  cake: Cake;
  onBack: () => void;
}

export const CakeDetails: React.FC<CakeDetailsProps> = ({ cake, onBack }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdjustQuantity = (type: 'plus' | 'minus') => {
    if (type === 'minus' && quantity > 1) setQuantity(q => q - 1);
    if (type === 'plus') setQuantity(q => q + 1);
  };

  const handleAddToCart = () => {
    // Adds the item to the cart based on selected quantity
    for (let i = 0; i < quantity; i++) {
      addItem(cake);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-32 lg:pb-0 font-sans">
      {/* 1. App-Style Sticky Top Navigation (Mobile Only) */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 lg:hidden px-4 h-16 flex items-center">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-slate-900 active:scale-95 transition-transform"
          aria-label="Back to shop"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="ml-2 font-black text-slate-900 truncate pr-10">{cake.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-12">
        {/* Desktop Back Button */}
        <button 
          onClick={onBack}
          className="hidden lg:flex items-center text-slate-500 hover:text-brand-primary transition-colors mb-10 group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-black uppercase tracking-widest text-xs ml-1">Back to Shop</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-16">
          
          {/* 2. Immersive Visual Hero */}
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 bg-slate-50 aspect-[4/5] lg:aspect-square group/image">
            <img 
              src={cake.image} 
              alt={cake.name} 
              className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-1000 ease-out"
              loading="eager"
            />
            {cake.isFeatured && (
               <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/20">
                 <div className="flex items-center gap-2">
                   <Sparkles className="w-3 h-3 text-brand-primary" />
                   <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Customer Favorite</span>
                 </div>
               </div>
            )}
          </div>

          {/* 3. Product Narrative & Interaction */}
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2 mb-6">
              {cake.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-brand-secondary/40 text-brand-accent text-[10px] font-black uppercase tracking-widest rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-[0.9]">
              {cake.name}
            </h1>
            
            <div className="flex items-center gap-6 mb-10">
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Price per item</span>
                <span className="text-4xl font-black text-brand-primary tracking-tight">
                  Ksh {cake.price.toLocaleString()}
                </span>
              </div>
              <div className="h-12 w-px bg-slate-100 rotate-12" />
              <div className="flex flex-col">
                <div className="flex items-center text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-4 h-4 fill-current", i === 4 && "text-slate-200")} />
                  ))}
                  <span className="ml-2 text-slate-900 font-black">4.9</span>
                </div>
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">120+ Verified Reviews</span>
              </div>
            </div>

            <p className="text-lg text-slate-600 leading-relaxed mb-10 text-pretty font-medium">
              {cake.description} {/* */}
            </p>

            {/* Quality Badges */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-4 p-5 rounded-[2rem] bg-slate-50 border border-slate-100 transition-colors hover:bg-white">
                <div className="p-3 bg-white rounded-2xl shadow-sm">
                  <Clock className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Preparation</p>
                  <p className="text-sm font-bold text-slate-900">Baked Fresh</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-[2rem] bg-slate-50 border border-slate-100 transition-colors hover:bg-white">
                <div className="p-3 bg-white rounded-2xl shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quality</p>
                  <p className="text-sm font-bold text-slate-900">Premium Only</p>
                </div>
              </div>
            </div>

            {/* Desktop Action Box (Hidden on Mobile) */}
            <div className="hidden lg:flex flex-col gap-6 p-8 bg-slate-50 rounded-[3rem] border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-900 uppercase tracking-widest text-sm">Quantity</span>
                <div className="flex items-center bg-white rounded-2xl p-1 border border-slate-200">
                   <button 
                     onClick={() => handleAdjustQuantity('minus')} 
                     className="p-3 text-slate-400 hover:text-brand-primary transition-colors"
                     aria-label="Decrease quantity"
                   >
                     <Minus className="w-5 h-5"/>
                   </button>
                   <span className="w-12 text-center font-black text-xl text-slate-900">{quantity}</span>
                   <button 
                     onClick={() => handleAdjustQuantity('plus')} 
                     className="p-3 text-slate-400 hover:text-brand-primary transition-colors"
                     aria-label="Increase quantity"
                   >
                     <Plus className="w-5 h-5"/>
                   </button>
                </div>
              </div>
              <Button size="lg" className="h-20 text-xl shadow-2xl shadow-brand-primary/20 rounded-[1.5rem]" onClick={handleAddToCart}>
                Add to Cart • Ksh {(cake.price * quantity).toLocaleString()}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Deep-Dive Story Sections */}
      <Section title="The Craft Behind the Cake" dark className="mb-0">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3 className="flex items-center gap-3 text-xl font-black text-slate-900 tracking-tight">
              <Utensils className="w-6 h-6 text-brand-primary" />
              Artisanal Ingredients
            </h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Every <strong>{cake.name}</strong> is built from the ground up using organic flour, grass-fed butter, and 
              locally sourced free-range eggs. We believe that true flavor comes from nature, which is why we never use artificial preservatives. {/* */}
            </p>
          </div>
          
          <div className="space-y-6">
            <h3 className="flex items-center gap-3 text-xl font-black text-slate-900 tracking-tight">
              <Info className="w-6 h-6 text-amber-500" />
              Allergy Information
            </h3>
            <div className="p-6 rounded-[2rem] bg-white border border-amber-100 shadow-sm text-slate-700 text-sm flex gap-4 italic">
              <div>
                <strong className="text-amber-900 block mb-2 font-black uppercase tracking-widest text-[10px]">⚠️ Mandatory Safety Warning</strong>
                Contains dairy, eggs, and gluten. Made in a facility 
                that also processes nuts and soy. {/* */}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. Mobile Sticky Checkout Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-100 p-4 pb-8 flex items-center gap-4 animate-in slide-in-from-bottom duration-500">
        <div className="flex items-center bg-slate-100 rounded-2xl p-1">
            <button onClick={() => handleAdjustQuantity('minus')} className="p-3 text-slate-500" aria-label="Decrease quantity"><Minus className="w-4 h-4"/></button>
            <span className="w-8 text-center font-black text-slate-900">{quantity}</span>
            <button onClick={() => handleAdjustQuantity('plus')} className="p-3 text-slate-500" aria-label="Increase quantity"><Plus className="w-4 h-4"/></button>
        </div>
        <Button className="flex-1 h-16 rounded-2xl text-lg shadow-xl shadow-brand-primary/20" onClick={handleAddToCart}>
          Add • Ksh {(cake.price * quantity).toLocaleString()}
        </Button>
      </div>

      <div className="py-10 flex flex-col items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50">
        <Truck className="w-4 h-4" />
        <span>Hand-delivered with care</span> {/* */}
      </div>
    </div>
  );
};