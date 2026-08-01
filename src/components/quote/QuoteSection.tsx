'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import MagneticButton from '@/components/ui/MagneticButton';
import useConfetti from '@/components/ui/useConfetti';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function QuoteSection() {
  const t = useTranslations('quote');
  const createConfetti = useConfetti();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    project: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.project.trim()) newErrors.project = 'Please describe your project';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const message = encodeURIComponent(
      `📋 *Quote Request*\n\n👤 Name: ${formData.name}\n📧 Email: ${formData.email}\n📞 Phone: ${formData.phone}\n🔧 Service: ${formData.service}\n\n📝 Project Details:\n${formData.project}`
    );
    window.open(`https://t.me/Kidussan27?text=${message}`, '_blank');

    setStatus('success');
    createConfetti();
    setFormData({ name: '', email: '', phone: '', service: '', project: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <section id="quote" className="section-padding bg-walnut dark:bg-walnut-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Image src="/image/PXL_20240827_133457583.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <Reveal>
          <div className="text-center mb-12">
            <p className="service-pillar-label text-gold mb-4">{t('label')}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h2>
            <p className="text-aluminum-200 max-w-xl mx-auto">{t('subtitle')}</p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6" noValidate>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('namePlaceholder')}
                  aria-label={t('namePlaceholder')}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-gold transition-colors ${errors.name ? 'border-red-400' : 'border-white/20'}`}
                />
                {errors.name && <p className="text-red-300 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('emailPlaceholder')}
                  aria-label={t('emailPlaceholder')}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-gold transition-colors ${errors.email ? 'border-red-400' : 'border-white/20'}`}
                />
                {errors.email && <p className="text-red-300 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</p>}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('phonePlaceholder')}
                  aria-label={t('phonePlaceholder')}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-gold transition-colors ${errors.phone ? 'border-red-400' : 'border-white/20'}`}
                />
                {errors.phone && <p className="text-red-300 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.phone}</p>}
              </div>
              <div>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  aria-label={t('serviceLabel')}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:border-gold transition-colors ${errors.service ? 'border-red-400 text-white/50' : 'border-white/20 text-white/70'}`}
                >
                  <option value="" className="bg-graphite text-white">{t('serviceLabel')}</option>
                  <option value="furniture" className="bg-graphite text-white">{t('serviceOptions.furniture')}</option>
                  <option value="aluminum" className="bg-graphite text-white">{t('serviceOptions.aluminum')}</option>
                  <option value="interior" className="bg-graphite text-white">{t('serviceOptions.interior')}</option>
                  <option value="consulting" className="bg-graphite text-white">{t('serviceOptions.consulting')}</option>
                </select>
                {errors.service && <p className="text-red-300 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.service}</p>}
              </div>
            </div>
            <div>
              <textarea
                name="project"
                value={formData.project}
                onChange={handleChange}
                rows={4}
                placeholder={t('projectPlaceholder')}
                aria-label={t('projectPlaceholder')}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-gold transition-colors resize-none ${errors.project ? 'border-red-400' : 'border-white/20'}`}
              />
              {errors.project && <p className="text-red-300 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.project}</p>}
            </div>
            <MagneticButton strength={0.15}>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 bg-gold hover:bg-gold-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  <>Sending...</>
                ) : status === 'success' ? (
                  <><CheckCircle size={18} /> Request Sent!</>
                ) : (
                  <><Send size={18} /> {t('submit')}</>
                )}
              </button>
            </MagneticButton>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
