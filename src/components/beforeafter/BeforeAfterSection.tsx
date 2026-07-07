'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';

export default function BeforeAfterSection() {
  const t = useTranslations('beforeAfter');
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  }, [updateSliderPosition]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
  }, [updateSliderPosition]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      updateSliderPosition(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      updateSliderPosition(e.touches[0].clientX);
    };

    const handleEnd = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, updateSliderPosition]);

  return (
    <section className="section-padding bg-graphite dark:bg-graphite-950">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="service-pillar-label text-gold mb-4">{t('label')}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h2>
          </div>
        </Reveal>
        <Reveal>
          <div
            ref={containerRef}
            className="before-after-container relative max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden cursor-ew-resize"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            role="slider"
            aria-label="Before and after comparison"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPos)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') setSliderPos((p) => Math.max(0, p - 2));
              if (e.key === 'ArrowRight') setSliderPos((p) => Math.min(100, p + 2));
            }}
          >
            <div className="absolute inset-0">
              <Image src="/image/PXL_20250920_142303050.jpg" alt="Room after renovation" fill className="object-cover" />
            </div>
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <Image src="/image/PXL_20241012_103243005.jpg" alt="Room before renovation" fill className="object-cover" />
            </div>
            <div className="absolute top-4 left-4 bg-graphite/70 px-3 py-1 rounded text-white text-sm z-10">{t('before')}</div>
            <div className="absolute top-4 right-4 bg-gold/90 px-3 py-1 rounded text-white text-sm z-10">{t('after')}</div>
            <div
              className="absolute top-0 bottom-0 w-1 bg-gold z-10 flex items-center justify-center"
              style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-lg pointer-events-none">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
