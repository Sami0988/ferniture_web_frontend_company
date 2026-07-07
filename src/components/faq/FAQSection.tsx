'use client';

import { useTranslations } from 'next-intl';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';

export default function FAQSection() {
  const t = useTranslations('faq');
  const faqs = t.raw('items');

  return (
    <section id="faq" className="section-padding bg-ivory-200 dark:bg-graphite-800">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="service-pillar-label text-walnut mb-4">{t('label')}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-graphite dark:text-white mb-4">{t('title')}</h2>
          </div>
        </Reveal>
        <StaggerContainer className="space-y-4">
          {faqs.map((faq: any) => (
            <StaggerItem key={faq.question}>
              <details className="bg-white dark:bg-graphite-700 rounded-xl p-6 group cursor-pointer">
                <summary className="font-heading text-lg text-graphite dark:text-white font-medium list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-gold text-2xl group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <p className="text-graphite-400 dark:text-aluminum-400 mt-4 leading-relaxed">{faq.answer}</p>
              </details>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
