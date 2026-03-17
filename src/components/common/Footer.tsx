// src/components/common/Footer.tsx
import { useBrand } from '../../context/BrandContext';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export const Footer = () => {
  const { data } = useBrand();
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  if (!data) return null;
  const { brand } = data;

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All Cakes', path: '/shop' },
    { name: 'Custom Orders', path: '/custom-order' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Section (Spans 4 columns on large screens) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link to={`/${location.search}`} className="mb-6 block active:scale-95 transition-transform">
              {brand.logo ? (
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`} 
                  className="h-16 w-auto object-contain mix-blend-multiply" 
                />
              ) : (
                <span className="text-2xl font-black text-slate-900 tracking-tighter">
                  {brand.name}
                </span>
              )}
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm mb-8 text-pretty">
              {brand.tagline}. Every cake is a masterpiece, handcrafted with premium ingredients and delivered fresh.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {brand.contact.socials?.instagram && (
                <a 
                  href={brand.contact.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-primary hover:border-brand-primary hover:shadow-md transition-all group"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              )}
              {brand.contact.socials?.facebook && (
                <a 
                  href={brand.contact.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-primary hover:border-brand-primary hover:shadow-md transition-all group"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={`${link.path}${location.search}`}
                    className="text-sm font-medium text-slate-500 hover:text-brand-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-brand-primary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-5">
              <li>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.contact.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-sm text-slate-500 hover:text-brand-primary transition-colors"
                >
                  <MapPin className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-brand-primary transition-colors" />
                  <span className="leading-relaxed mt-0.5">{brand.contact.address}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${brand.contact.phone.replace(/\D/g, '')}`} 
                  className="group flex items-center gap-3 text-sm font-medium text-slate-500 hover:text-brand-primary transition-colors"
                >
                  <Phone className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-brand-primary transition-colors" />
                  <span>{brand.contact.phone}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${brand.contact.email}`} 
                  className="group flex items-center gap-3 text-sm font-medium text-slate-500 hover:text-brand-primary transition-colors"
                >
                  <Mail className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-brand-primary transition-colors" />
                  <span>{brand.contact.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">Hours</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                <span className="font-medium">Mon - Fri</span>
                <span className="text-slate-900 font-bold">9am - 6pm</span>
              </li>
              <li className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                <span className="font-medium">Saturday</span>
                <span className="text-slate-900 font-bold">10am - 4pm</span>
              </li>
              <li className="flex justify-between items-center pb-2">
                <span className="font-medium">Sunday</span>
                <span className="text-brand-primary font-bold">Closed</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-medium text-slate-400">
            &copy; {currentYear} {brand.name}. All rights reserved.
          </p>
          <p className="text-sm font-medium text-slate-400">
            Baked with love in Kenya.
          </p>
        </div>
      </div>
    </footer>
  );
};