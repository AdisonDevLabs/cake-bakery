// src/components/common/Header.tsx
import { ShoppingBasket, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBrand } from '../../context/BrandContext';
import { useCart } from '../../context/CartContext';
import { cn } from '../../utils/cn';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useBrand();
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();

  // Close mobile menu automatically if the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  if (!data) return null;
  const { brand } = data;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Custom Order', href: '/custom-order' },
    { name: 'Contact', href: '/contact' },
  ];

  // Helper to check if a link is the current active page
  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo/Brand Name */}
          <Link 
            to={`/${location.search}`} 
            className="flex-shrink-0 flex items-center gap-2 active:scale-95 transition-transform outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg"
          >
            {brand.logo ? (
              <img 
                src={brand.logo} 
                alt={`${brand.name} logo`} 
                className="h-14 md:h-16 w-auto object-contain mix-blend-multiply" 
              />
            ) : (
              <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none select-none">
                {brand.name}
              </span>
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  to={`${link.href}${location.search}`}
                  className={cn(
                    "text-sm font-bold transition-all duration-200 px-4 py-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                    active 
                      ? "bg-brand-primary/10 text-brand-primary" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-brand-primary"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions (Cart & Mobile Menu) */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Cart Button - Now properly visible on ALL screen sizes */}
            <button 
              onClick={() => setIsCartOpen(true)} 
              aria-label={`View shopping cart with ${cartCount} items`}
              className="p-2.5 text-slate-700 hover:text-brand-primary hover:bg-brand-primary/5 rounded-full relative group transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <ShoppingBasket className="w-6 h-6 transition-transform group-hover:rotate-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 md:-top-1 md:-right-1 bg-brand-primary text-white text-[10px] md:text-[11px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-md ring-2 ring-white animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                className="text-slate-700 p-2.5 hover:bg-slate-50 hover:text-brand-primary rounded-full transition-colors active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
            
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <div className={cn(
        "md:hidden absolute w-full bg-white border-b border-slate-100 shadow-2xl shadow-slate-900/10 transition-all duration-300 ease-in-out origin-top", 
        isOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible"
      )}>
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                to={`${link.href}${location.search}`}
                className={cn(
                  "block px-5 py-3.5 text-base font-bold rounded-2xl transition-all active:scale-[0.98]",
                  active 
                    ? "bg-brand-primary/10 text-brand-primary" 
                    : "text-slate-700 hover:bg-slate-50 hover:text-brand-primary"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};