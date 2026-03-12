// src/components/common/Footer.tsx
import { useBrand } from '../../context/BrandContext';

export const Footer = () => {
  const { data } = useBrand();
  const currentYear = new Date().getFullYear();

  // Guard clause to wait for context
  if (!data) return null;
  const { brand } = data;

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand section spans 2 columns for better visual balance */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">{brand.name}</h3>
            <p className="mt-4 text-sm text-slate-500 leading-relaxed max-w-sm">
              {brand.tagline}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Contact</h4>
            {/* Increased space-y for breathability */}
            <ul className="mt-4 space-y-3 text-sm text-slate-500">
              <li className="leading-relaxed">{brand.contact.address}</li>
              <li>
                {/* Cleaned phone string for the tel: link, added hover state */}
                <a 
                  href={`tel:${brand.contact.phone.replace(/[^\d+]/g, '')}`} 
                  className="hover:text-brand-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50 rounded-sm"
                >
                  {brand.contact.phone}
                </a>
              </li>
              <li>
                {/* Added mailto: link and hover state */}
                <a 
                  href={`mailto:${brand.contact.email}`} 
                  className="hover:text-brand-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50 rounded-sm"
                >
                  {brand.contact.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Hours</h4>
            <p className="mt-4 text-sm text-slate-500 leading-relaxed text-pretty">
              Mon - Fri: 9am - 6pm<br />
              Sat: 10am - 4pm<br />
              Sun: Closed
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-8 text-center">
          <p className="text-sm text-slate-400">
            &copy; {currentYear} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};