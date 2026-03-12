// src/types/index.ts

export interface BrandConfig {
  name: string;
  tagline: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    socials: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
    };
  };
}

export interface Cake {
  id: string;
  slug: string; // URL-friendly name
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  isFeatured: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface SiteConfig {
  features: {
    showTestimonials: boolean;
    showGallery: boolean;
    showFaq: boolean;
    showPromotions: boolean;
  };
  homepageOrder: string[]; // e.g., ['hero', 'categories', 'featured', 'cta']
}

export interface GalleryItem {
  id: string;
  image: string;
  caption: string;
  category: string; // e.g., 'Wedding', 'Kitchen', 'Events'
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g., 'Bride', 'Birthday Boy', 'Local Foodie'
  content: string;
  rating: number;
  image?: string;
  date: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string; // e.g., 'Ordering', 'Delivery', 'Ingredients'
}

export interface PolicySection {
  title: string;
  content: string;
}

export interface PolicyPageData {
  slug: string;
  title: string;
  lastUpdated: string;
  sections: PolicySection[];
}