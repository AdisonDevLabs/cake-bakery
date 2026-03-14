// src/sections/FeaturedCakes.tsx
import { useBrand } from '../context/BrandContext';
import { Section } from '../components/common/Section';
import { CakeCard } from '../components/common/CakeCard';
import { Button } from '../components/ui/Button';
import type { Cake } from '../types';
import { useNavigate, useLocation } from 'react-router-dom';

interface FeaturedCakesProps {
  onSelectCake: (cake: Cake) => void;
}

export const FeaturedCakes: React.FC<FeaturedCakesProps> = ({ onSelectCake }) => {
  // 1. Pull data from our dynamic context instead of the static import
  const { data } = useBrand();
  const navigate = useNavigate();
  const location = useLocation();

  // 2. Guard clause in case the data is still loading
  if (!data) return null;

  // 3. Filter using the dynamically loaded cakes
  const featuredCakes = data.cakes.filter(cake => cake.isFeatured).slice(0, 3);

  return (
    <Section 
      title="Signature Creations" 
      subtitle="Discover our most-loved treats, baked fresh daily using artisanal techniques."
      dark
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 justify-center">
        {featuredCakes.map((cake) => (
          <div key={cake.id} className="flex justify-center">
            <CakeCard cake={cake} onViewDetails={onSelectCake} />
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Button 
          variant="outline" 
          size="lg" 
          className="group px-8 border-slate-200 text-slate-900 hover:border-brand-primary hover:text-brand-secondary" onClick={() => navigate(`/shop${location.search}`)}
        >
          Explore Full Collection
          <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
            →
          </span>
        </Button>
      </div>
    </Section>
  );
};