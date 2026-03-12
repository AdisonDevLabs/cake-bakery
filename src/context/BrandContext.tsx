// src/context/BrandContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { BrandConfig, Cake, SiteConfig, GalleryItem, Testimonial, FaqItem, PolicyPageData } from '../types';

interface BrandData {
  brand: BrandConfig;
  cakes: Cake[];
  config: SiteConfig;
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  policies: PolicyPageData[];
}

interface BrandContextType {
  data: BrandData | null;
  isLoading: boolean;
  error: string | null;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<BrandData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrandData = async () => {
      const params = new URLSearchParams(window.location.search);
      const urlKey = params.get('brand');
      const savedKey = localStorage.getItem('locked_brand');

      // Determine the active brand key
      let activeKey = urlKey || savedKey;

      if (!activeKey) {
        setError("NO_BRAND_PROVIDED");
        setIsLoading(false);
        return;
      }

      // Lock the brand to localStorage on first successful visit
      if (urlKey && !savedKey) {
        localStorage.setItem('locked_brand', urlKey);
      }

      // If user tries to use a different key than the locked one, force redirect
      if (savedKey && urlKey && savedKey !== urlKey) {
        window.location.href = `${window.location.origin}${window.location.pathname}?brand=${savedKey}`;
        return;
      }

      try {
        // Fetch all brand-specific data from the public folder
        const [brandRes, cakesRes, faqRes, galleryRes, policiesRes, configRes, testimonialsRes] = await Promise.all([
          fetch(`/brands/${activeKey}/brand.json`),
          fetch(`/brands/${activeKey}/cakes.json`),
          fetch(`/brands/${activeKey}/faq.json`),
          fetch(`/brands/${activeKey}/gallery.json`),
          fetch(`/brands/${activeKey}/policies.json`),
          fetch(`/brands/${activeKey}/site-config.json`),
          fetch(`/brands/${activeKey}/testimonials.json`),
        ]);

        if (!brandRes.ok) throw new Error("Brand not found");

        const brand = await brandRes.json();
        const cakes = await cakesRes.json();
        const faqs = await faqRes.json();
        const gallery = await galleryRes.json();
        const policies = await policiesRes.json();
        const config = await configRes.json();
        const testimonials = await testimonialsRes.json();

        setData({ brand, cakes, faqs, gallery, policies, config, testimonials });
        
        // Ensure the URL always shows their brand key
        if (!window.location.search.includes(activeKey)) {
          window.history.replaceState(null, '', `?brand=${activeKey}`);
        }
      } catch (err) {
        setError("Invalid brand configuration.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrandData();
  }, []);

  return (
    <BrandContext.Provider value={{ data, isLoading, error }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) throw new Error("useBrand must be used within a BrandProvider");
  return context;
};