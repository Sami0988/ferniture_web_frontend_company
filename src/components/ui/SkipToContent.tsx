'use client';

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-gold focus:text-white focus:rounded-lg focus:outline-none"
    >
      Skip to main content
    </a>
  );
}
