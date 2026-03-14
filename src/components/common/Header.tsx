// src/components/common/Header.tsx
import { ShoppingBasket, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBrand } from '../../context/BrandContext';
import { useCart } from '../../context/CartContext';
import { cn } from '../../utils/cn';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useBrand();
  const { cartCount, setIsCartOpen } = useCart();

  const location = useLocation();

  // Guard: If data hasn't loaded yet, don't crash the app
  if (!data) return null;
  const { brand } = data;

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
              <img src={brand.logo} alt={`${brand.name} logo`} className="h-20 w-auto object-contain" />
            ) : (
              <span className="text-2xl font-black text-brand-primary tracking-tighter leading-none select-none">
                {brand.name}
              </span>
            )}
          </div>

          {/* Desktop Nav - Added group hover for the cart icon */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={`${link.href}${location.search}`}
                className="text-sm font-semibold text-slate-600 hover:text-brand-primary transition-all duration-200 px-2 py-1 rounded-md hover:bg-slate-50"
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => setIsCartOpen(true)} 
              aria-label={`View shopping cart with ${cartCount} items`}
              className="p-2 text-slate-600 hover:text-brand-primary relative group transition-transform active:scale-90"
            >
              <ShoppingBasket className="w-6 h-6 transition-transform group-hover:rotate-3" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[11px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={cn(
        "md:hidden bg-white border-b border-slate-100 overflow-hidden transition-all duration-300 ease-in-out", 
        isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-4 pt-2 pb-6 space-y-2 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={`${link.href}${location.search}`}
              onClick={() => setIsOpen(false)} 
              className="block px-4 py-3 text-base font-semibold text-slate-700 hover:text-brand-primary hover:bg-slate-50 rounded-xl transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};