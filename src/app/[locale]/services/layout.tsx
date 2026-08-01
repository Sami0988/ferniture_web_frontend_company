import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Custom Furniture, Aluminum & Interior Design',
  description: 'Explore our custom furniture, aluminum fabrication, and interior design services. Kassahun Tesegaye — 20+ years of craftsmanship in Addis Ababa.',
  openGraph: {
    title: 'Our Services | Kassahun Tesegaye',
    description: 'Custom furniture, aluminum fabrication, and interior design services in Addis Ababa.',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
