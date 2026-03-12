// src/pages/Contact.tsx
import React, { useState } from 'react';
import { brand } from '../data';
import { Section } from '../components/common/Section';
import { Button } from '../components/ui/Button';
import { Mail, Phone, MapPin, Send, Instagram, Facebook } from 'lucide-react';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In production, you would send this to an API or Formspree
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
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-secondary/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Visit Us</p>
                    <p className="text-slate-600">{brand.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-secondary/30 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Call Us</p>
                    <p className="text-slate-600">{brand.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-secondary/30 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Email Us</p>
                    <p className="text-slate-600">{brand.contact.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Follow Our Journey</h3>
              <div className="flex gap-4">
                {brand.contact.socials.instagram && (
                  <a href={brand.contact.socials.instagram} className="p-3 bg-slate-100 rounded-xl text-slate-600 hover:text-brand-primary hover:bg-brand-secondary/20 transition-all">
                    <Instagram className="w-6 h-6" />
                  </a>
                )}
                {brand.contact.socials.facebook && (
                  <a href={brand.contact.socials.facebook} className="p-3 bg-slate-100 rounded-xl text-slate-600 hover:text-brand-primary hover:bg-brand-secondary/20 transition-all">
                    <Facebook className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xl">
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
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all" placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <input type="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all" placeholder="jane@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Subject</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all appearance-none bg-white">
                    <option>Custom Cake Inquiry</option>
                    <option>Wedding Cake Tasting</option>
                    <option>General Question</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Message</label>
                  <textarea required rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all resize-none" placeholder="Tell us about your dream cake..."></textarea>
                </div>
                <Button type="submit" size="lg" className="w-full gap-2">
                  Send Message <Send className="w-4 h-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};