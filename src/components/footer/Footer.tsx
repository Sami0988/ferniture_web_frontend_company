'use client';

import { useTranslations } from 'next-intl';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-graphite text-aluminum-300">
      <div className="h-1 flex">
        <div className="w-1/2 bg-walnut" />
        <div className="w-1/2 bg-aluminum-400" />
      </div>

      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-heading text-2xl font-bold text-white">Kassahun</span>
                <div className="w-8 h-0.5 bg-gold" />
              </div>
              <p className="text-sm leading-relaxed mb-6">
                {t('description')}
              </p>
              <div className="flex gap-4">
                <a href="https://wa.me/251994437585" target="_blank" rel="noopener noreferrer" className="text-aluminum-400 hover:text-gold transition-colors text-sm">WhatsApp</a>
                <a href="https://t.me/251994437585" target="_blank" rel="noopener noreferrer" className="text-aluminum-400 hover:text-gold transition-colors text-sm">Telegram</a>
              </div>
            </div>

            <div>
              <h4 className="font-heading text-lg text-white mb-4">{t('servicesTitle')}</h4>
              <ul className="space-y-2 text-sm">
                {t.raw('services').map((s: string) => (
                  <li key={s}><a href="#services" className="hover:text-gold transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg text-white mb-4">{t('quickLinksTitle')}</h4>
              <ul className="space-y-2 text-sm">
                {t.raw('quickLinks').map((l: string, i: number) => {
                  const hrefs = ['#about', '#gallery', '#materials', '#faq'];
                  return (
                    <li key={l}><a href={hrefs[i] || '#'} className="hover:text-gold transition-colors">{l}</a></li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg text-white mb-4">{t('newsletterTitle')}</h4>
              <p className="text-sm mb-4">{t('newsletterText')}</p>
              <NewsletterForm />
            </div>
          </div>

          <div className="border-t border-graphite-600 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-aluminum-500">
              © {year} Kassahun Wood and Aluminum Work. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-aluminum-500">
              <a href="#" className="hover:text-gold transition-colors">{t('privacy')}</a>
              <a href="#" className="hover:text-gold transition-colors">{t('terms')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
