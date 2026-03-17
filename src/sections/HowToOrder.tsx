// src/sections/HowToOrder.tsx
import { useBrand } from '../context/BrandContext';
import { Section } from '../components/common/Section';
import { Search, ShoppingCart, MessageCircle, Truck } from 'lucide-react';

export const HowToOrder = () => {
  const { data } = useBrand();
  if (!data) return null;

  const steps = [
    {
      id: 1,
      title: "Browse Collection",
      description: "Explore our gallery and shop to find the perfect centerpiece for your celebration.",
      icon: Search,
    },
    {
      id: 2,
      title: "Add to Cart",
      description: "Select your cake, choose your preferred options, and add it to your basket.",
      icon: ShoppingCart,
    },
    {
      id: 3,
      title: "Confirm Details",
      description: "Checkout or send your cart directly to our WhatsApp for a personalized touch.",
      icon: MessageCircle,
    },
    {
      id: 4,
      title: "Fresh Delivery",
      description: "We bake your cake from scratch and deliver it safely right to your doorstep.",
      icon: Truck,
    }
  ];

  return (
    <Section 
      title="Order in 4 Easy Steps" 
      subtitle={`Getting your dream cake from ${data.brand.name} is simple, fast, and secure.`}
      dark={false} // White background to contrast nicely with the dark Testimonials or Gallery Preview
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
        
        {/* Optional: Desktop Connecting Line */}
        <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-slate-100 -z-10" />

        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div 
              key={step.id} 
              className="relative flex flex-col items-center text-center group"
            >
              {/* Massive background number for a premium, modern aesthetic */}
              <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 text-[8rem] sm:text-[10rem] font-black text-slate-50/80 -z-20 select-none transition-transform duration-500 group-hover:scale-110 group-hover:text-brand-primary/5">
                {step.id}
              </div>

              {/* Icon Container */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                <Icon className="w-8 h-8 md:w-10 md:h-10 text-brand-primary" />
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-[250px]">
                {step.description}
              </p>

              {/* Mobile-only connecting line (shows between items on small screens) */}
              {index !== steps.length - 1 && (
                <div className="lg:hidden w-px h-12 bg-slate-100 my-6" />
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
};