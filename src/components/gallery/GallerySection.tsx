'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { useGetProjectsQuery } from '@/lib/api/galleryApi';

function getAspectClass(aspect: string): string {
  if (aspect === 'tall' || aspect === '9:16' || aspect === '3:4') return 'aspect-[3/4]';
  if (aspect === 'wide' || aspect === '16:9' || aspect === '4:3') return 'aspect-[4/3]';
  if (aspect === 'square' || aspect === '1:1') return 'aspect-square';
  if (aspect.includes(':')) {
    const [w, h] = aspect.split(':').map(Number);
    if (w && h) return `aspect-[${w}/${h}]`;
  }
  return 'aspect-[3/4]';
}

export default function GallerySection() {
  const t = useTranslations('gallery');
  const filters = t.raw('filters');
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const touchStartX = useRef(0);

  const divisionMap: Record<string, string> = {
    'All': '',
    'Wood': 'furniture',
    'Aluminum': 'aluminum',
    'Interior Design': 'interior_design',
    'ሁሉም': '',
    'ዕንጨይቅ': 'furniture',
    'አሉኒየም': 'aluminum',
    'ውጤታማ ዕቅድ': 'interior_design',
  };

  const divisionParam = divisionMap[activeFilter] || undefined;
  const { data, isLoading, error } = useGetProjectsQuery(divisionParam ? { division: divisionParam } : undefined);
  const projects = data?.data || [];

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToPrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! - 1 + projects.length) % projects.length);
    }
  }, [lightboxIndex, projects.length]);

  const goToNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % projects.length);
    }
  }, [lightboxIndex, projects.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
  }, [goToNext, goToPrev]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, goToPrev, goToNext]);

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
        {isLoading ? (
          <div className="masonry-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton aspect-[3/4] rounded-xl mb-4" />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-graphite-400 dark:text-aluminum-400 mt-8">No project is found</p>
        ) : (
          <StaggerContainer className="masonry-grid">
            {projects.map((p, index) => (
              <StaggerItem key={p.id}>
                <div
                  className="group relative rounded-xl overflow-hidden bg-white dark:bg-graphite-700 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${p.title}`}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                >
                  <div className={`${getAspectClass(p.aspect)} relative overflow-hidden bg-aluminum-100 dark:bg-graphite-700`}>
                    {imageErrors[p.id] ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ImageIcon className="text-aluminum-400 dark:text-aluminum-500" size={48} />
                      </div>
                    ) : (
                      <Image 
                        src={p.imageUrl} 
                        alt={p.title} 
                        fill 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => setImageErrors(prev => ({ ...prev, [p.id]: true }))}
                      />
                    )}
                    <div className="absolute inset-0 bg-graphite/0 group-hover:bg-graphite/40 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center text-white">
                        <p className="text-sm uppercase tracking-wider mb-1">{p.division}</p>
                        <p className="font-heading text-xl">{p.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {lightboxIndex !== null && projects[lightboxIndex] && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-3 bg-black/40 hover:bg-black/60 rounded-full transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-black/40 hover:bg-black/60 rounded-full transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-black/40 hover:bg-black/60 rounded-full transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
            <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              {imageErrors[projects[lightboxIndex].id] ? (
                <div className="flex flex-col items-center justify-center text-white">
                  <ImageIcon size={64} className="mb-4 text-white/50" />
                  <p className="text-white/70">Image not available</p>
                </div>
              ) : (
                <Image
                  src={projects[lightboxIndex].imageUrl}
                  alt={projects[lightboxIndex].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-contain"
                  priority
                  onError={() => setImageErrors(prev => ({ ...prev, [projects[lightboxIndex].id]: true }))}
                />
              )}
              <div className="absolute bottom-6 left-0 right-0 text-center text-white z-10">
                <p className="font-heading text-xl mb-1">{projects[lightboxIndex].title}</p>
                <p className="text-sm text-white/80">{projects[lightboxIndex].division}</p>
                <p className="text-xs text-white/70 mt-2">{lightboxIndex + 1} / {projects.length}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
