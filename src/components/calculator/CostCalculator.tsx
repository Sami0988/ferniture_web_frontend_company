'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { Calculator, Ruler, Paintbrush, Hammer, ChevronDown, Info } from 'lucide-react';

const serviceOptions = [
  { id: 'furniture', label: 'Custom Furniture', icon: Hammer, basePrice: 500 },
  { id: 'aluminum', label: 'Aluminum Fabrication', icon: Ruler, basePrice: 800 },
  { id: 'interior', label: 'Interior Design', icon: Paintbrush, basePrice: 1200 },
];

const materialOptions = [
  { id: 'pine', label: 'Pine Wood', multiplier: 1.0 },
  { id: 'oak', label: 'Oak Wood', multiplier: 1.5 },
  { id: 'walnut', label: 'Walnut Wood', multiplier: 2.0 },
  { id: 'mahogany', label: 'Mahogany', multiplier: 2.5 },
  { id: 'aluminum_basic', label: 'Standard Aluminum', multiplier: 1.0 },
  { id: 'aluminum_premium', label: 'Premium Aluminum', multiplier: 1.4 },
];

const finishOptions = [
  { id: 'basic', label: 'Basic Finish', multiplier: 1.0 },
  { id: 'standard', label: 'Standard Finish', multiplier: 1.2 },
  { id: 'premium', label: 'Premium Finish', multiplier: 1.5 },
  { id: 'luxury', label: 'Luxury Finish', multiplier: 2.0 },
];

export default function CostCalculator() {
  const t = useTranslations();
  const [service, setService] = useState('furniture');
  const [material, setMaterial] = useState('walnut');
  const [finish, setFinish] = useState('standard');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [showBreakdown, setShowBreakdown] = useState(false);

  const sizeMultipliers = { small: 0.7, medium: 1.0, large: 1.5 };

  const estimate = useMemo(() => {
    const base = serviceOptions.find((s) => s.id === service)?.basePrice || 500;
    const matMult = materialOptions.find((m) => m.id === material)?.multiplier || 1;
    const finMult = finishOptions.find((f) => f.id === finish)?.multiplier || 1;
    const sizeMult = sizeMultipliers[size];

    const subtotal = base * matMult * finMult * sizeMult;
    const labor = subtotal * 0.3;
    const materials = subtotal * 0.5;
    const design = subtotal * 0.2;

    return {
      subtotal: Math.round(subtotal),
      labor: Math.round(labor),
      materials: Math.round(materials),
      design: Math.round(design),
      total: Math.round(subtotal),
      low: Math.round(subtotal * 0.8),
      high: Math.round(subtotal * 1.3),
    };
  }, [service, material, finish, size]);

  return (
    <section className="section-padding bg-graphite dark:bg-graphite-950">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calculator className="text-gold" size={24} />
              <p className="service-pillar-label text-gold">ESTIMATE</p>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Cost Calculator</h2>
            <p className="text-aluminum-400 max-w-xl mx-auto">Get an instant estimate for your project. Final pricing may vary based on specific requirements.</p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="bg-graphite-800 dark:bg-graphite-800/50 border border-graphite-600 dark:border-graphite-700 rounded-2xl p-8">
            {/* Service Selection */}
            <div className="mb-8">
              <label className="text-sm text-aluminum-300 font-medium mb-3 block">Select Service</label>
              <div className="grid sm:grid-cols-3 gap-4">
                {serviceOptions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setService(s.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      service === s.id
                        ? 'border-gold bg-gold/10'
                        : 'border-graphite-600 hover:border-graphite-500 bg-graphite-700/50'
                    }`}
                  >
                    <s.icon size={20} className={service === s.id ? 'text-gold' : 'text-aluminum-400'} />
                    <p className={`font-medium mt-2 ${service === s.id ? 'text-gold' : 'text-white'}`}>{s.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Material Selection */}
            <div className="mb-8">
              <label className="text-sm text-aluminum-300 font-medium mb-3 block">Select Material</label>
              <div className="relative">
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full px-4 py-3 bg-graphite-700 border border-graphite-600 rounded-lg text-white appearance-none focus:outline-none focus:border-gold transition-colors"
                >
                  {materialOptions.map((m) => (
                    <option key={m.id} value={m.id}>{m.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-aluminum-400 pointer-events-none" size={18} />
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <label className="text-sm text-aluminum-300 font-medium mb-3 block">Project Size</label>
              <div className="grid grid-cols-3 gap-4">
                {(['small', 'medium', 'large'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`py-3 rounded-lg border-2 transition-all duration-200 capitalize font-medium ${
                      size === s
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-graphite-600 hover:border-graphite-500 text-aluminum-300 bg-graphite-700/50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Finish Selection */}
            <div className="mb-8">
              <label className="text-sm text-aluminum-300 font-medium mb-3 block">Finish Quality</label>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {finishOptions.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFinish(f.id)}
                    className={`py-3 px-4 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                      finish === f.id
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-graphite-600 hover:border-graphite-500 text-aluminum-300 bg-graphite-700/50'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Display */}
            <div className="border-t border-graphite-600 pt-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-aluminum-400 text-sm">Estimated Price Range</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-heading text-4xl md:text-5xl font-bold text-gold">
                      ETB {estimate.low.toLocaleString()} - ETB {estimate.high.toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="flex items-center gap-2 text-aluminum-400 hover:text-gold transition-colors text-sm"
                >
                  <Info size={16} />
                  {showBreakdown ? 'Hide' : 'Show'} Breakdown
                </button>
              </div>

              <AnimatePresence>
                {showBreakdown && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-graphite-600">
                      <div className="bg-graphite-700/50 rounded-lg p-4">
                        <p className="text-aluminum-400 text-xs uppercase tracking-wider">Materials</p>
                        <p className="text-white font-heading text-xl mt-1">ETB {estimate.materials.toLocaleString()}</p>
                      </div>
                      <div className="bg-graphite-700/50 rounded-lg p-4">
                        <p className="text-aluminum-400 text-xs uppercase tracking-wider">Labor</p>
                        <p className="text-white font-heading text-xl mt-1">ETB {estimate.labor.toLocaleString()}</p>
                      </div>
                      <div className="bg-graphite-700/50 rounded-lg p-4">
                        <p className="text-aluminum-400 text-xs uppercase tracking-wider">Design & Setup</p>
                        <p className="text-white font-heading text-xl mt-1">ETB {estimate.design.toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-aluminum-500 text-xs mt-4 flex items-center gap-1">
                <Info size={12} />
                This is an estimate only. Contact us for an accurate quote based on your specific requirements.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
