import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Furniture Tips, Trends & Design Ideas',
  description: 'Read our latest articles on custom furniture, aluminum work, interior design trends, and craftsmanship tips from Addis Ababa.',
  openGraph: {
    title: 'Blog | Kassahun Tesegaye',
    description: 'Tips, trends, and stories about furniture, aluminum work, and interior design.',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
