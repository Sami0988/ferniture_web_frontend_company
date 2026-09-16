'use client';

import { useRouter } from '@/i18n/navigation';
import ContactSection from '@/components/contact/ContactSection';
import { Reveal } from '@/components/ui/Reveal';

export default function ContactPage() {
  const router = useRouter();

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
      </div>
      <ContactSection />
    </section>
  );
}
