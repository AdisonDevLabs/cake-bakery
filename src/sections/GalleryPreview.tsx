// src/sections/GalleryPreview.tsx
import { useBrand } from '../context/BrandContext';
import { Section } from '../components/common/Section';
import { Button } from '../components/ui/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';

export const GalleryPreview = () => {
  const { data } = useBrand();
  const navigate = useNavigate();
  const location = useLocation();

  if (!data || !data.gallery) return null;

  // Grab the first 6 to 9 images for the preview
  const previewImages = data.gallery.slice(0, 9);

  return (
    <Section 
      title="Gallery" 
      subtitle="A glimpse into our kitchen and the beautiful celebrations we've been a part of."
      className="px-0 sm:px-6 lg:px-8 overflow-hidden" 
    >
      {/* Horizontal Mobile-First Scroll */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-10 pt-4 px-4 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {previewImages.map((item) => (
          <div 
            key={item.id} 
            onClick={() => navigate(`/gallery${location.search}`)}
            className="relative flex-none w-[70vw] sm:w-[280px] aspect-[4/5] snap-center rounded-[2rem] overflow-hidden shadow-md group cursor-pointer border border-slate-100 bg-slate-50"
          >
            <img 
              src={item.image} 
              alt={item.caption}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Hover overlay that is always slightly visible on mobile, darkens on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-6">
               <span className="text-brand-secondary text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 drop-shadow-sm">
                {item.category}
              </span>
              <p className="text-white font-bold leading-tight text-sm drop-shadow-md line-clamp-2">
                {item.caption}
              </p>
            </div>

            {/* Subtle icon indicator top right */}
             <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ImageIcon className="w-4 h-4 text-white" />
             </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-2">
        <Button 
          variant="outline" 
          size="lg" 
          className="group px-8 border-slate-200 text-slate-900 hover:border-brand-primary hover:text-brand-primary"
          onClick={() => navigate(`/gallery${location.search}`)}
        >
          View Full Gallery
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 ml-2" />
        </Button>
      </div>
    </Section>
  );
};