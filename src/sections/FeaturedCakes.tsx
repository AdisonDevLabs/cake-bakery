// src/sections/FeaturedCakes.tsx
import { cakes } from '../data';
import { Section } from '../components/common/Section';
import { CakeCard } from '../components/common/CakeCard';
import { Button } from '../components/ui/Button';
import type { Cake } from '../types';

interface FeaturedCakesProps {
  onSelectCake: (cake: Cake) => void;
}

export const FeaturedCakes: React.FC<FeaturedCakesProps> = ({ onSelectCake }) => {
  const featuredCakes = cakes.filter(cake => cake.isFeatured).slice(0, 3);

  return (
    <Section 
      title="Signature Creations" 
      subtitle="Discover our most-loved treats, baked fresh daily using artisanal techniques."
      dark
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredCakes.map((cake) => (
          <CakeCard key={cake.id} cake={cake} onViewDetails={onSelectCake} />
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <Button variant="ghost" size="lg" className="text-brand-primary font-bold">
          View All Cakes
        </Button>
      </div>
    </Section>
  );
};