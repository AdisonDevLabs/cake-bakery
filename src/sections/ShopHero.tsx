// src/sections/ShopHero.tsx
import { useBrand } from '../context/BrandContext';
import { MessageCircle } from 'lucide-react';

export const ShopHero = () => {
  const { data } = useBrand();
  
  if (!data) return null;
  const { brand, cakes } = data;

  // Pull a nice image from the catalog (e.g., the first featured cake) or fallback
  const heroImage = cakes.find(cake => cake.isFeatured)?.image || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2000";

  // Format WhatsApp Link
  const waNumber = brand.contact.phone.replace(/\D/g, '');
  const waMessage = encodeURIComponent(`Hi ${brand.name}, I'm looking through your shop and would like to place an order!`);
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image with Dark Overlay for Text Readability */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt={`${brand.name} cakes`} 
          className="w-full h-full object-cover opacity-60 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
          Our Signature Collection
        </h1>
        <p className="text-lg sm:text-xl text-slate-200 mb-8 leading-relaxed font-medium text-pretty drop-shadow-md max-w-2xl mx-auto">
          Browse our range of custom cakes and pastries. Place your order quickly via WhatsApp.
        </p>
        
        <a 
          href={waLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg font-bold rounded-full bg-[#25D366] text-white hover:bg-[#128C7E] shadow-xl shadow-[#25D366]/20 transition-all gap-3 active:scale-95 group"
        >
          <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
};