'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import { services } from '@/lib/data/services';

export default function ServicesSection() {
  const t = useTranslations('services');

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

  return (
    <section id="services" className="section-padding bg-graphite dark:bg-graphite-950">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <p className="service-pillar-label text-gold mb-4">{t('label')}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h2>
            <p className="text-aluminum-400 max-w-2xl mx-auto">{t('subtitle')}</p>
          </div>
        </Reveal>
        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <StaggerItem key={s.key}>
              <div className="group relative rounded-2xl bg-graphite-800 dark:bg-graphite-800/50 border border-graphite-600 dark:border-graphite-700 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 h-full overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <Image src={s.image} alt={t(`${s.key}.title`)} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite-800 via-transparent to-transparent" />
                </div>
                <div className="p-8">
                  <p className={`service-pillar-label ${colorMap[s.color]} mb-3`}>{t(`${s.key}.label`)}</p>
                  <h3 className="font-heading text-2xl text-white mb-4">{t(`${s.key}.title`)}</h3>
                  <p className="text-aluminum-400 text-sm leading-relaxed mb-6">{t(`${s.key}.description`)}</p>
                  <ul className="space-y-2 mb-8">
                    {t.raw(`${s.key}.features`).map((f: string) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-aluminum-300">
                        <div className={`w-1.5 h-1.5 rounded-full ${bgColorMap[s.color]}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/services" className="text-gold font-medium text-sm hover:underline">{t(`${s.key}.link`)}</Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
