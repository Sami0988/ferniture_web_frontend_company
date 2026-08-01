'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import { useGetMaterialsQuery } from '@/lib/api/materialsApi';
import { ImageIcon } from 'lucide-react';

export default function MaterialsSection() {
  const t = useTranslations('materials');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const { data: materials, isLoading, error } = useGetMaterialsQuery();

  return (
    <section id="materials" className="section-padding bg-ivory dark:bg-graphite-900">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="service-pillar-label text-walnut mb-4">{t('label')}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-graphite dark:text-white mb-4">{t('title')}</h2>
            <p className="text-graphite-400 dark:text-aluminum-400 max-w-xl mx-auto">{t('subtitle')}</p>
          </div>
        </Reveal>
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton aspect-square rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-graphite-400 dark:text-aluminum-400 mt-8">No materials found</p>
        ) : (
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {materials?.map((m) => (
              <StaggerItem key={m.id}>
                <div className="material-swatch aspect-square relative group bg-aluminum-100 dark:bg-graphite-700">
                  {!m.image || imageErrors[m.id] ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="text-aluminum-400 dark:text-aluminum-500" size={48} />
                    </div>
                  ) : (
                    <Image 
                      src={m.image} 
                      alt={m.name} 
                      fill 
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" 
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={() => setImageErrors(prev => ({ ...prev, [m.id]: true }))}
                    />
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm uppercase tracking-wider opacity-80">{m.type}</p>
                    <p className="font-heading text-lg">{m.name}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
