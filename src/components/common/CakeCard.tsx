// src/components/common/CakeCard.tsx
import React from 'react';
import type { Cake } from '../../types';
import { Button } from '../ui/Button';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CakeCardProps {
  cake: Cake;
  onViewDetails?: (cake: Cake) => void; // New prop
}

export const CakeCard: React.FC<CakeCardProps> = ({ cake, onViewDetails }) => {
  const { addItem } = useCart();


  // Prevent the card from registering a click when the button is clicked
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    addItem(cake);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col">
    <div 
        className="relative aspect-square overflow-hidden cursor-pointer"
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
        <img
          src={cake.image}
          alt={cake.name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          loading="lazy" 
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <Eye className="text-white w-10 h-10 drop-shadow-md" />
        </div>
      </div>
      <div className="flex justify-between items-start mb-2 px-2 gap-4">
          {/* Removed redundant onClick, relying on image and button instead */}
          <h3 className="text-xl font-bold text-slate-900 line-clamp-2">
            {cake.name}
          </h3>
          {/* Added shrink-0 so the price never squishes */}
          <span className="text-lg font-bold text-brand-primary shrink-0 mt-0.5">
            Ksh {cake.price.toFixed(2)}
          </span>
        </div>
        {/* Softened text color to 500 and added leading-relaxed for scannability */}
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 px-2 mb-6">
          {cake.description}
        </p>
        <div className="mt-auto px-2 space-y-2">
          <Button className="w-full gap-2" variant="primary" onClick={handleAddToCart}>
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
          <Button 
            className="w-full" 
            variant="ghost" 
            onClick={() => onViewDetails?.(cake)}
          >
            View Details
          </Button>
        </div>
      </div>
  );
};