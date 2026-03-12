// src/components/common/Footer.tsx
import { brand } from '../../data';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{brand.name}</h3>
            <p className="mt-4 text-sm text-slate-600">{brand.tagline}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>{brand.contact.address}</li>
              <li>{brand.contact.phone}</li>
              <li>{brand.contact.email}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Hours</h4>
            <p className="mt-4 text-sm text-slate-600 text-pretty">
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