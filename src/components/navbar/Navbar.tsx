'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('darkMode', String(next));
  };

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  };

  const navLinks = [
    { label: t('home'), href: '#' },
    { label: t('about'), href: '#about' },
    { label: t('services'), href: '#services' },
    { label: t('gallery'), href: '#gallery' },
    { label: t('materials'), href: '#materials' },
    { label: t('blog'), href: '#blog' },
    { label: t('contact'), href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ivory/95 dark:bg-graphite-900/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className={`font-heading text-xl font-bold ${scrolled ? 'text-graphite dark:text-white' : 'text-white'} transition-colors duration-300`}>
            Kassahun
          </div>
          <div className="w-8 h-0.5 bg-gold transition-colors duration-300" />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 hover:text-gold ${
                scrolled ? 'text-graphite dark:text-aluminum-200' : 'text-white/90'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language Dropdown */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                scrolled ? 'text-graphite dark:text-aluminum-200 hover:bg-aluminum-100 dark:hover:bg-graphite-700' : 'text-white/80 hover:bg-white/10'
              }`}
              title="Select Language"
            >
              <Globe size={18} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-graphite-800 rounded-xl shadow-xl border border-aluminum-100 dark:border-graphite-700 overflow-hidden z-50">
                <button
                  onClick={() => switchLocale('en')}
                  className={`w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-3 transition-colors ${
                    locale === 'en'
                      ? 'bg-gold/10 text-gold'
                      : 'text-graphite dark:text-aluminum-200 hover:bg-aluminum-50 dark:hover:bg-graphite-700'
                  }`}
                >
                  <span className="text-lg">🇬🇧</span>
                  <span>English</span>
                  {locale === 'en' && <span className="ml-auto text-gold">✓</span>}
                </button>
                <button
                  onClick={() => switchLocale('am')}
                  className={`w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-3 transition-colors ${
                    locale === 'am'
                      ? 'bg-gold/10 text-gold'
                      : 'text-graphite dark:text-aluminum-200 hover:bg-aluminum-50 dark:hover:bg-graphite-700'
                  }`}
                >
                  <span className="text-lg">🇪🇹</span>
                  <span>አማርኛ</span>
                  {locale === 'am' && <span className="ml-auto text-gold">✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* Dark/Light Toggle */}
          <button
            onClick={toggleDark}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              scrolled ? 'text-graphite dark:text-aluminum-200 hover:bg-aluminum-100 dark:hover:bg-graphite-700' : 'text-white/80 hover:bg-white/10'
            }`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a
            href="#quote"
            className={`hidden sm:inline-flex px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              scrolled
                ? 'bg-gold text-white hover:bg-gold-600'
                : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
            }`}
          >
            {t('getQuote')}
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
              scrolled ? 'text-graphite dark:text-white' : 'text-white'
            }`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-ivory/98 dark:bg-graphite-900/98 backdrop-blur-md border-t border-aluminum-100 dark:border-graphite-700">
          <nav className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-graphite dark:text-aluminum-200 hover:text-gold font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile Language Selector */}
            <div className="pt-4 border-t border-aluminum-100 dark:border-graphite-700">
              <p className="text-xs text-graphite-400 dark:text-aluminum-500 uppercase tracking-wider mb-3">Language</p>
              <div className="flex gap-3">
                <button
                  onClick={() => { switchLocale('en'); setMobileOpen(false); }}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    locale === 'en'
                      ? 'bg-gold text-white'
                      : 'bg-aluminum-100 dark:bg-graphite-700 text-graphite dark:text-aluminum-200'
                  }`}
                >
                  🇬🇧 English
                </button>
                <button
                  onClick={() => { switchLocale('am'); setMobileOpen(false); }}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    locale === 'am'
                      ? 'bg-gold text-white'
                      : 'bg-aluminum-100 dark:bg-graphite-700 text-graphite dark:text-aluminum-200'
                  }`}
                >
                  🇪🇹 አማርኛ
                </button>
              </div>
            </div>

            {/* Mobile Theme Toggle */}
            <div className="flex items-center justify-between pt-4 border-t border-aluminum-100 dark:border-graphite-700">
              <span className="text-sm text-graphite dark:text-aluminum-200">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
              <button
                onClick={toggleDark}
                className="p-2 rounded-lg bg-aluminum-100 dark:bg-graphite-700 text-graphite dark:text-aluminum-200"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            <a
              href="#quote"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center py-3 bg-gold text-white rounded-lg font-medium"
            >
              {t('getQuote')}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
