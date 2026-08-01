'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import MagneticButton from '@/components/ui/MagneticButton';
import useConfetti from '@/components/ui/useConfetti';
import { Send, CheckCircle, AlertCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactSection() {
  const t = useTranslations('contact');
  const createConfetti = useConfetti();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const message = encodeURIComponent(
      `💬 *New Message*\n\n👤 Name: ${formData.name}\n📧 Email: ${formData.email}\n📌 Subject: ${formData.subject}\n\n📝 Message:\n${formData.message}`
    );
    window.open(`https://t.me/Kidussan27?text=${message}`, '_blank');

    setStatus('success');
    createConfetti();
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <section id="contact" className="section-padding bg-ivory dark:bg-graphite-900">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="service-pillar-label text-walnut mb-4">{t('label')}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-graphite dark:text-white mb-4">{t('title')}</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-12">
          <Reveal direction="left">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-walnut/10 rounded-lg">
                  <MapPin className="text-walnut" size={20} />
                </div>
                <div>
                  <h4 className="font-heading text-xl text-graphite dark:text-white mb-1">{t('visitUs')}</h4>
                  <p className="text-graphite-400 dark:text-aluminum-400">{t('address')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-walnut/10 rounded-lg">
                  <Phone className="text-walnut" size={20} />
                </div>
                <div>
                  <h4 className="font-heading text-xl text-graphite dark:text-white mb-1">{t('callUs')}</h4>
                  <a href={`tel:${t('phone').replace(/\s/g, '')}`} className="text-graphite-400 dark:text-aluminum-400 hover:text-walnut transition-colors">{t('phone')}</a>
                  <a href={`tel:${t('phone2').replace(/\s/g, '')}`} className="text-graphite-400 dark:text-aluminum-400 hover:text-walnut transition-colors">{t('phone2')}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-walnut/10 rounded-lg">
                  <Mail className="text-walnut" size={20} />
                </div>
                <div>
                  <h4 className="font-heading text-xl text-graphite dark:text-white mb-1">{t('emailUs')}</h4>
                  <a href={`mailto:${t('email')}`} className="text-graphite-400 dark:text-aluminum-400 hover:text-walnut transition-colors">{t('email')}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-walnut/10 rounded-lg">
                  <Clock className="text-walnut" size={20} />
                </div>
                <div>
                  <h4 className="font-heading text-xl text-graphite dark:text-white mb-1">{t('workingHours')}</h4>
                  <p className="text-graphite-400 dark:text-aluminum-400">{t('hours')}</p>
                </div>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.8314908!3d9.0429928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b91dbb77b66e1%3A0x1c6163279120df7f!2sKotebe%20St.%20Hana%20Mariam%20Church!5e0!3m2!1sen!2set!4v1"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kotebe Hanamaryam Church location on map"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>
          <Reveal direction="right">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-graphite-800 p-8 rounded-2xl shadow-sm space-y-6" noValidate>
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('namePlaceholder')}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-gold transition-colors dark:bg-graphite-700 dark:text-white ${errors.name ? 'border-red-400' : 'border-aluminum-200 dark:border-graphite-600'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('emailPlaceholder')}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-gold transition-colors dark:bg-graphite-700 dark:text-white ${errors.email ? 'border-red-400' : 'border-aluminum-200 dark:border-graphite-600'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('subjectPlaceholder')}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-gold transition-colors dark:bg-graphite-700 dark:text-white ${errors.subject ? 'border-red-400' : 'border-aluminum-200 dark:border-graphite-600'}`}
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.subject}</p>}
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t('messagePlaceholder')}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-gold transition-colors dark:bg-graphite-700 dark:text-white resize-none ${errors.message ? 'border-red-400' : 'border-aluminum-200 dark:border-graphite-600'}`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.message}</p>}
              </div>
              <MagneticButton strength={0.15}>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 bg-walnut hover:bg-walnut-600 text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'sending' ? (
                    <>Sending...</>
                  ) : status === 'success' ? (
                    <><CheckCircle size={18} /> Message Sent!</>
                  ) : (
                    <><Send size={18} /> {t('submit')}</>
                  )}
                </button>
              </MagneticButton>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
