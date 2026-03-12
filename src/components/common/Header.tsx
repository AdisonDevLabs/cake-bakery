// src/components/common/Header.tsx
import { ShoppingBasket, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { brand } from '../../data';
import { cn } from '../../utils/cn';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo/Brand Name */}
          <div className="flex-shrink-0 flex items-center gap-2">
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} className="h-10 w-auto" />
            ) : (
              <span className="text-2xl font-bold text-brand-primary tracking-tight">
              {brand.name}
            </span>
            )}

          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="p-2 text-slate-600 hover:text-brand-primary relative">
              <ShoppingBasket className="w-6 h-6" />
              <span className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={cn("md:hidden bg-white border-b border-slate-100", isOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-brand-primary"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};