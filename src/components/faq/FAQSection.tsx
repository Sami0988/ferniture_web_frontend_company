'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';

export default function FAQSection() {
  const t = useTranslations('faq');
  const faqs = t.raw('items');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
          {faqs.map((faq: any, index: number) => (
            <StaggerItem key={faq.question}>
              <div className="bg-white dark:bg-graphite-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left font-heading text-lg text-graphite dark:text-white font-medium flex items-center justify-between hover:bg-aluminum-50 dark:hover:bg-graphite-600 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  {faq.question}
                  <span className={`text-gold text-2xl transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: openIndex === index ? '500px' : '0' }}
                >
                  <p className="px-6 pb-6 text-graphite-400 dark:text-aluminum-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
