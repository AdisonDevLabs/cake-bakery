// src/pages/Gallery.tsx
import { gallery } from '../data';
import { Section } from '../components/common/Section';

export const Gallery = () => {
  return (
    <div className="pt-10">
      <Section 
        title="Our Gallery" 
        subtitle="A glimpse into our kitchen and the beautiful celebrations we've been a part of."
      >
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {gallery.map((item) => (
            <div 
              key={item.id} 
              className="relative group overflow-hidden rounded-2xl break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <img 
                src={item.image} 
                alt={item.caption}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-brand-secondary text-xs font-bold uppercase tracking-widest mb-2">
                  {item.category}
                </span>
                <p className="text-white font-medium">
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