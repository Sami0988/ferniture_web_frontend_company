'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  { id: 1, titleKey: 'projects.0.title', divisionKey: 'projects.0.division', aspect: 'tall', image: '/image/PXL_20250920_142303050.jpg' },
  { id: 2, titleKey: 'projects.1.title', divisionKey: 'projects.1.division', aspect: 'wide', image: '/image/PXL_20250920_145418581.jpg' },
  { id: 3, titleKey: 'projects.2.title', divisionKey: 'projects.2.division', aspect: 'square', image: '/image/IMG_3185.JPG' },
  { id: 4, titleKey: 'projects.3.title', divisionKey: 'projects.3.division', aspect: 'tall', image: '/image/IMG_3186.JPG' },
  { id: 5, titleKey: 'projects.4.title', divisionKey: 'projects.4.division', aspect: 'wide', image: '/image/IMG_3199.JPG' },
  { id: 6, titleKey: 'projects.5.title', divisionKey: 'projects.5.division', aspect: 'square', image: '/image/PXL_20241012_101314116%20(1).jpg' },
];

export default function GallerySection() {
  const t = useTranslations('gallery');
  const filters = t.raw('filters');
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const divisionMap: Record<string, string> = {
    'All': 'All',
    'Wood': 'Furniture',
    'Aluminum': 'Aluminum',
    'Interior Design': 'Interior',
    'ሁሉም': 'All',
    'ዕንጨይቅ': 'Furniture',
    'አሉኒየም': 'Aluminum',
    'ውጤታማ ዕቅድ': 'Interior',
  };

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => {
        const division = t(p.divisionKey);
        return division === divisionMap[activeFilter];
      });

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToPrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! - 1 + filteredProjects.length) % filteredProjects.length);
    }
  }, [lightboxIndex, filteredProjects.length]);

  const goToNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % filteredProjects.length);
    }
  }, [lightboxIndex, filteredProjects.length]);

  return (
    <section id="gallery" className="section-padding bg-ivory-200 dark:bg-graphite-800">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="service-pillar-label text-walnut mb-4">{t('label')}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-graphite dark:text-white mb-4">{t('title')}</h2>
          </div>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-3 mb-10" role="tablist" aria-label="Gallery categories">
          {filters.map((f: string) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`filter-chip dark:border-graphite-600 dark:text-aluminum-300 dark:hover:border-gold dark:hover:text-gold ${activeFilter === f ? 'active' : ''}`}
              role="tab"
              aria-selected={activeFilter === f}
            >
              {f}
            </button>
          ))}
        </div>
        <StaggerContainer className="masonry-grid">
          {filteredProjects.map((p, index) => (
            <StaggerItem key={p.id}>
              <div
                className="group relative rounded-xl overflow-hidden bg-white dark:bg-graphite-700 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                aria-label={`View ${t(p.titleKey)}`}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
              >
                <div className={`${p.aspect === 'tall' ? 'aspect-[3/4]' : p.aspect === 'wide' ? 'aspect-[4/3]' : 'aspect-square'} relative overflow-hidden`}>
                  <Image src={p.image} alt={t(p.titleKey)} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-graphite/0 group-hover:bg-graphite/40 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center text-white">
                      <p className="text-sm uppercase tracking-wider mb-1">{t(p.divisionKey)}</p>
                      <p className="font-heading text-xl">{t(p.titleKey)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
              aria-label="Close lightbox"
            >
              <X size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              className="absolute left-4 text-white/80 hover:text-white p-2"
              aria-label="Previous image"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 text-white/80 hover:text-white p-2"
              aria-label="Next image"
            >
              <ChevronRight size={40} />
            </button>
            <div className="relative max-w-5xl max-h-[85vh] w-full aspect-video" onClick={(e) => e.stopPropagation()}>
              <Image
                src={filteredProjects[lightboxIndex].image}
                alt={t(filteredProjects[lightboxIndex].titleKey)}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                <p className="font-heading text-xl">{t(filteredProjects[lightboxIndex].titleKey)}</p>
                <p className="text-sm text-white/60">{t(filteredProjects[lightboxIndex].divisionKey)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
