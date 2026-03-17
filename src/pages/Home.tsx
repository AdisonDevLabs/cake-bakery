// src/pages/Home.tsx
import React from 'react';
import { useBrand } from '../context/BrandContext';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Categories } from '../sections/Categories';
import { FeaturedCakes } from '../sections/FeaturedCakes';
import { CustomOrderBanner } from '../sections/CustomOrderBanner';
import { Testimonials } from '../pages/Testimonials';
import { GalleryPreview } from '../sections/GalleryPreview';
import { HowToOrder } from '../sections/HowToOrder';
import { FAQ } from '../pages/FAQ';
import { ContactSection } from '../sections/ContactSection';
import type { Cake } from '../types';

interface HomeProps {
  onSelectCake: (cake: Cake) => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectCake }) => {
  const { data } = useBrand();
  
  if (!data) return null;

  const SECTION_MAP: Record<string, React.ReactNode> = {
    hero: <Hero key="hero" />,
    about: <About key="about" />,
    categories: <Categories key="categories" />,
    featured: <FeaturedCakes key="featured" onSelectCake={onSelectCake} />,
    customOrder: <CustomOrderBanner key="customOrder" />,
    howToOrder: <HowToOrder key="howToOrder" />,
    testimonials: data.config.features.showTestimonials ? <Testimonials key="testimonials" /> : null,
    gallery: data.config.features.showGallery ? <GalleryPreview key="gallery" /> : null,
    faq: data.config.features.showFaq ? <FAQ key="faq" /> : null,
    contact: <ContactSection key="contact" />,
  };

  return (
    <div className="flex flex-col min-h-screen animate-in fade-in duration-700">
      {data.config.homepageOrder.map((sectionKey) => {
        const component = SECTION_MAP[sectionKey];
        if (!component) return null;
        return (
          <div 
            key={sectionKey} 
            id={sectionKey} 
            className="scroll-mt-20"
          >
            {component}
          </div>
        );
      })}
    </div>
  );
};