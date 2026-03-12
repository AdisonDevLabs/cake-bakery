// src/pages/Home.tsx
import React from 'react';
import { config } from '../data';
import { Hero } from '../sections/Hero';
import { FeaturedCakes } from '../sections/FeaturedCakes';
import { Gallery } from '../pages/Gallery'; // We can treat the gallery as a section too
import { Testimonials } from '../pages/Testimonials';
import { FAQ } from '../pages/FAQ';
import { Contact } from '../pages/Contact';
import type { Cake } from '../types';

interface HomeProps {
  onSelectCake: (cake: Cake) => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectCake }) => {
  // Mapping of JSON keys to Section Components
  const SECTION_MAP: Record<string, React.ReactNode> = {
    hero: <Hero key="hero" />,
    featured: <FeaturedCakes key="featured" onSelectCake={onSelectCake} />,
    gallery: config.features.showGallery ? <Gallery key="gallery" /> : null,
    testimonials: config.features.showTestimonials ? <Testimonials key="testimonials" /> : null,
    faq: config.features.showFaq ? <FAQ key="faq" /> : null,
    contact: <Contact key="contact" />,
  };

  return (
    <div className="flex flex-col">
      {/* We map through the order defined in site-config.json
        e.g., ["hero", "featured", "testimonials"]
      */}
      {config.homepageOrder.map((sectionKey) => {
        const component = SECTION_MAP[sectionKey];
        return component || null;
      })}
    </div>
  );
};