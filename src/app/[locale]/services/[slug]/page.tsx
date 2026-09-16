'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useGetServiceBySlugQuery } from '@/lib/api/baseApi';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';

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

const fallbackImages: Record<string, string> = {
  FURNITURE: '/image/PXL_20241012_101314116.jpg',
  CUSTOM: '/image/PXL_20241012_101314116.jpg',
  ALUMINUM: '/image/PXL_20241012_102026855.jpg',
  INTERIOR: '/image/PXL_20241219_104255306.jpg',
  GENERAL: '/image/PXL_20241012_101314116.jpg',
};

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const slug = params.slug as string;
  const { data: service, isLoading, error } = useGetServiceBySlugQuery({ slug, locale });
  const [imgError, setImgError] = useState(false);

  if (isLoading) {
    return (
      <section className="section-padding bg-ivory dark:bg-graphite-900">
        <div className="max-w-4xl mx-auto">
          <div className="skeleton h-8 w-40 mb-8" />
          <div className="skeleton h-12 w-3/4 mb-4" />
          <div className="skeleton h-6 w-full mb-2" />
          <div className="skeleton h-6 w-2/3 mb-8" />
          <div className="skeleton aspect-video rounded-xl mb-10" />
          <div className="skeleton h-64 rounded-xl" />
        </div>
      </section>
    );
  }

  if (error || !service) {
    return (
      <section className="section-padding bg-ivory dark:bg-graphite-900">
        <div className="max-w-4xl mx-auto text-center py-20">
          <p className="text-graphite-400 mb-4">Service not found.</p>
          <Link href="/services" className="text-gold font-medium flex items-center gap-1 justify-center hover:gap-2 transition-all">
            <ArrowLeft size={14} /> Back to Services
          </Link>
        </div>
      </section>
    );
  }

  const category = service.category?.toUpperCase() || 'GENERAL';
  const imageSrc = imgError
    ? (fallbackImages[category] || '/image/PXL_20241012_101314116.jpg')
    : (service.coverImage || fallbackImages[category] || '/image/PXL_20241012_101314116.jpg');

  return (
    <section className="section-padding bg-ivory dark:bg-graphite-900">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="mb-8">
            <button
              onClick={() => router.push('/services')}
              className="text-walnut hover:text-walnut-600 font-medium flex items-center gap-2 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Services
            </button>
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-10">
            <p className={`service-pillar-label ${colorMap[category] || 'text-gold'} mb-4`}>{service.category}</p>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-graphite dark:text-white mb-6">{service.title}</h1>
            <p className="text-graphite-400 dark:text-aluminum-400 text-lg leading-relaxed mb-8">{service.description}</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative aspect-video rounded-xl overflow-hidden mb-10">
            <Image
              src={imageSrc}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
              onError={() => setImgError(true)}
            />
          </div>
        </Reveal>

        {Array.isArray(service.bulletPoints) && service.bulletPoints.length > 0 && (
          <Reveal>
            <div className="bg-white dark:bg-graphite-800 rounded-xl p-8 mb-10">
              <h2 className="font-heading text-2xl font-bold text-graphite dark:text-white mb-6">What We Offer</h2>
              <ul className="space-y-4">
                {service.bulletPoints.map((feature: string) => (
                  <li key={feature} className="flex items-center gap-3 text-graphite dark:text-aluminum-300">
                    <div className={`w-2.5 h-2.5 rounded-full ${bgColorMap[category] || 'bg-gold'}`} />
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        <Reveal>
          <div className="bg-graphite dark:bg-graphite-800 rounded-xl p-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
            <p className="text-aluminum-400 mb-6">Tell us about your vision and we'll bring it to life.</p>
            <Link
              href="/#quote"
              className="inline-block px-8 py-3 bg-gold hover:bg-gold-600 text-white font-medium rounded-lg transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
