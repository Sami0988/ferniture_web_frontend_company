'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="section-padding bg-ivory dark:bg-graphite-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-gold z-10" />
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src="/image/PXL_20240827_133457583.jpg"
                alt="Craftsman working on wood"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-walnut text-white px-6 py-4 text-center">
              <AnimatedCounter target={12} className="font-heading text-3xl font-bold" />
              <div className="text-xs uppercase tracking-wider text-aluminum-300">Years of<br/>Craft</div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold" />
              <p className="text-gold text-xs uppercase tracking-[0.2em] font-medium">{t('label')}</p>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-graphite dark:text-white mb-6 leading-tight">
              {t('title')}
            </h2>
            <p className="text-graphite-500 dark:text-aluminum-300 leading-relaxed mb-6">
              {t('description1')}
            </p>
            <p className="text-graphite-500 dark:text-aluminum-300 leading-relaxed mb-8">
              {t('description2')}
            </p>
            <div className="border-t border-aluminum-200 dark:border-graphite-600 pt-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: 14, suffix: '+', label: t('stat1Label') },
                  { number: 500, suffix: '+', label: t('stat2Label') },
                  { number: 50, suffix: '+', label: t('stat3Label') },
                  { number: 4, suffix: '', label: t('stat4Label') },
                ].map((stat) => (
                  <div key={stat.label}>
                    <AnimatedCounter
                      target={stat.number}
                      suffix={stat.suffix}
                      className="font-heading text-3xl font-bold text-walnut"
                    />
                    <div className="text-xs uppercase tracking-wider text-graphite-400 dark:text-aluminum-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
