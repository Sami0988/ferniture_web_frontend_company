import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimonials | Client Reviews & Stories',
  description: 'Read what our clients say about our furniture, aluminum work, and interior design services.',
  openGraph: {
    title: 'Testimonials | Kassahun Tesegaye',
    description: 'Real stories from customers who trusted us with their projects.',
  },
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
