// src/components/common/ThemeHandler.tsx
import React, { useEffect } from 'react';
import { brand } from '../../data';

/**
 * Injects brand colors from brand.json into CSS variables.
 * This allows for real-time white-labeling without rebuilding CSS.
 */
export const ThemeHandler: React.FC = () => {
  useEffect(() => {
    const root = document.documentElement;
    
    // Map JSON colors to CSS variables defined in index.css
    if (brand.colors.primary) {
      root.style.setProperty('--brand-primary', brand.colors.primary);
    }
    if (brand.colors.secondary) {
      root.style.setProperty('--brand-secondary', brand.colors.secondary);
    }
    if (brand.colors.accent) {
      root.style.setProperty('--brand-accent', brand.colors.accent);
    }
    
    // Set the Document Title dynamically
    document.title = `${brand.name} | ${brand.tagline}`;
  }, []);

  return null; // This component doesn't render UI, only manages side effects
};