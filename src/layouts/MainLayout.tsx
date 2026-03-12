// src/layouts/MainLayout.tsx
import React from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 antialiased selection:bg-brand-primary/20">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-[999] focus:top-4 focus:left-4 focus:py-2 focus:px-4 focus:bg-brand-primary focus:text-white focus:rounded-full focus:font-bold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-all"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1} >
        {children}
      </main>
      <Footer />
    </div>
  );
};