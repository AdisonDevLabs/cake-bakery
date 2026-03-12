// src/pages/Shop.tsx
import { useState, useMemo } from 'react';
import { useBrand } from '../context/BrandContext';
import { CakeCard } from '../components/common/CakeCard';
import { Section } from '../components/common/Section';
import { cn } from '../utils/cn';
import type { Cake } from '../types';
import { Button } from '../components/ui/Button';

interface ShopProps {
  onSelectCake: (cake: Cake) => void;
}

export const Shop: React.FC<ShopProps> = ({ onSelectCake }) => {
  const { data } = useBrand();
  const [activeCategory, setActiveCategory] = useState('all');

  // Derive dynamic categories securely and efficiently
  const categories = useMemo(() => {
    if (!data) return ['all'];
    const uniqueCats = new Set(data.cakes.map(cake => cake.categoryId));
    return ['all', ...Array.from(uniqueCats)];
  }, [data]);

  if (!data) return null;

  const filteredCakes = activeCategory === 'all' 
    ? data.cakes 
    : data.cakes.filter(cake => cake.categoryId === activeCategory);

  return (
    <div className="pt-10">
      <Section 
        title="Our Full Collection" 
        subtitle="Explore our range of artisanal cakes, made to order with the finest ingredients."
      >

        <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap md:justify-center gap-2 mb-8 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold capitalize transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 active:scale-95",
                activeCategory === cat 
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-slate-100"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Improved Results Count Styling */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px bg-slate-100 flex-grow" />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
            Showing {filteredCakes.length} {filteredCakes.length === 1 ? 'cake' : 'cakes'}
          </p>
          <div className="h-px bg-slate-100 flex-grow" />
        </div>

        {filteredCakes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCakes.map((cake) => (
              <CakeCard key={cake.id} cake={cake} onViewDetails={onSelectCake} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-slate-50/50 rounded-[2.5rem] border border-slate-100">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
               <span className="text-2xl">🍰</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No cakes found</h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">
              We couldn't find any cakes in the <span className="text-brand-primary font-bold">{activeCategory}</span> category.
            </p>
            <Button 
              variant="outline"
              className="mt-8"
              onClick={() => setActiveCategory('all')}
            >
              View All Collection
            </Button>
          </div>
        )}
      </Section>
    </div>
  );
};