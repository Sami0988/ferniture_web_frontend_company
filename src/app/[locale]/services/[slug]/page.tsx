'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
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

const validSlugs = ['furniture', 'aluminum', 'interior'];

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('services');
  const slug = params.slug as string;

  if (!validSlugs.includes(slug)) {
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

  const serviceData = services.find((s) => s.key === slug);
  const features = t.raw(`${slug}.features`);

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
            <p className={`service-pillar-label ${colorMap[serviceData?.color || 'walnut']} mb-4`}>{t(`${slug}.label`)}</p>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-graphite dark:text-white mb-6">{t(`${slug}.title`)}</h1>
            <p className="text-graphite-400 dark:text-aluminum-400 text-lg leading-relaxed mb-8">{t(`${slug}.description`)}</p>
          </div>
        </Reveal>

        {serviceData?.image && (
          <Reveal>
            <div className="relative aspect-video rounded-xl overflow-hidden mb-10">
              <Image
                src={serviceData.image}
                alt={t(`${slug}.title`)}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        )}

        <Reveal>
          <div className="bg-white dark:bg-graphite-800 rounded-xl p-8 mb-10">
            <h2 className="font-heading text-2xl font-bold text-graphite dark:text-white mb-6">What We Offer</h2>
            <ul className="space-y-4">
              {features.map((feature: string) => (
                <li key={feature} className="flex items-center gap-3 text-graphite dark:text-aluminum-300">
                  <div className={`w-2.5 h-2.5 rounded-full ${bgColorMap[serviceData?.color || 'walnut']}`} />
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <div className="bg-graphite dark:bg-graphite-800 rounded-xl p-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
            <p className="text-aluminum-400 mb-6">Tell us about your vision and we'll bring it to life.</p>
            <Link
              href="/#quote"
              className="inline-block px-8 py-3 bg-gold hover:bg-gold-600 text-white font-medium rounded-lg transition-colors"
            >
              {t(`${slug}.link`)}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
