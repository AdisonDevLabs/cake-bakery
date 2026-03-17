// src/sections/ShopCustomerFavorites.tsx
import { useBrand } from '../context/BrandContext';
import { Section } from '../components/common/Section';
import { MessageCircle, Heart } from 'lucide-react';

export const ShopCustomerFavorites = () => {
  const { data } = useBrand();
  if (!data) return null;

  const { brand, cakes } = data;
  
  // Pull the featured cakes to act as our "Customer Favorites"
  const favoriteCakes = cakes.filter(cake => cake.isFeatured).slice(0, 6);
  const waNumber = brand.contact.phone.replace(/\D/g, '');

  if (favoriteCakes.length === 0) return null;

  return (
    <Section 
      title="Customer Favorites" 
      subtitle="Our most-loved creations. Can't decide? You can't go wrong with one of these."
      dark={true} // A soft gray background to separate it beautifully from the white product grid above
      className="px-0 sm:px-6 lg:px-8 overflow-hidden" 
    >
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-10 pt-4 px-4 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {favoriteCakes.map((cake) => {
          const waMessage = encodeURIComponent(`Hi ${brand.name}, I would love to order the ${cake.name} from your Customer Favorites!`);
          const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

          return (
            <div 
              key={cake.id} 
              className="relative flex-none w-[75vw] sm:w-[320px] snap-center bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col group"
            >
              {/* Image Section */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                <img 
                  src={cake.image} 
                  alt={cake.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm text-brand-accent">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
              </div>

              {/* Details & CTA Section */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-900 mb-1 tracking-tight line-clamp-1">
                  {cake.name}
                </h3>
                <p className="text-xl font-black text-brand-primary mb-5">
                  Ksh {cake.price.toLocaleString()}
                </p>
                
                <div className="mt-auto pt-2">
                  <a 
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center h-12 px-6 text-sm font-bold rounded-xl bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366] hover:text-white hover:shadow-lg hover:shadow-[#25D366]/20 transition-all gap-2 active:scale-95 group/btn"
                  >
                    <MessageCircle className="w-4 h-4 group-hover/btn:animate-bounce" />
                    Order Yours Now
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};