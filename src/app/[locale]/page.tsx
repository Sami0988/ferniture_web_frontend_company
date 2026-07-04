'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import { motion } from 'framer-motion';

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      <HeroSection t={t} />
      <AboutSection t={t} />
      <ServicesSection t={t} />
      <ProductsSection t={t} />
      <GallerySection t={t} />
      <MaterialsSection t={t} />
      <BeforeAfterSection t={t} />
      <TestimonialsSection t={t} />
      <QuoteSection t={t} />
      <FAQSection t={t} />
      <ContactSection t={t} />
    </>
  );
}

function HeroSection({ t }: { t: any }) {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-graphite">
      <div className="absolute inset-0 z-0">
        <Image
          src="/image/PXL_20250920_145418581.jpg"
          alt="Kassahun workshop interior"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        <p className="text-gold text-sm tracking-[0.3em] uppercase mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {t('hero.companyLabel')}
        </p>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {t('hero.titleLine1')}{' '}
          <span className="text-gold">{t('hero.titleLine2')}</span>
        </h1>
        <p className="text-lg md:text-xl text-aluminum-200 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <a href="#products" className="px-8 py-4 bg-gold hover:bg-gold-600 text-white font-medium tracking-wider uppercase text-sm rounded transition-all duration-300 hover:shadow-lg hover:shadow-gold/20">
            {t('hero.cta1')} →
          </a>
          <a href="#gallery" className="px-8 py-4 border-2 border-white hover:bg-white hover:text-graphite text-white font-medium tracking-wider uppercase text-sm rounded transition-all duration-300">
            {t('hero.cta2')}
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutSection({ t }: { t: any }) {
  return (
    <section id="about" className="section-padding bg-ivory dark:bg-graphite-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-gold z-10" />
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src="/image/PXL_20240827_133457583.jpg"
                alt="Craftsman working on wood"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-walnut text-white px-6 py-4 text-center">
              <div className="font-heading text-3xl font-bold">12</div>
              <div className="text-xs uppercase tracking-wider text-aluminum-300">Years of<br/>Craft</div>
            </div>
          </div>

          {/* Content side */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold" />
              <p className="text-gold text-xs uppercase tracking-[0.2em] font-medium">{t('about.label')}</p>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-graphite dark:text-white mb-6 leading-tight">
              {t('about.title')}
            </h2>
            <p className="text-graphite-500 dark:text-aluminum-300 leading-relaxed mb-6">
              {t('about.description1')}
            </p>
            <p className="text-graphite-500 dark:text-aluminum-300 leading-relaxed mb-8">
              {t('about.description2')}
            </p>
            <div className="border-t border-aluminum-200 dark:border-graphite-600 pt-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: t('about.stat1Number'), label: t('about.stat1Label') },
                  { number: t('about.stat2Number'), label: t('about.stat2Label') },
                  { number: t('about.stat3Number'), label: t('about.stat3Label') },
                  { number: t('about.stat4Number'), label: t('about.stat4Label') },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-heading text-3xl font-bold text-walnut">{stat.number}</div>
                    <div className="text-xs uppercase tracking-wider text-graphite-400 dark:text-aluminum-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ t }: { t: any }) {
  const services = [
    { key: 'furniture', image: '/image/PXL_20241012_101314116.jpg', color: 'walnut' },
    { key: 'aluminum', image: '/image/PXL_20241012_102026855.jpg', color: 'aluminum' },
    { key: 'interior', image: '/image/PXL_20241105_082347356.MP.jpg', color: 'gold' },
  ];
  return (
    <section id="services" className="section-padding bg-graphite dark:bg-graphite-950">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <p className="service-pillar-label text-gold mb-4">{t('services.label')}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">{t('services.title')}</h2>
            <p className="text-aluminum-400 max-w-2xl mx-auto">{t('services.subtitle')}</p>
          </div>
        </Reveal>
        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <StaggerItem key={s.key}>
              <div className="group relative rounded-2xl bg-graphite-800 dark:bg-graphite-800/50 border border-graphite-600 dark:border-graphite-700 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 h-full overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <Image src={s.image} alt={t(`services.${s.key}.title`)} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite-800 via-transparent to-transparent" />
                </div>
                <div className="p-8">
                  <p className={`service-pillar-label text-${s.color} mb-3`}>{t(`services.${s.key}.label`)}</p>
                  <h3 className="font-heading text-2xl text-white mb-4">{t(`services.${s.key}.title`)}</h3>
                  <p className="text-aluminum-400 text-sm leading-relaxed mb-6">{t(`services.${s.key}.description`)}</p>
                  <ul className="space-y-2 mb-8">
                    {t.raw(`services.${s.key}.features`).map((f: string) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-aluminum-300">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${s.color}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#gallery" className="text-gold font-medium text-sm hover:underline">{t(`services.${s.key}.link`)}</a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function ProductsSection({ t }: { t: any }) {
  const categories = t.raw('products.categories');
  const products = [
    { id: 1, nameKey: 'Walnut Dining Table', category: 'Furniture', material: 'Wood', price: '$$$', image: '/image/PXL_20241219_104255306.jpg' },
    { id: 2, nameKey: 'Aluminum Sliding Window', category: 'Aluminum', material: 'Aluminum', price: '$$', image: '/image/PXL_20250426_180358812.jpg' },
    { id: 3, nameKey: 'Modern Living Room Set', category: 'Interior', material: 'Mixed', price: '$$$$', image: '/image/PXL_20250621_125518743.jpg' },
    { id: 4, nameKey: 'Glass Railing System', category: 'Aluminum', material: 'Aluminum/Glass', price: '$$$', image: '/image/PXL_20250910_162533336.jpg' },
    { id: 5, nameKey: 'Custom Kitchen Cabinets', category: 'Furniture', material: 'Wood', price: '$$$$', image: '/image/PXL_20250920_142225099.jpg' },
    { id: 6, nameKey: 'Office Partition Walls', category: 'Aluminum', material: 'Aluminum', price: '$$', image: '/image/PXL_20250920_142238079.jpg' },
    { id: 7, nameKey: 'Executive Desk', category: 'Furniture', material: 'Wood', price: '$$$', image: '/image/PXL_20250920_142255582.jpg' },
    { id: 8, nameKey: 'Bedroom Wardrobe', category: 'Furniture', material: 'Wood', price: '$$$', image: '/image/PXL_20250920_142302869.jpg' },
  ];
  return (
    <section id="products" className="section-padding bg-ivory dark:bg-graphite-900">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="service-pillar-label text-walnut mb-4">{t('products.label')}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-graphite dark:text-white mb-4">{t('products.title')}</h2>
          </div>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((c: string) => (
            <button key={c} className="filter-chip dark:border-graphite-600 dark:text-aluminum-300 dark:hover:border-gold dark:hover:text-gold">{c}</button>
          ))}
        </div>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <StaggerItem key={p.id}>
              <div className="group bg-white dark:bg-graphite-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-square relative overflow-hidden">
                  <Image src={p.image} alt={p.nameKey} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <p className="service-pillar-label text-aluminum-500 text-[10px] mb-1">{p.category}</p>
                  <h4 className="font-heading text-lg text-graphite dark:text-white mb-1">{p.nameKey}</h4>
                  <p className="text-sm text-graphite-400 dark:text-aluminum-400">{p.material} · {p.price}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function GallerySection({ t }: { t: any }) {
  const filters = t.raw('gallery.filters');
  const projects = [
    { id: 1, title: t('gallery.projects.0.title'), division: t('gallery.projects.0.division'), aspect: 'tall', image: '/image/PXL_20250920_142303050.jpg' },
    { id: 2, title: t('gallery.projects.1.title'), division: t('gallery.projects.1.division'), aspect: 'wide', image: '/image/PXL_20250920_145418581.jpg' },
    { id: 3, title: t('gallery.projects.2.title'), division: t('gallery.projects.2.division'), aspect: 'square', image: '/image/IMG_3185.JPG' },
    { id: 4, title: t('gallery.projects.3.title'), division: t('gallery.projects.3.division'), aspect: 'tall', image: '/image/IMG_3186.JPG' },
    { id: 5, title: t('gallery.projects.4.title'), division: t('gallery.projects.4.division'), aspect: 'wide', image: '/image/IMG_3199.JPG' },
    { id: 6, title: t('gallery.projects.5.title'), division: t('gallery.projects.5.division'), aspect: 'square', image: '/image/PXL_20241012_101314116%20(1).jpg' },
  ];
  return (
    <section id="gallery" className="section-padding bg-ivory-200 dark:bg-graphite-800">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="service-pillar-label text-walnut mb-4">{t('gallery.label')}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-graphite dark:text-white mb-4">{t('gallery.title')}</h2>
          </div>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((f: string) => (
            <button key={f} className="filter-chip dark:border-graphite-600 dark:text-aluminum-300 dark:hover:border-gold dark:hover:text-gold">{f}</button>
          ))}
        </div>
        <StaggerContainer className="masonry-grid">
          {projects.map((p) => (
            <StaggerItem key={p.id}>
              <div className="group relative rounded-xl overflow-hidden bg-white dark:bg-graphite-700 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className={`${p.aspect === 'tall' ? 'aspect-[3/4]' : p.aspect === 'wide' ? 'aspect-[4/3]' : 'aspect-square'} relative overflow-hidden`}>
                  <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-graphite/0 group-hover:bg-graphite/40 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center text-white">
                      <p className="text-sm uppercase tracking-wider mb-1">{p.division}</p>
                      <p className="font-heading text-xl">{p.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function MaterialsSection({ t }: { t: any }) {
  const materials = [
    { nameKey: 'Walnut', typeKey: 'Wood', image: '/image/PXL_20241012_101314116.jpg' },
    { nameKey: 'Oak', typeKey: 'Wood', image: '/image/PXL_20241012_101314116%20(1).jpg' },
    { nameKey: 'Mahogany', typeKey: 'Wood', image: '/image/PXL_20241012_102026855.jpg' },
    { nameKey: 'Teak', typeKey: 'Wood', image: '/image/PXL_20241012_103243005.jpg' },
    { nameKey: 'Brushed Silver', typeKey: 'Aluminum', image: '/image/PXL_20250426_180358812.jpg' },
    { nameKey: 'Matte Black', typeKey: 'Aluminum', image: '/image/PXL_20250920_142238079.jpg' },
    { nameKey: 'Champagne Gold', typeKey: 'Aluminum', image: '/image/PXL_20250920_142255582.jpg' },
    { nameKey: 'Bronze', typeKey: 'Aluminum', image: '/image/PXL_20250920_142302869.jpg' },
  ];
  return (
    <section id="materials" className="section-padding bg-ivory dark:bg-graphite-900">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="service-pillar-label text-walnut mb-4">{t('materials.label')}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-graphite dark:text-white mb-4">{t('materials.title')}</h2>
            <p className="text-graphite-400 dark:text-aluminum-400 max-w-xl mx-auto">{t('materials.subtitle')}</p>
          </div>
        </Reveal>
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {materials.map((m) => (
            <StaggerItem key={m.nameKey}>
              <div className="material-swatch aspect-square relative group">
                <Image src={m.image} alt={m.nameKey} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm uppercase tracking-wider opacity-80">{m.typeKey}</p>
                  <p className="font-heading text-lg">{m.nameKey}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function BeforeAfterSection({ t }: { t: any }) {
  return (
    <section className="section-padding bg-graphite dark:bg-graphite-950">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="service-pillar-label text-gold mb-4">{t('beforeAfter.label')}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">{t('beforeAfter.title')}</h2>
          </div>
        </Reveal>
        <Reveal>
          <div className="relative max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden grid grid-cols-2">
            <div className="relative overflow-hidden">
              <Image src="/image/PXL_20241012_103243005.jpg" alt="Room before renovation" fill className="object-cover" />
              <div className="absolute top-4 left-4 bg-graphite/70 px-3 py-1 rounded text-white text-sm z-10">{t('beforeAfter.before')}</div>
            </div>
            <div className="relative overflow-hidden border-l-2 border-gold">
              <Image src="/image/PXL_20250920_142303050.jpg" alt="Room after renovation" fill className="object-cover" />
              <div className="absolute top-4 right-4 bg-gold/90 px-3 py-1 rounded text-white text-sm z-10">{t('beforeAfter.after')}</div>
            </div>
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gold cursor-ew-resize z-10 flex items-center justify-center -translate-x-1/2">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-lg">
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

function TestimonialsSection({ t }: { t: any }) {
  const testimonials = [
    { text: t('testimonials.items.0.text'), name: t('testimonials.items.0.name'), role: t('testimonials.items.0.role'), location: t('testimonials.items.0.location') },
    { text: t('testimonials.items.1.text'), name: t('testimonials.items.1.name'), role: t('testimonials.items.1.role'), location: t('testimonials.items.1.location') },
    { text: t('testimonials.items.2.text'), name: t('testimonials.items.2.name'), role: t('testimonials.items.2.role'), location: t('testimonials.items.2.location') },
  ];
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="section-padding bg-ivory dark:bg-graphite-900">
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-10 h-px bg-gold mx-auto mb-4" />
        <p className="text-gold text-xs uppercase tracking-[0.25em] font-medium mb-6">{t('testimonials.label')}</p>
        <div className="flex gap-1 justify-center mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-gold text-xl">★</span>
          ))}
        </div>

        <div className="relative min-h-[280px] md:min-h-[220px]">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                i === active ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl text-graphite dark:text-white leading-relaxed mb-10 italic">
                &ldquo;{item.text}&rdquo;
              </blockquote>
              <div className="mb-2">
                <p className="font-heading text-lg text-graphite dark:text-white">{item.name}</p>
                <p className="text-sm text-graphite-400 dark:text-aluminum-400">{item.role}, {item.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === active ? 'bg-gold scale-110' : 'bg-aluminum-300 dark:bg-graphite-600 hover:bg-aluminum-400'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>

        <div className="w-10 h-px bg-gold mx-auto mt-8" />
      </div>
    </section>
  );
}

function QuoteSection({ t }: { t: any }) {
  return (
    <section id="quote" className="section-padding bg-walnut dark:bg-walnut-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Image src="/image/PXL_20240827_133457583.jpg" alt="" fill className="object-cover" />
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <Reveal>
          <div className="text-center mb-12">
            <p className="service-pillar-label text-gold mb-4">{t('quote.label')}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">{t('quote.title')}</h2>
            <p className="text-aluminum-200 max-w-xl mx-auto">{t('quote.subtitle')}</p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <form className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <input type="text" placeholder={t('quote.namePlaceholder')} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-gold transition-colors" />
              <input type="email" placeholder={t('quote.emailPlaceholder')} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-gold transition-colors" />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <input type="tel" placeholder={t('quote.phonePlaceholder')} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-gold transition-colors" />
              <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white/70 focus:outline-none focus:border-gold transition-colors">
                <option value="">{t('quote.serviceLabel')}</option>
                <option value="furniture">{t('quote.serviceOptions.furniture')}</option>
                <option value="aluminum">{t('quote.serviceOptions.aluminum')}</option>
                <option value="interior">{t('quote.serviceOptions.interior')}</option>
                <option value="consulting">{t('quote.serviceOptions.consulting')}</option>
              </select>
            </div>
            <textarea rows={4} placeholder={t('quote.projectPlaceholder')} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-gold transition-colors resize-none" />
            <button type="submit" className="w-full py-4 bg-gold hover:bg-gold-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold/20">{t('quote.submit')}</button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function FAQSection({ t }: { t: any }) {
  const faqs = t.raw('faq.items');
  return (
    <section id="faq" className="section-padding bg-ivory-200 dark:bg-graphite-800">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="service-pillar-label text-walnut mb-4">{t('faq.label')}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-graphite dark:text-white mb-4">{t('faq.title')}</h2>
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

function ContactSection({ t }: { t: any }) {
  return (
    <section id="contact" className="section-padding bg-ivory dark:bg-graphite-900">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="service-pillar-label text-walnut mb-4">{t('contact.label')}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-graphite dark:text-white mb-4">{t('contact.title')}</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-12">
          <Reveal direction="left">
            <div className="space-y-8">
              <div>
                <h4 className="font-heading text-xl text-graphite dark:text-white mb-2">{t('contact.visitUs')}</h4>
                <p className="text-graphite-400 dark:text-aluminum-400">{t('contact.address')}</p>
              </div>
              <div>
                <h4 className="font-heading text-xl text-graphite dark:text-white mb-2">{t('contact.callUs')}</h4>
                <p className="text-graphite-400 dark:text-aluminum-400">{t('contact.phone')}</p>
              </div>
              <div>
                <h4 className="font-heading text-xl text-graphite dark:text-white mb-2">{t('contact.emailUs')}</h4>
                <p className="text-graphite-400 dark:text-aluminum-400">{t('contact.email')}</p>
              </div>
              <div>
                <h4 className="font-heading text-xl text-graphite dark:text-white mb-2">{t('contact.workingHours')}</h4>
                <p className="text-graphite-400 dark:text-aluminum-400">{t('contact.hours')}</p>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden relative">
                <Image src="/image/PXL_20250621_125518743.jpg" alt="Map location" fill className="object-cover" />
              </div>
            </div>
          </Reveal>
          <Reveal direction="right">
            <form className="bg-white dark:bg-graphite-800 p-8 rounded-2xl shadow-sm space-y-6">
              <input type="text" placeholder={t('contact.namePlaceholder')} className="w-full px-4 py-3 border border-aluminum-200 dark:border-graphite-600 dark:bg-graphite-700 dark:text-white rounded-lg focus:outline-none focus:border-gold transition-colors" />
              <input type="email" placeholder={t('contact.emailPlaceholder')} className="w-full px-4 py-3 border border-aluminum-200 dark:border-graphite-600 dark:bg-graphite-700 dark:text-white rounded-lg focus:outline-none focus:border-gold transition-colors" />
              <input type="text" placeholder={t('contact.subjectPlaceholder')} className="w-full px-4 py-3 border border-aluminum-200 dark:border-graphite-600 dark:bg-graphite-700 dark:text-white rounded-lg focus:outline-none focus:border-gold transition-colors" />
              <textarea rows={4} placeholder={t('contact.messagePlaceholder')} className="w-full px-4 py-3 border border-aluminum-200 dark:border-graphite-600 dark:bg-graphite-700 dark:text-white rounded-lg focus:outline-none focus:border-gold transition-colors resize-none" />
              <button type="submit" className="w-full py-4 bg-walnut hover:bg-walnut-600 text-white font-medium rounded-lg transition-all duration-300">{t('contact.submit')}</button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
