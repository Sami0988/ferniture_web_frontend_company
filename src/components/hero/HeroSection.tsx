'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import MagneticButton from '@/components/ui/MagneticButton';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function HeroSection() {
  const t = useTranslations('hero');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 50, damping: 20, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const yPos = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mouseX.set(xPos * 30);
    mouseY.set(yPos * 30);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-graphite"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Blurred background image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ x, y }}
      >
        <Image
          src="/image/PXL_20250920_145418581.jpg"
          alt="Kassahun workshop interior"
          fill
          className="object-cover scale-[1.15] blur-[2px]"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        <p className="text-gold text-sm tracking-[0.3em] uppercase mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {t('companyLabel')}
        </p>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {t('titleLine1')}{' '}
          <span className="text-gold">{t('titleLine2')}</span>
        </h1>
        <p className="text-lg md:text-xl text-aluminum-200 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          {t('subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <MagneticButton strength={0.2}>
            <a href="#products" className="px-8 py-4 bg-gold hover:bg-gold-600 text-white font-medium tracking-wider uppercase text-sm rounded transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 inline-block">
              {t('cta1')} →
            </a>
          </MagneticButton>
          <MagneticButton strength={0.2}>
            <a href="#gallery" className="px-8 py-4 border-2 border-white hover:bg-white hover:text-graphite text-white font-medium tracking-wider uppercase text-sm rounded transition-all duration-300 inline-block">
              {t('cta2')}
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
