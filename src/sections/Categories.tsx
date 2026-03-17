// src/sections/Categories.tsx
import { useBrand } from '../context/BrandContext';
import { Section } from '../components/common/Section';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Categories = () => {
  const { data } = useBrand();
  const navigate = useNavigate();
  const location = useLocation();

  if (!data) return null;

  // Dynamically extract unique categories and their first image
  const uniqueCategoryIds = Array.from(new Set(data.cakes.map(cake => cake.categoryId)));
  const categoryCards = uniqueCategoryIds.map(catId => {
    const representativeCake = data.cakes.find(c => c.categoryId === catId);
    return {
      id: catId,
      // Capitalize the category name
      name: catId.charAt(0).toUpperCase() + catId.slice(1).replace('-', ' '),
      image: representativeCake?.image || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
    };
  }).slice(0, 4); // Show top 4 categories (e.g., Birthday, Wedding, Kids, Cupcakes)

  return (
    <Section 
      title="Our Creations" 
      subtitle="Find the perfect centerpiece for your next unforgettable celebration."
      dark={true}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {categoryCards.map((category) => (
          <div 
            key={category.id} 
            className="group relative h-[350px] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
            onClick={() => navigate(`/shop${location.search}`)}
          >
            {/* Background Image */}
            <img 
              src={category.image} 
              alt={`${category.name} Cakes`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Dark Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
                {category.name}
              </h3>
              <p className="text-slate-200 text-sm mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Explore our handcrafted {category.name.toLowerCase()} collection.
              </p>
              
              {/* Fake Button for Visual CTA */}
              <div className="inline-flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest">
                View More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};