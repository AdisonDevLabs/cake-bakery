// src/components/common/ThemeHandler.tsx
import { useEffect } from 'react';
import { useBrand } from '../../context/BrandContext';

/**
 * Injects brand colors from brand data into CSS variables.
 * This allows for real-time white-labeling without rebuilding CSS.
 */
export const ThemeHandler = () => {
  const { data } = useBrand();

  useEffect(() => {
    if (!data) return;
    
    const root = document.documentElement;
    const { colors, name, tagline } = data.brand;
    
    // Map JSON colors to CSS variables defined in index.css
    if (colors.primary) {
      root.style.setProperty('--brand-primary', colors.primary);
    }
    if (colors.secondary) {
      root.style.setProperty('--brand-secondary', colors.secondary);
    }
    if (colors.accent) {
      root.style.setProperty('--brand-accent', colors.accent);
    }
    
    // Set the Document Title dynamically
    document.title = `${name} | ${tagline}`;
  }, [data]); // Effect re-runs if data changes

  return null; // This component doesn't render UI, only manages side effects
};