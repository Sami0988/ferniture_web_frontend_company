import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import type { Metadata } from 'next';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import WhatsAppButton from '@/components/whatsapp/WhatsAppButton';
import SkipToContent from '@/components/ui/SkipToContent';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import SectionDots from '@/components/ui/SectionDots';

export const metadata: Metadata = {
  title: {
    default: 'Kassahun Wood and Aluminum Work | Bespoke Furniture & Interior Craftsmanship',
    template: '%s | Kassahun Wood and Aluminum Work',
  },
  description: 'Full-service interior craftsmanship studio in Addis Ababa — custom furniture, aluminum fabrication, and design consulting. 14+ years of experience.',
  keywords: ['furniture', 'aluminum', 'interior design', 'custom furniture', 'Addis Ababa', 'Ethiopia', 'woodwork', 'carpentry'],
  openGraph: {
    title: 'Kassahun Wood and Aluminum Work',
    description: 'Bespoke furniture, timeless design. Every piece tells a story of skill, heritage, and care.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Kassahun Wood and Aluminum Work',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Kassahun Wood and Aluminum Work',
              description: 'Full-service interior craftsmanship studio — custom furniture, aluminum fabrication, and design consulting.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Bole Road',
                addressLocality: 'Addis Ababa',
                addressCountry: 'ET',
              },
              telephone: '+251912345678',
              email: 'info@kassahunworkshop.com',
              openingHours: 'Mo-Sa 08:00-18:00',
              priceRange: 'ETB',
            }),
          }}
        />
      </head>
      <body>
        <SkipToContent />
        <CustomCursor />
        <ScrollProgress />
        <SectionDots />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
