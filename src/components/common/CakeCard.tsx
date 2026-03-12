// src/components/common/CakeCard.tsx
import React from 'react';
import type { Cake } from '../../types';
import { Button } from '../ui/Button';
import { ShoppingCart, Eye } from 'lucide-react'; // Added Eye icon

interface CakeCardProps {
  cake: Cake;
  onViewDetails?: (cake: Cake) => void; // New prop
}

export const CakeCard: React.FC<CakeCardProps> = ({ cake, onViewDetails }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col">
      <div 
        className="relative aspect-square overflow-hidden cursor-pointer"
        onClick={() => onViewDetails?.(cake)} // Click image to view
      >
        <img
          src={cake.image}
          alt={cake.name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <Eye className="text-white w-10 h-10" />
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-900 cursor-pointer" onClick={() => onViewDetails?.(cake)}>
            {cake.name}
          </h3>
          <span className="text-lg font-bold text-brand-primary">${cake.price.toFixed(2)}</span>
        </div>
        <p className="text-slate-600 text-sm line-clamp-2 mb-6">
          {cake.description}
        </p>
        <div className="mt-auto space-y-2">
          <Button className="w-full gap-2" variant="primary">
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
    </div>
  );
};