'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory dark:bg-graphite-900 px-4">
      <div className="text-center max-w-md">
        <h1 className="font-heading text-8xl font-bold text-gold mb-4">404</h1>
        <h2 className="font-heading text-2xl text-graphite dark:text-white mb-4">Page Not Found</h2>
        <p className="text-graphite-400 dark:text-aluminum-400 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex px-8 py-4 bg-gold hover:bg-gold-600 text-white font-medium tracking-wider uppercase text-sm rounded transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
