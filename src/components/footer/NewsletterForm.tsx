'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function NewsletterForm() {
  const t = useTranslations('footer');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const validate = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(''); }}
          placeholder={t('newsletterPlaceholder')}
          className={`flex-1 px-4 py-2 bg-graphite-700 border rounded-lg text-white placeholder-aluminum-500 text-sm focus:outline-none focus:border-gold transition-colors ${error ? 'border-red-400' : 'border-graphite-600'}`}
          aria-label="Email for newsletter"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-4 py-2 bg-gold hover:bg-gold-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          aria-label={status === 'success' ? 'Subscribed successfully' : undefined}
        >
          {status === 'sending' ? '...' : status === 'success' ? <><CheckCircle size={16} /> <span className="sr-only">Subscribed</span></> : t('newsletterButton')}
        </button>
      </div>
      {error && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={10} />{error}</p>}
      {status === 'success' && <p className="text-green-400 text-xs flex items-center gap-1"><CheckCircle size={10} />Subscribed successfully!</p>}
    </form>
  );
}
