'use client';

import { useRouter } from '@/i18n/navigation';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-graphite dark:text-white mb-8">Privacy Policy</h1>

            <div className="space-y-6 text-graphite-500 dark:text-aluminum-300 leading-relaxed">
              <p><strong>Last updated:</strong> January 2024</p>

              <h2 className="font-heading text-xl font-semibold text-graphite dark:text-white mt-8">1. Information We Collect</h2>
              <p>
                When you visit our website, we may collect certain information automatically, including your IP address,
                browser type, operating system, referring URLs, and pages visited. We also collect information you
                voluntarily provide when you fill out our contact or quote request forms, such as your name, email
                address, phone number, and project details.
              </p>

              <h2 className="font-heading text-xl font-semibold text-graphite dark:text-white mt-8">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your inquiries and quote requests</li>
                <li>Provide you with information about our services</li>
                <li>Improve our website and customer experience</li>
                <li>Communicate with you about your projects</li>
              </ul>

              <h2 className="font-heading text-xl font-semibold text-graphite dark:text-white mt-8">3. Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to outside parties. We may
                share your information with trusted third parties who assist us in operating our website and serving
                you, as long as those parties agree to keep this information confidential.
              </p>

              <h2 className="font-heading text-xl font-semibold text-graphite dark:text-white mt-8">4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information. However, no method
                of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee
                absolute security.
              </p>

              <h2 className="font-heading text-xl font-semibold text-graphite dark:text-white mt-8">5. Cookies</h2>
              <p>
                Our website may use cookies to enhance your experience. You can choose to disable cookies through
                your browser settings, though some features of our site may not function properly as a result.
              </p>

              <h2 className="font-heading text-xl font-semibold text-graphite dark:text-white mt-8">6. Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal information. To exercise these rights,
                please contact us using the information provided on our contact page.
              </p>

              <h2 className="font-heading text-xl font-semibold text-graphite dark:text-white mt-8">7. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting
                the new policy on this page with an updated effective date.
              </p>

              <h2 className="font-heading text-xl font-semibold text-graphite dark:text-white mt-8">8. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy, please contact us through our contact page
                or email us at kashuntsegayeplc@gmail.com.
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
