'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/about/AboutSection';
import ServicesSection from '@/components/services/ServicesSection';

const ProductsSection = dynamic(() => import('@/components/products/ProductsSection'), { loading: () => <div className="section-padding"><div className="max-w-7xl mx-auto"><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{[1,2,3,4].map(i => <div key={i} className="skeleton h-80 rounded-xl" />)}</div></div></div> });
const GallerySection = dynamic(() => import('@/components/gallery/GallerySection'), { loading: () => <div className="section-padding"><div className="max-w-7xl mx-auto"><div className="masonry-grid">{[1,2,3,4,5,6].map(i => <div key={i} className="skeleton aspect-[3/4] rounded-xl mb-4" />)}</div></div></div> });
const MaterialsSection = dynamic(() => import('@/components/materials/MaterialsSection'), { loading: () => <div className="section-padding"><div className="max-w-7xl mx-auto"><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{[1,2,3,4,5,6].map(i => <div key={i} className="skeleton aspect-square rounded-lg" />)}</div></div></div> });
const BeforeAfterSection = dynamic(() => import('@/components/beforeafter/BeforeAfterSection'));
const TestimonialsSection = dynamic(() => import('@/components/testimonials/TestimonialsSection'));
const QuoteSection = dynamic(() => import('@/components/quote/QuoteSection'));
const FAQSection = dynamic(() => import('@/components/faq/FAQSection'));
const ContactSection = dynamic(() => import('@/components/contact/ContactSection'));
const BlogSection = dynamic(() => import('@/components/blog/BlogSection'));

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
      <QuoteSection />
      <FAQSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
