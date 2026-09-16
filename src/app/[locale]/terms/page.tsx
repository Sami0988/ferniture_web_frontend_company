'use client';

import { useRouter } from '@/i18n/navigation';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  const router = useRouter();

  return (
    <section className="section-padding bg-ivory dark:bg-graphite-900">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="mb-8">
            <button
              onClick={() => router.push('/')}
              className="text-walnut hover:text-walnut-600 font-medium flex items-center gap-2 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </div>
        </Reveal>

        <Reveal>
          <article className="bg-white dark:bg-graphite-800 rounded-2xl p-8 md:p-12 shadow-sm">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-graphite dark:text-white mb-8">Terms of Service</h1>

            <div className="space-y-6 text-graphite-500 dark:text-aluminum-300 leading-relaxed">
              <p><strong>Last updated:</strong> January 2024</p>

              <h2 className="font-heading text-xl font-semibold text-graphite dark:text-white mt-8">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Kassahun Wood and Aluminum Work website and services, you accept and
                agree to be bound by these Terms of Service. If you do not agree to these terms, please do not
                use our services.
              </p>

              <h2 className="font-heading text-xl font-semibold text-graphite dark:text-white mt-8">2. Services</h2>
              <p>
                Kassahun Wood and Aluminum Work provides custom furniture, aluminum fabrication, and interior
                design services. All services are subject to availability and mutual agreement on project scope,
                timeline, and pricing.
              </p>

              <h2 className="font-heading text-xl font-semibold text-graphite dark:text-white mt-8">3. Quotes and Pricing</h2>
              <p>
                All quotes provided are estimates based on the information available at the time. Final pricing
                may vary based on material costs, project complexity, and any changes to the agreed scope.
                Quotes are valid for 30 days from the date of issue.
              </p>

              <h2 className="font-heading text-xl font-semibold text-graphite dark:text-white mt-8">4. Payment Terms</h2>
              <p>
                Payment terms will be agreed upon before the start of each project. Typically, a deposit is
                required before work begins, with the remaining balance due upon completion. Late payments
                may incur additional charges.
              </p>

              <h2 className="font-heading text-xl font-semibold text-graphite dark:text-white mt-8">5. Warranties</h2>
              <p>
                We stand behind our work with the following warranties:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Custom furniture: 2-year workmanship warranty</li>
                <li>Aluminum installations: 5-year structural warranty</li>
                <li>Interior design consulting: Satisfaction guaranteed during project implementation</li>
              </ul>

              <h2 className="font-heading text-xl font-semibold text-graphite dark:text-white mt-8">6. Limitation of Liability</h2>
              <p>
                Kassahun Wood and Aluminum Work shall not be liable for any indirect, incidental, special,
                or consequential damages resulting from the use or inability to use our services or products.
              </p>

              <h2 className="font-heading text-xl font-semibold text-graphite dark:text-white mt-8">7. Intellectual Property</h2>
              <p>
                All designs, concepts, and materials created by Kassahun Wood and Aluminum Work remain our
                intellectual property until full payment is received, at which point ownership transfers to
                the client as agreed.
              </p>

              <h2 className="font-heading text-xl font-semibold text-graphite dark:text-white mt-8">8. Cancellation Policy</h2>
              <p>
                Cancellations must be made in writing. Cancellations before work begins may be subject to
                a nominal administrative fee. Cancellations after work has begun will be billed for work
                completed to date plus any non-recoverable costs.
              </p>

              <h2 className="font-heading text-xl font-semibold text-graphite dark:text-white mt-8">9. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of Ethiopia.
                Any disputes shall be resolved through good faith negotiation before pursuing legal remedies.
              </p>

              <h2 className="font-heading text-xl font-semibold text-graphite dark:text-white mt-8">10. Contact</h2>
              <p>
                For questions about these Terms of Service, please contact us through our contact page
                or email us at kashuntsegayeplc@gmail.com.
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
