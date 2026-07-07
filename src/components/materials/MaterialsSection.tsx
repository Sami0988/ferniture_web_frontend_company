'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';

const materials = [
  { nameKey: 'Walnut', typeKey: 'Wood', image: '/image/PXL_20241012_101314116.jpg' },
  { nameKey: 'Oak', typeKey: 'Wood', image: '/image/PXL_20241012_101314116%20(1).jpg' },
  { nameKey: 'Mahogany', typeKey: 'Wood', image: '/image/PXL_20241012_102026855.jpg' },
  { nameKey: 'Teak', typeKey: 'Wood', image: '/image/PXL_20241012_103243005.jpg' },
  { nameKey: 'Brushed Silver', typeKey: 'Aluminum', image: '/image/PXL_20250426_180358812.jpg' },
  { nameKey: 'Matte Black', typeKey: 'Aluminum', image: '/image/PXL_20250920_142238079.jpg' },
  { nameKey: 'Champagne Gold', typeKey: 'Aluminum', image: '/image/PXL_20250920_142255582.jpg' },
  { nameKey: 'Bronze', typeKey: 'Aluminum', image: '/image/PXL_20250920_142302869.jpg' },
];

export default function MaterialsSection() {
  const t = useTranslations('materials');

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
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {materials.map((m) => (
            <StaggerItem key={m.nameKey}>
              <div className="material-swatch aspect-square relative group">
                <Image src={m.image} alt={m.nameKey} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm uppercase tracking-wider opacity-80">{m.typeKey}</p>
                  <p className="font-heading text-lg">{m.nameKey}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
