'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';

const products = [
  { id: 1, nameKey: 'Walnut Dining Table', category: 'Furniture', material: 'Wood', price: 'ETB 85,000', image: '/image/PXL_20241219_104255306.jpg' },
  { id: 2, nameKey: 'Aluminum Sliding Window', category: 'Aluminum', material: 'Aluminum', price: 'ETB 35,000', image: '/image/PXL_20250426_180358812.jpg' },
  { id: 3, nameKey: 'Modern Living Room Set', category: 'Interior', material: 'Mixed', price: 'ETB 150,000', image: '/image/PXL_20250621_125518743.jpg' },
  { id: 4, nameKey: 'Glass Railing System', category: 'Aluminum', material: 'Aluminum/Glass', price: 'ETB 95,000', image: '/image/PXL_20250910_162533336.jpg' },
  { id: 5, nameKey: 'Custom Kitchen Cabinets', category: 'Furniture', material: 'Wood', price: 'ETB 180,000', image: '/image/PXL_20250920_142225099.jpg' },
  { id: 6, nameKey: 'Office Partition Walls', category: 'Aluminum', material: 'Aluminum', price: 'ETB 45,000', image: '/image/PXL_20250920_142238079.jpg' },
  { id: 7, nameKey: 'Executive Desk', category: 'Furniture', material: 'Wood', price: 'ETB 75,000', image: '/image/PXL_20250920_142255582.jpg' },
  { id: 8, nameKey: 'Bedroom Wardrobe', category: 'Furniture', material: 'Wood', price: 'ETB 90,000', image: '/image/PXL_20250920_142302869.jpg' },
];

export default function ProductsSection() {
  const t = useTranslations('products');
  const categories = t.raw('categories');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProducts = activeFilter === 'All'
    ? products
    : products.filter((p) => p.category === activeFilter);

  return (
    <section id="products" className="section-padding bg-ivory dark:bg-graphite-900">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="service-pillar-label text-walnut mb-4">{t('label')}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-graphite dark:text-white mb-4">{t('title')}</h2>
          </div>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-3 mb-10" role="tablist" aria-label="Product categories">
          {categories.map((c: string) => (
            <button
              key={c}
              onClick={() => setActiveFilter(c)}
              className={`filter-chip dark:border-graphite-600 dark:text-aluminum-300 dark:hover:border-gold dark:hover:text-gold ${activeFilter === c ? 'active' : ''}`}
              role="tab"
              aria-selected={activeFilter === c}
            >
              {c}
            </button>
          ))}
        </div>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <StaggerItem key={p.id}>
              <TiltCard className="h-full">
                <div className="group bg-white dark:bg-graphite-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="aspect-square relative overflow-hidden">
                    <Image src={p.image} alt={p.nameKey} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <p className="service-pillar-label text-aluminum-500 text-[10px] mb-1">{p.category}</p>
                    <h4 className="font-heading text-lg text-graphite dark:text-white mb-1">{p.nameKey}</h4>
                    <p className="text-sm text-graphite-400 dark:text-aluminum-400">{p.material} · {p.price}</p>
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
        {filteredProducts.length === 0 && (
          <p className="text-center text-graphite-400 dark:text-aluminum-400 mt-8">No products found in this category.</p>
        )}
      </div>
    </section>
  );
}
