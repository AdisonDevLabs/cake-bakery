// src/data/index.ts
import brandData from './brand.json';
import cakeData from './cakes.json';
import siteConfig from './site-config.json';
import galleryData from './gallery.json';
import testimonialData from './testimonials.json'
import faqData from './faq.json';
import policyData from './policies.json';

import type { BrandConfig, Cake, SiteConfig, GalleryItem, Testimonial, FaqItem, PolicyPageData } from '../types';

export const brand = brandData as BrandConfig;
export const cakes = cakeData as Cake[];
export const config = siteConfig as SiteConfig;
export const gallery = galleryData as GalleryItem[];
export const testimonials = testimonialData as Testimonial[];
export const faqs = faqData as FaqItem[];
export const policies = policyData as PolicyPageData[];