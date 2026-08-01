import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import WhatsAppButton from '@/components/whatsapp/WhatsAppButton';
import SkipToContent from '@/components/ui/SkipToContent';
import StoreProvider from '@/components/providers/StoreProvider';
import ScrollProgress from '@/components/ui/ScrollProgress';
import SectionDots from '@/components/ui/SectionDots';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Kassahun Tesegaye | Custom Furniture & Interior Design in Addis Ababa',
    template: '%s | Kassahun Tesegaye',
  },
  description: 'Kassahun Tesegaye — custom furniture, aluminum fabrication, and interior design in Addis Ababa, Ethiopia. 20+ years of craftsmanship. Get a free quote today.',
  keywords: ['Kassahun Tesegaye', 'furniture', 'aluminum', 'interior design', 'custom furniture', 'Addis Ababa', 'Ethiopia', 'woodwork', 'carpentry', 'carpenter', 'furniture maker', 'Ethiopian furniture', 'custom wood furniture', 'aluminum windows', 'interior decoration'],
  openGraph: {
    title: 'Kassahun Tesegaye | Custom Furniture & Interior Design',
    description: 'Bespoke furniture, timeless design. Custom furniture, aluminum work, and interior design in Addis Ababa. 20+ years of experience.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Kassahun Tesegaye',
    url: 'https://kassahun-tesegaye.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kassahun Tesegaye | Custom Furniture & Interior Design',
    description: 'Bespoke furniture, custom aluminum work, and interior design in Addis Ababa, Ethiopia.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://kassahun-tesegaye.vercel.app',
    languages: {
      'en': 'https://kassahun-tesegaye.vercel.app/en',
      'am': 'https://kassahun-tesegaye.vercel.app/am',
    },
  },
  verification: {
    google: '1e0NqrRCqpnpA74uy0aritx29ewHSA4fyC_Z7KrIPXI',
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
    <html lang={locale} suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/image/photo_5944895518842490494_x%20(1).jpg" type="image/jpeg" />
        <meta name="description" content="Kassahun Tesegaye — custom furniture, aluminum fabrication, and interior design in Addis Ababa, Ethiopia. 20+ years of craftsmanship. Get a free quote today." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Kassahun Tesegaye',
              description: 'Custom furniture, aluminum fabrication, and interior design studio in Addis Ababa, Ethiopia.',
              url: 'https://kassahun-tesegaye.vercel.app',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Kotebe Hanamaryam Church',
                addressLocality: 'Addis Ababa',
                addressCountry: 'ET',
              },
              telephone: '+251994437585',
              email: 'kashuntsegayeplc@gmail.com',
              openingHours: 'Mo-Sa 08:00-18:00',
              priceRange: '$$',
              areaServed: {
                '@type': 'City',
                name: 'Addis Ababa',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Furniture and Interior Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Custom Furniture',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Aluminum Fabrication',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Interior Design',
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body>
        <StoreProvider>
          <SkipToContent />
          <ScrollProgress />
          <SectionDots />
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
            <WhatsAppButton />
          </NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
