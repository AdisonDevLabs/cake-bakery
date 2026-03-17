// src/sections/ContactSection.tsx
import { useBrand } from '../context/BrandContext';
import { Section } from '../components/common/Section';
import { MapPin, MessageCircle, Phone, Mail } from 'lucide-react';

export const ContactSection = () => {
  const { data } = useBrand();
  if (!data) return null;

  const { brand } = data;

  // Dynamically extract the city for the title, defaulting to Nakuru
  const cityMatch = brand.contact.address.match(/([A-Za-z]+),\s*Kenya/);
  const city = cityMatch ? cityMatch[1] : 'Nakuru';

  // Format WhatsApp Link
  const waNumber = brand.contact.phone.replace(/\D/g, '');
  const waMessage = encodeURIComponent(`Hi ${brand.name}, I'm reaching out from your website!`);
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  // Format Google Maps Embed URL
  const mapQuery = encodeURIComponent(brand.contact.address);
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <Section 
      title={`Find Us in ${city}`} 
      subtitle="Drop by our bakery or shoot us a quick message. We'd love to hear from you!"
      dark={true} // Setting this to dark creates a nice contrast footer area
    >
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Side: Contact Details & CTA */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-8">
          
          <div className="space-y-6">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-secondary/30 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Our Location</p>
                <p className="text-lg font-bold text-slate-900 leading-snug text-pretty">
                  {brand.contact.address}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-secondary/30 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Call Us</p>
                <a href={`tel:${waNumber}`} className="text-lg font-bold text-slate-900 hover:text-brand-primary transition-colors">
                  {brand.contact.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-secondary/30 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Email</p>
                <a href={`mailto:${brand.contact.email}`} className="text-lg font-bold text-slate-900 hover:text-brand-primary transition-colors">
                  {brand.contact.email}
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <a 
              href={waLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center h-16 px-8 text-lg font-bold rounded-2xl bg-[#25D366] text-white hover:bg-[#128C7E] transition-all shadow-xl shadow-[#25D366]/20 gap-3 group active:scale-95"
            >
              <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
              Chat on WhatsApp
            </a>
            <p className="text-center text-xs font-bold text-slate-400 mt-4 uppercase tracking-widest">
              Instant Replies during business hours
            </p>
          </div>
        </div>

        {/* Right Side: Google Map Embed */}
        <div className="w-full lg:w-1/2 min-h-[300px] sm:min-h-[400px] lg:min-h-full relative bg-slate-100">
          <iframe 
            src={mapSrc}
            title={`${brand.name} Location`}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Subtle inner shadow overlay to blend the harsh iframe edges */}
          <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
        </div>

      </div>
    </Section>
  );
};