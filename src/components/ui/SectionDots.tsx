'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'products', label: 'Products' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'materials', label: 'Materials' },
  { id: 'quote', label: 'Quote' },
  { id: 'faq', label: 'FAQ' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

export default function SectionDots() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="group flex items-center gap-3"
          aria-label={`Go to ${section.label}`}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-xs font-medium text-graphite dark:text-aluminum-300 whitespace-nowrap"
              >
                {section.label}
              </motion.span>
            )}
          </AnimatePresence>
          <div className="relative">
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-gold scale-125'
                  : 'bg-aluminum-400 dark:bg-graphite-600 group-hover:bg-gold/60'
              }`}
            />
            {activeSection === section.id && (
              <motion.div
                layoutId="activeSection"
                className="absolute inset-0 rounded-full bg-gold/30"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
