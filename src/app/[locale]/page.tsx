'use client';

import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/about/AboutSection';
import ServicesSection from '@/components/services/ServicesSection';
import ProductsSection from '@/components/products/ProductsSection';
import GallerySection from '@/components/gallery/GallerySection';
import MaterialsSection from '@/components/materials/MaterialsSection';
import BeforeAfterSection from '@/components/beforeafter/BeforeAfterSection';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import CostCalculator from '@/components/calculator/CostCalculator';
import QuoteSection from '@/components/quote/QuoteSection';
import FAQSection from '@/components/faq/FAQSection';
import ContactSection from '@/components/contact/ContactSection';
import BlogSection from '@/components/blog/BlogSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <GallerySection />
      <MaterialsSection />
      <BeforeAfterSection />
      <TestimonialsSection />
      <CostCalculator />
      <QuoteSection />
      <FAQSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
