'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import { Calendar, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/data/blogPosts';

export default function BlogSection() {
  return (
    <section id="blog" className="section-padding bg-ivory dark:bg-graphite-900">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="service-pillar-label text-walnut mb-4">BLOG</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-graphite dark:text-white mb-4">Latest Insights</h2>
            <p className="text-graphite-400 dark:text-aluminum-400 max-w-xl mx-auto">Tips, trends, and stories from our workshop.</p>
          </div>
        </Reveal>
        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <StaggerItem key={post.id}>
              <article className="group bg-white dark:bg-graphite-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className="aspect-video relative overflow-hidden">
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-gold text-white text-xs font-medium rounded-full">{post.category}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-graphite-400 dark:text-aluminum-400 text-xs mb-3">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-heading text-xl text-graphite dark:text-white mb-3 group-hover:text-gold transition-colors">{post.title}</h3>
                  <p className="text-graphite-400 dark:text-aluminum-400 text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                  <Link href="/blog" className="text-gold font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all" aria-label={`Read more about ${post.title}`}>
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
