// src/pages/Contact.tsx
import React, { useState } from 'react';
import { useBrand } from '../context/BrandContext';
import { Section } from '../components/common/Section';
import { Button } from '../components/ui/Button';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, ChevronDown } from 'lucide-react';

export const Contact = () => {
  const { data } = useBrand();
  const [submitted, setSubmitted] = useState(false);

  if (!data) return null;
  const { brand } = data;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-10">
      <Section 
        title="Get in Touch" 
        subtitle="Have a question about a custom order or just want to say hi? We'd love to hear from you."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Contact Information</h3>
              <div className="space-y-8">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.contact.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-secondary/30 flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    <MapPin className="w-6 h-6 text-brand-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-brand-primary mb-1">Visit Us</p>
                    <p className="text-slate-600 group-hover:text-slate-900 transition-colors">{brand.contact.address}</p>
                  </div>
                </a>

                <a href={`tel:${brand.contact.phone.replace(/\D/g, '')}`} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-secondary/30 flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    <Phone className="w-6 h-6 text-brand-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-brand-primary mb-1">Call Us</p>
                    <p className="text-slate-600 group-hover:text-slate-900 transition-colors">{brand.contact.phone}</p>
                  </div>
                </a>

                <a href={`mailto:${brand.contact.email}`} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-secondary/30 flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    <Mail className="w-6 h-6 text-brand-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-brand-primary mb-1">Email Us</p>
                    <p className="text-slate-600 group-hover:text-slate-900 transition-colors">{brand.contact.email}</p>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Follow Our Journey</h3>
              <div className="flex gap-4">
                {brand.contact.socials.instagram && (
                  <a 
                    href={brand.contact.socials.instagram}
                    aria-label="Instagram"
                    className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 hover:text-brand-primary hover:border-brand-primary/30 transition-all"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                )}
                {brand.contact.socials.facebook && (
                  <a
                    href={brand.contact.socials.facebook}
                    aria-label="Facebook"
                    className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 hover:text-brand-primary hover:border-brand-primary/30 transition-all">
                    <Facebook className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-600">We'll get back to you as soon as possible.</p>
                <Button variant="outline" className="mt-8" onClick={() => setSubmitted(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="full-name" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                    <input id="full-name" type="text" required className="w-full px-4 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all" placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                    <input id="email" type="email" required className="w-full px-4 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all" placeholder="jane@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Subject</label>
                  <div className="relative">
                    <select id="subject" className="w-full px-4 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all appearance-none cursor-pointer">
                      <option>Custom Cake Inquiry</option>
                      <option>Wedding Cake Tasting</option>
                      <option>General Question</option>
                    </select>
                    {/* Added Chevron for visual cue */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Message</label>
                  <textarea required rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all resize-none" placeholder="Tell us about your dream cake..."></textarea>
                </div>
                <Button type="submit" size="lg" className="w-full h-16 text-lg shadow-lg shadow-brand-primary/20 gap-3">
                  Send Message <Send className="w-5 h-5" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};