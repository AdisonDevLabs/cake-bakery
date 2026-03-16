// src/pages/Gallery.tsx
import { useBrand } from '../context/BrandContext';
import { Section } from '../components/common/Section';

export const Gallery = () => {
  const { data } = useBrand();
  
  if (!data) return null;

  return (
    <div className="pt-10">
      <Section 
        title="Our Gallery" 
        subtitle="A glimpse into our kitchen and the beautiful celebrations we've been a part of."
      >
        <div className="columns-1 sm:columns-3 lg:columns-4 gap-4 md:gap-8 space-y-4 md:space-y-8">
          {data.gallery.map((item) => (
            <div 
              key={item.id} 
              className="relative group overflow-hidden rounded-3xl break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-500 bg-slate-100"
            >
              <img 
                src={item.image} 
                alt={item.caption}
                loading="lazy" // Critical for performance
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
                <span className="text-brand-secondary text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-2 drop-shadow-sm">
                  {item.category}
                </span>
                <p className="text-white font-bold leading-tight text-base md:text-lg text-pretty drop-shadow-md">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};