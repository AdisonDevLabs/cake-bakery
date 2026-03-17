// src/components/common/CakeCard.tsx
import React from 'react';
import type { Cake } from '../../types';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CakeCardProps {
  cake: Cake;
  onViewDetails?: (cake: Cake) => void;
}

export const CakeCard: React.FC<CakeCardProps> = ({ cake, onViewDetails }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    addItem(cake);
  };

  return (
    <div 
      className="group flex flex-col bg-white rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-primary/10 transition-all duration-300 border border-slate-100 cursor-pointer active:scale-[0.98]"
      onClick={() => onViewDetails?.(cake)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${cake.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onViewDetails?.(cake);
        }
      }}
    >
      {/* 1. Changed to aspect-[4/3] to significantly reduce vertical height */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        <img
          src={cake.image}
          alt={cake.name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy" 
        />
        
        {cake.isFeatured && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm z-10 pointer-events-none">
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Featured</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 hidden md:flex">
          <div className="bg-white/95 backdrop-blur-sm p-3 rounded-full text-brand-primary translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
            <Eye className="w-5 h-5" />
          </div>
        </div>
      </div>
      
      {/* 2. Tightened padding from p-6 to p-4 */}
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-2 tracking-tight group-hover:text-brand-primary transition-colors mb-1.5">
          {cake.name}
        </h3>
        
        {/* 3. Reduced bottom margin from mb-6 to mb-4 */}
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
          {cake.description}
        </p>

        {/* 4. Tightened top padding of the bottom row */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-slate-50">
          <span className="text-lg sm:text-xl font-black text-slate-900 shrink-0 tracking-tight">
            Ksh {cake.price.toLocaleString()}
          </span>
          
          <button 
            onClick={handleAddToCart}
            aria-label={`Add ${cake.name} to cart`}
            // Slightly smaller button to match the new compact card size
            className="w-10 h-10 flex items-center justify-center rounded-xl shrink-0 p-0 shadow-md shadow-brand-primary/20 bg-brand-primary text-white hover:bg-brand-accent hover:-translate-y-1 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2" 
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};