// src/pages/CustomOrder.tsx
import React, { useState } from 'react';
import { useBrand } from '../context/BrandContext';
import { Button } from '../components/ui/Button';
import { Send, Calendar, Users, Cake as CakeIcon, ChevronLeft, ChevronDown, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CustomOrder = () => {
  const { data } = useBrand();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    eventType: 'Birthday',
    date: '',
    guests: '',
    flavor: '',
    details: ''
  });

  if (!data) return null;
  const { brand } = data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `*New Custom Cake Inquiry!* 🎂\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Event Type:* ${formData.eventType}\n` +
      `*Event Date:* ${formData.date}\n` +
      `*Number of Guests:* ${formData.guests}\n` +
      `*Preferred Flavor:* ${formData.flavor || 'Not sure yet'}\n\n` +
      `*Design Details/Ideas:* \n${formData.details}`;

    const waNumber = brand.contact.phone.replace(/\D/g, '');
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(waLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand-primary/20">
      
      {/* App-like Sticky Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 h-16 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-slate-600 font-bold active:opacity-50 transition-opacity p-2 -ml-2 rounded-full"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-base">Back</span>
        </button>
        <span className="font-black text-slate-900 tracking-tight text-lg absolute left-1/2 -translate-x-1/2 pointer-events-none">
          Custom Order
        </span>
        <div className="w-10" /> {/* Spacer to perfectly center the title */}
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 md:py-10">
        
        {/* Intro Section */}
        <div className="mb-8 text-center md:text-left px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Bespoke Service</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tight">
            Design Your Dream Cake
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed text-pretty">
            Fill out the details below. We will review your vision and finalize the details with you directly via WhatsApp.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Card 1: Personal Details */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <h2 className="flex items-center gap-3 text-sm font-black text-slate-900 uppercase tracking-widest mb-5 border-b border-slate-50 pb-4">
              <span className="w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-xs">1</span>
              Your Details
            </h2>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
              <input 
                required type="text" name="name" value={formData.name} onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400 placeholder:font-normal" 
                placeholder="e.g. Jane Doe" 
              />
            </div>
          </div>

          {/* Card 2: Event Information */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <h2 className="flex items-center gap-3 text-sm font-black text-slate-900 uppercase tracking-widest mb-5 border-b border-slate-50 pb-4">
              <span className="w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-xs">2</span>
              Event Info
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              <div className="space-y-1.5 relative">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-1.5">
                  <CakeIcon className="w-3.5 h-3.5"/> Event Type
                </label>
                <div className="relative">
                  <select 
                    name="eventType" value={formData.eventType} onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-4 pr-12 py-4 focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-slate-900 font-medium appearance-none cursor-pointer"
                  >
                    <option>Birthday</option>
                    <option>Wedding</option>
                    <option>Anniversary</option>
                    <option>Baby Shower</option>
                    <option>Corporate Event</option>
                    <option>Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5"/> Event Date
                </label>
                <input 
                  required type="date" name="date" value={formData.date} onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-slate-900 font-medium" 
                />
              </div>

            </div>
          </div>

          {/* Card 3: Cake Details */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <h2 className="flex items-center gap-3 text-sm font-black text-slate-900 uppercase tracking-widest mb-5 border-b border-slate-50 pb-4">
              <span className="w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-xs">3</span>
              Cake Details
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5"/> Number of Guests
                </label>
                <input 
                  required type="number" min="1" name="guests" value={formData.guests} onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400 placeholder:font-normal" 
                  placeholder="e.g. 50" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Preferred Flavor</label>
                <input 
                  type="text" name="flavor" value={formData.flavor} onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400 placeholder:font-normal" 
                  placeholder="e.g. Vanilla & Strawberry" 
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-2">
                Design Ideas & Theme
                <span className="text-[10px] text-slate-400 font-normal normal-case tracking-normal">Required</span>
              </label>
              <textarea 
                required rows={4} name="details" value={formData.details} onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400 placeholder:font-normal resize-none" 
                placeholder="Describe colors, themes, or any specific design elements you have in mind..."
              />
            </div>
          </div>

          {/* Sticky-like bottom action area */}
          <div className="pt-4 pb-12">
            <Button 
              type="submit" 
              className="w-full h-16 text-lg rounded-2xl shadow-xl shadow-[#25D366]/20 gap-3 bg-[#25D366] text-white hover:bg-[#128C7E] active:scale-[0.98] transition-all border-none"
            >
              <Send className="w-5 h-5" />
              Send to WhatsApp
            </Button>
            <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mt-6">
              Safe & Secure • Direct to Baker
            </p>
          </div>

        </form>
      </main>
    </div>
  );
};