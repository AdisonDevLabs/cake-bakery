// src/pages/Shop.tsx
import { useState } from 'react';
import { cakes } from '../data';
import { CakeCard } from '../components/common/CakeCard';
import { Section } from '../components/common/Section';
import { cn } from '../utils/cn';
import type { Cake } from '../types';

// In a real app, you'd pull these unique IDs from your categories.json
const CATEGORIES = ['all', 'signature', 'fruity', 'chocolate', 'vegan'];

interface ShopProps {
  onSelectCake: (cake: Cake) => void;
}

export const Shop: React.FC<ShopProps> = ({ onSelectCake }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCakes = activeCategory === 'all' 
    ? cakes 
    : cakes.filter(cake => cake.categoryId === activeCategory);

  return (
    <div className="pt-10">
      <Section 
        title="Our Full Collection" 
        subtitle="Explore our range of artisanal cakes, made to order with the finest ingredients."
      >
        {/* Category Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold capitalize transition-all",
                activeCategory === cat 
                  ? "bg-brand-primary text-white shadow-md" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-slate-500 text-sm mb-8">
          Showing {filteredCakes.length} {filteredCakes.length === 1 ? 'cake' : 'cakes'}
        </p>

        {/* Product Grid */}
        {filteredCakes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCakes.map((cake) => (
              <CakeCard key={cake.id} cake={cake} onViewDetails={onSelectCake} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500 font-medium">No cakes found in this category.</p>
            <button 
              onClick={() => setActiveCategory('all')}
              className="mt-4 text-brand-primary font-bold hover:underline"
            >
              View all cakes
            </button>
          </div>
        )}
      </Section>
    </div>
  );
};