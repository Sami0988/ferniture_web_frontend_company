'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetTestimonialsQuery } from '@/lib/api/baseApi';

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const locale = useLocale();
  const { data: testimonials = [] } = useGetTestimonialsQuery(locale);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToPrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused || testimonials.length === 0) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="section-padding bg-ivory dark:bg-graphite-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-10 h-px bg-gold mx-auto mb-4" />
        <p className="text-gold text-xs uppercase tracking-[0.25em] font-medium mb-6">{t('label')}</p>

        <div className="relative min-h-[350px] md:min-h-[300px]">
          {testimonials.map((item: any, i: number) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                i === active ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
              aria-hidden={i !== active}
            >
              <div className="flex justify-center mb-6">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className={`text-xl ${j < Math.floor(Number(item.rating)) ? 'text-gold' : j < Number(item.rating) ? 'text-gold opacity-50' : 'text-aluminum-300 dark:text-graphite-600'}`} aria-hidden="true">★</span>
                ))}
              </div>
              <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl text-graphite dark:text-white leading-relaxed mb-8 italic">
                &ldquo;{item.reviewText}&rdquo;
              </blockquote>
              <div className="pb-4">
                <p className="font-heading text-lg text-graphite dark:text-white">{item.customerName}</p>
                {item.company && <p className="text-sm text-graphite-400 dark:text-aluminum-400">{item.company}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={goToPrev}
            className="p-2 rounded-full border border-aluminum-300 dark:border-graphite-600 text-graphite dark:text-aluminum-300 hover:border-gold hover:text-gold transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === active ? 'bg-gold scale-110' : 'bg-aluminum-300 dark:bg-graphite-600 hover:bg-aluminum-400'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === active ? 'true' : undefined}
              />
            ))}
          </div>
          <button
            onClick={goToNext}
            className="p-2 rounded-full border border-aluminum-300 dark:border-graphite-600 text-graphite dark:text-aluminum-300 hover:border-gold hover:text-gold transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="w-10 h-px bg-gold mx-auto mt-8" />
      </div>
    </section>
  );
}
