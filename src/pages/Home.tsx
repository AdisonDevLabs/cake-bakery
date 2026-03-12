// src/pages/Home.tsx
import React from 'react';
import { useBrand } from '../context/BrandContext';
import { Hero } from '../sections/Hero';
import { FeaturedCakes } from '../sections/FeaturedCakes';
import { Gallery } from '../pages/Gallery';
import { Testimonials } from '../pages/Testimonials';
import { FAQ } from '../pages/FAQ';
import { Contact } from '../pages/Contact';
import type { Cake } from '../types';

interface HomeProps {
  onSelectCake: (cake: Cake) => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectCake }) => {
  const { data } = useBrand();
  
  if (!data) return null;

  const SECTION_MAP: Record<string, React.ReactNode> = {
    hero: <Hero key="hero" />,
    featured: <FeaturedCakes key="featured" onSelectCake={onSelectCake} />,
    gallery: data.config.features.showGallery ? <Gallery key="gallery" /> : null,
    testimonials: data.config.features.showTestimonials ? <Testimonials key="testimonials" /> : null,
    faq: data.config.features.showFaq ? <FAQ key="faq" /> : null,
    contact: <Contact key="contact" />,
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
            className="scroll-mt-20" // Matches the header height (h-20)
          >
            {component}
          </div>
        );
      })}
    </div>
  );
};