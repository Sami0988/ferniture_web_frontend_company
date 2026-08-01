'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';
import { useGetProductsQuery } from '@/lib/api/productsApi';
import { ImageIcon } from 'lucide-react';

export default function ProductsSection() {
  const t = useTranslations('products');
  const categories = t.raw('categories');
  const [activeFilter, setActiveFilter] = useState('All');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const { data: products = [], isLoading, error } = useGetProductsQuery();

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
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton h-80 rounded-xl" />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-graphite-400 dark:text-aluminum-400 mt-8">No products found</p>
        ) : (
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <StaggerItem key={p.id}>
                <TiltCard className="h-full">
                  <div className="group bg-white dark:bg-graphite-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="aspect-square relative overflow-hidden bg-aluminum-100 dark:bg-graphite-700">
                      {imageErrors[p.id] ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon className="text-aluminum-400 dark:text-aluminum-500" size={48} />
                        </div>
                      ) : (
                        <Image 
                          src={p.image} 
                          alt={p.name} 
                          fill 
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={() => setImageErrors(prev => ({ ...prev, [p.id]: true }))}
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <p className="service-pillar-label text-aluminum-500 text-[10px] mb-1">{p.category}</p>
                      <h3 className="font-heading text-lg text-graphite dark:text-white mb-1">{p.name}</h3>
                      <p className="text-sm text-graphite-400 dark:text-aluminum-400">{p.material} · ETB {p.price.toLocaleString()}</p>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
        {filteredProducts.length === 0 && (
          <p className="text-center text-graphite-400 dark:text-aluminum-400 mt-8">No products found in this category.</p>
        )}
      </div>
    </section>
  );
}
