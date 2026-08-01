'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import { services } from '@/lib/data/services';

const colorMap: Record<string, string> = {
  walnut: 'text-walnut',
  aluminum: 'text-aluminum',
  gold: 'text-gold',
};

const bgColorMap: Record<string, string> = {
  walnut: 'bg-walnut',
  aluminum: 'bg-aluminum',
  gold: 'bg-gold',
};

export default function ServicesPage() {
  const t = useTranslations('services');
  const router = useRouter();
  const pathname = usePathname();

  const handleQuoteClick = () => {
    router.push('/');
    setTimeout(() => {
      document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

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
          {services.map((s, index) => (
            <StaggerItem key={s.key}>
              <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:direction-rtl' : ''}`}>
                <div className={`relative aspect-video rounded-2xl overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <Image
                    src={s.image}
                    alt={t(`${s.key}.title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <p className={`service-pillar-label ${colorMap[s.color]} mb-3`}>{t(`${s.key}.label`)}</p>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-graphite dark:text-white mb-4">{t(`${s.key}.title`)}</h2>
                  <p className="text-graphite-400 dark:text-aluminum-400 leading-relaxed mb-6">{t(`${s.key}.description`)}</p>
                  <ul className="space-y-3 mb-8">
                    {t.raw(`${s.key}.features`).map((f: string) => (
                      <li key={f} className="flex items-center gap-3 text-graphite dark:text-aluminum-300">
                        <div className={`w-2 h-2 rounded-full ${bgColorMap[s.color]}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleQuoteClick}
                    className="inline-block px-6 py-3 bg-gold hover:bg-gold-600 text-white font-medium rounded-lg transition-colors"
                  >
                    {t(`${s.key}.link`)}
                  </button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
