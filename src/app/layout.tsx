import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kassahun Wood and Aluminum Work | Premium Interior Craftsmanship',
  description: 'Design-and-build studio offering custom furniture, aluminum fabrication, interior design, and material selection consulting. Full interior craftsmanship for homes and offices.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
