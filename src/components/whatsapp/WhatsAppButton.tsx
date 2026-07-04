'use client';

import { useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const t = useTranslations('whatsapp');

  return (
    <a
      href="https://wa.me/251912345678"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 animate-pulse-slow transition-colors duration-200"
      title={t('title')}
    >
      <MessageCircle size={26} />
    </a>
  );
}
