// src/pages/Shop.tsx
import { useState, useMemo, useRef } from 'react';
import { useBrand } from '../context/BrandContext';
import { CakeCard } from '../components/common/CakeCard';
import { Section } from '../components/common/Section';
import { ShopHero } from '../sections/ShopHero'; 
import { ShopCustomerFavorites } from '../sections/ShopCustomerFavorites'; // 1. Import the new component
import { cn } from '../utils/cn';
import type { Cake } from '../types';
import { Button } from '../components/ui/Button';

interface ShopProps {
  onSelectCake: (cake: Cake) => void;
}

export const Shop: React.FC<ShopProps> = ({ onSelectCake }) => {
  const { data } = useBrand();
  const [activeCategory, setActiveCategory] = useState('all');

  const gridRef = useRef<HTMLDivElement>(null);
  const categoriesWithMeta = useMemo(() => {
    if (!data) return [];
    const uniqueCats = Array.from(new Set(data.cakes.map(cake => cake.categoryId)));
    const mappedCats = uniqueCats.map(catId => {
      const repCake = data.cakes.find(cake => cake.categoryId === catId);
      const name = catId.charAt(0).toUpperCase() + catId.slice(1).replace('-', ' ');
      return {
        id: catId,
        name: name,
        image: repCake?.image || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
        description: `Browse our handcrafted ${name.toLowerCase()} collection.`
      };
    });
    return [
      {
        id: 'all',
        name: 'All Collection',
        image: data.cakes.find(c => c.isFeatured)?.image || "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800",
        description: "Explore our entire range of artisanal cakes and treats."
      },
      ...mappedCats
    ];
  }, [data]);

  if (!data) return null;

  const filteredCakes = activeCategory === 'all' 
    ? data.cakes 
    : data.cakes.filter(cake => cake.categoryId === activeCategory);

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    setTimeout(() => {
      const element = gridRef.current;
      if (element) {
        const yOffset = -100; 
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    // We remove the pb-20 here so the dark footer section connects smoothly to the dark favorites section
    <div className="min-h-screen bg-white"> 
      
      <ShopHero />

      <Section className="pt-8 md:pt-16 pb-0 md:pb-0"> 
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 mb-4 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categoriesWithMeta.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={cn(
                "relative flex-none w-[75vw] sm:w-[260px] md:w-[280px] aspect-[4/3] rounded-[2rem] overflow-hidden group snap-center transition-all duration-500 outline-none focus-visible:ring-4 focus-visible:ring-brand-primary text-left",
                activeCategory === cat.id 
                  ? "ring-4 ring-brand-primary shadow-2xl shadow-brand-primary/30 scale-100" 
                  : "hover:scale-[1.02] opacity-80 hover:opacity-100 shadow-md"
              )}
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                loading="lazy"
              />
              <div className={cn(
                "absolute inset-0 transition-colors duration-500",
                activeCategory === cat.id 
                  ? "bg-gradient-to-t from-black/80 via-black/40 to-black/10" 
                  : "bg-gradient-to-t from-black/90 via-black/60 to-black/30 group-hover:from-black/80"
              )} />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className={cn(
                  "font-black tracking-tight mb-1 transition-all",
                  activeCategory === cat.id ? "text-2xl text-brand-primary drop-shadow-md" : "text-xl text-white"
                )}>
                  {cat.name}
                </h3>
                <p className="text-white/80 text-sm font-medium line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* Results Grid */}
      <div ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px bg-slate-100 flex-grow" />
          <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap">
            Showing {filteredCakes.length} {filteredCakes.length === 1 ? 'cake' : 'cakes'}
          </p>
          <div className="h-px bg-slate-100 flex-grow" />
        </div>

        {filteredCakes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredCakes.map((cake) => (
              <CakeCard key={cake.id} cake={cake} onViewDetails={onSelectCake} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-slate-50/50 rounded-[3rem] border border-slate-100 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-white rounded-[1.5rem] shadow-sm flex items-center justify-center mx-auto mb-6">
               <span className="text-3xl">🍰</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">No cakes found</h3>
            <p className="text-slate-500 text-base max-w-sm mx-auto leading-relaxed">
              We couldn't find any cakes in the <span className="text-brand-primary font-bold">{activeCategory}</span> category at the moment.
            </p>
            <Button 
              size="lg"
              className="mt-8 rounded-2xl"
              onClick={() => handleCategoryClick('all')}
            >
              View All Collection
            </Button>
          </div>
        )}
      </div>

      {/* 2. Inject the Customer Favorites Carousel at the bottom */}
      <ShopCustomerFavorites />

    </div>
  );
};