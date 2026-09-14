'use client';

import { useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useGetTestimonialsQuery } from '@/lib/api/baseApi';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import { ArrowLeft, Star, Quote } from 'lucide-react';

export default function TestimonialsPage() {
  const router = useRouter();
  const locale = useLocale();
  const { data: testimonials = [], isLoading } = useGetTestimonialsQuery(locale);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(locale === 'am' ? 'am-ET' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <section className="section-padding bg-ivory dark:bg-graphite-900">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="mb-8">
            <button
              onClick={() => router.push('/')}
              className="text-walnut hover:text-walnut-600 font-medium flex items-center gap-2 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </div>
        </Reveal>
        <Reveal>
          <div className="text-center mb-12">
            <p className="service-pillar-label text-walnut mb-4">TESTIMONIALS</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-graphite dark:text-white mb-4">What Our Clients Say</h1>
            <p className="text-graphite-400 dark:text-aluminum-400 max-w-xl mx-auto">Real stories from customers who trusted us with their projects.</p>
          </div>
        </Reveal>

        {isLoading ? (
          <div className="text-center py-20 text-graphite-400">Loading...</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-20 text-graphite-400">No testimonials yet.</div>
        ) : (
          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {testimonials.map((item: any) => (
              <StaggerItem key={item.id}>
                <article className="bg-white dark:bg-graphite-800 rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <Quote size={32} className="text-gold/30 mb-4" />
                  <blockquote className="text-graphite dark:text-aluminum-200 leading-relaxed mb-6 flex-1 italic">
                    &ldquo;{item.reviewText}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={16}
                        className={j < Math.floor(Number(item.rating)) ? 'text-gold fill-gold' : j < Number(item.rating) ? 'text-gold fill-gold/50' : 'text-aluminum-300 dark:text-graphite-600'}
                      />
                    ))}
                    <span className="text-sm text-graphite-400 dark:text-aluminum-400 ml-2">{item.rating}</span>
                  </div>
                  <div className="border-t border-graphite-100 dark:border-graphite-700 pt-4">
                    <p className="font-heading font-semibold text-graphite dark:text-white">{item.customerName}</p>
                    {item.company && <p className="text-sm text-graphite-400 dark:text-aluminum-400">{item.company}</p>}
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
