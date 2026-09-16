'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import { useGetServicesQuery } from '@/lib/api/baseApi';

const fallbackImages: Record<string, string> = {
  FURNITURE: '/image/PXL_20241012_101314116.jpg',
  CUSTOM: '/image/PXL_20241012_101314116.jpg',
  ALUMINUM: '/image/PXL_20241012_102026855.jpg',
  INTERIOR: '/image/PXL_20241219_104255306.jpg',
  GENERAL: '/image/PXL_20241012_101314116.jpg',
};

const colorMap: Record<string, string> = {
  CUSTOM: 'text-walnut',
  FURNITURE: 'text-walnut',
  ALUMINUM: 'text-aluminum',
  INTERIOR: 'text-gold',
  GENERAL: 'text-gold',
};

const bgColorMap: Record<string, string> = {
  CUSTOM: 'bg-walnut',
  FURNITURE: 'bg-walnut',
  ALUMINUM: 'bg-aluminum',
  INTERIOR: 'bg-gold',
  GENERAL: 'bg-gold',
};

export default function ServicesPage() {
  const t = useTranslations('services');
  const locale = useLocale();
  const router = useRouter();
  const { data: services = [], isLoading } = useGetServicesQuery(locale);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  if (isLoading) {
    return (
      <section className="section-padding bg-ivory dark:bg-graphite-900">
        <div className="max-w-7xl mx-auto">
          <div className="skeleton h-8 w-40 mb-4 mx-auto" />
          <div className="skeleton h-12 w-3/4 mb-2 mx-auto" />
          <div className="skeleton h-6 w-1/2 mb-16 mx-auto" />
          {[1, 2, 3].map((i) => (
            <div key={i} className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 0 ? '' : ''}`}>
              <div className="skeleton aspect-video rounded-2xl" />
              <div className="space-y-4">
                <div className="skeleton h-4 w-20" />
                <div className="skeleton h-10 w-3/4" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-ivory dark:bg-graphite-900">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-8">
            <button
              onClick={() => router.push('/')}
              className="text-walnut hover:text-walnut-600 font-medium flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>
          </div>
        </Reveal>
        <Reveal>
          <div className="text-center mb-16">
            <p className="service-pillar-label text-walnut mb-4">{t('label')}</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-graphite dark:text-white mb-4">{t('title')}</h1>
            <p className="text-graphite-400 dark:text-aluminum-400 max-w-2xl mx-auto">{t('subtitle')}</p>
          </div>
        </Reveal>
        <StaggerContainer className="space-y-16">
          {services.map((s: any, index: number) => {
            const category = s.category?.toUpperCase() || 'GENERAL';
            const imageSrc = imgErrors[s.id]
              ? (fallbackImages[category] || '/image/PXL_20241012_101314116.jpg')
              : (s.coverImage || fallbackImages[category] || '/image/PXL_20241012_101314116.jpg');

            return (
              <StaggerItem key={s.id}>
                <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:direction-rtl' : ''}`}>
                  <div className={`relative aspect-video rounded-2xl overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <Image
                      src={imageSrc}
                      alt={s.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      onError={() => handleImageError(s.id)}
                    />
                  </div>
                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    <p className={`service-pillar-label ${colorMap[category] || 'text-gold'} mb-3`}>{s.category}</p>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-graphite dark:text-white mb-4">{s.title}</h2>
                    <p className="text-graphite-400 dark:text-aluminum-400 leading-relaxed mb-6 line-clamp-3">{s.description}</p>
                    {Array.isArray(s.bulletPoints) && s.bulletPoints.length > 0 && (
                      <ul className="space-y-3 mb-8 line-clamp-3">
                        {s.bulletPoints.map((f: string) => (
                          <li key={f} className="flex items-center gap-3 text-graphite dark:text-aluminum-300">
                            <div className={`w-2 h-2 rounded-full ${bgColorMap[category] || 'bg-gold'}`} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link
                      href={`/services/${s.slug}`}
                      className="inline-block px-6 py-3 bg-gold hover:bg-gold-600 text-white font-medium rounded-lg transition-colors"
                    >
                      {t('furniture.link')}
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
