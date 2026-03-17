// src/sections/FeaturedCakes.tsx
import { useBrand } from '../context/BrandContext';
import { Section } from '../components/common/Section';
import { Button } from '../components/ui/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';
import type { Cake } from '../types';

// 1. Bring back the props interface
interface FeaturedCakesProps {
  onSelectCake: (cake: Cake) => void;
}

// 2. Add it to the component parameters
export const FeaturedCakes: React.FC<FeaturedCakesProps> = ({ onSelectCake }) => {
  const { data } = useBrand();
  const navigate = useNavigate();
  const location = useLocation();

  if (!data) return null;

  const { brand, cakes } = data;
  const featuredCakes = cakes.filter(cake => cake.isFeatured).slice(0, 5);
  const waNumber = brand.contact.phone.replace(/\D/g, '');

  return (
    <Section 
      title="Featured Highlights" 
      subtitle="Our current seasonal specials and most requested signature masterpieces."
      dark={false}
      className="px-0 sm:px-6 lg:px-8 overflow-hidden" 
    >
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 px-4 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {featuredCakes.map((cake) => {
          const waMessage = encodeURIComponent(`Hi ${brand.name}, I am interested in ordering the ${cake.name}!`);
          const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

          return (
            <div 
              key={cake.id} 
              className="relative flex-none w-[85vw] sm:w-[400px] h-[500px] snap-center rounded-[2.5rem] overflow-hidden shadow-lg group border border-slate-100 bg-white"
            >
              {/* 3. Make the image clickable to open Details */}
              <div 
                className="w-full h-[60%] overflow-hidden cursor-pointer"
                onClick={() => onSelectCake(cake)}
              >
                <img 
                  src={cake.image} 
                  alt={cake.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm pointer-events-none">
                <span className="font-black text-brand-primary tracking-tight">Ksh {cake.price}</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-white p-6 md:p-8 flex flex-col justify-between rounded-t-[2.5rem] -translate-y-2 pointer-events-none">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 line-clamp-1 tracking-tight">
                    {cake.name}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed text-pretty">
                    {cake.description}
                  </p>
                </div>

                {/* Reactivate pointer events just for the buttons */}
                <div className="flex gap-2 mt-4 pointer-events-auto">
                  <a 
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 py-3 rounded-xl font-bold text-sm transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Order
                  </a>
                  
                  {/* 4. Correctly wire the Details button */}
                  <button 
                    onClick={() => onSelectCake(cake)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-brand-primary py-3 rounded-xl font-bold text-sm transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-4">
        <Button 
          variant="outline" 
          size="lg" 
          className="group px-8 border-slate-200 text-slate-900 hover:border-brand-primary hover:text-brand-primary" 
          onClick={() => navigate(`/shop${location.search}`)}
        >
          View All Cakes
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 ml-2" />
        </Button>
      </div>
    </Section>
  );
};