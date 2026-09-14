'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useGetBlogPostBySlugQuery, useGetBlogPostsQuery } from '@/lib/api/baseApi';
import { Reveal } from '@/components/ui/Reveal';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const slug = params.slug as string;

  const { data: post, isLoading, error } = useGetBlogPostBySlugQuery({ slug, locale });
  const { data: allPosts = [] } = useGetBlogPostsQuery({ locale });

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(locale === 'am' ? 'am-ET' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const relatedPosts = allPosts.filter((p: any) => p.id !== post?.id).slice(0, 3);

  if (isLoading) {
    return (
      <section className="section-padding bg-ivory dark:bg-graphite-900">
        <div className="max-w-4xl mx-auto text-center py-20 text-graphite-400">Loading...</div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="section-padding bg-ivory dark:bg-graphite-900">
        <div className="max-w-4xl mx-auto text-center py-20">
          <p className="text-graphite-400 mb-4">Blog post not found.</p>
          <Link href="/blog" className="text-gold font-medium flex items-center gap-1 justify-center hover:gap-2 transition-all">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-ivory dark:bg-graphite-900">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="mb-8">
            <button
              onClick={() => router.push('/blog')}
              className="text-walnut hover:text-walnut-600 font-medium flex items-center gap-2 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </button>
          </div>
        </Reveal>

        <Reveal>
          <article>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-gold text-white text-xs font-medium rounded-full capitalize">{post.category}</span>
              <div className="flex items-center gap-1 text-graphite-400 dark:text-aluminum-400 text-sm">
                <Calendar size={14} />
                <span>{post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}</span>
              </div>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-graphite dark:text-white mb-6">{post.title}</h1>

            {post.excerpt && (
              <p className="text-graphite-400 dark:text-aluminum-400 text-lg mb-8 leading-relaxed">{post.excerpt}</p>
            )}

            {post.coverImage && (
              <div className="relative aspect-video rounded-xl overflow-hidden mb-10">
                <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority />
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              {post.content.split('\n').map((paragraph: string, i: number) => (
                paragraph.trim() ? <p key={i}>{paragraph}</p> : null
              ))}
            </div>

            {post.featureImages && post.featureImages.length > 0 && (
              <div className="mb-12">
                <h3 className="font-heading text-xl font-semibold text-graphite dark:text-white mb-4">Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {post.featureImages.map((img: string, i: number) => (
                    <div key={i} className="relative aspect-video rounded-lg overflow-hidden">
                      <Image src={img} alt={`${post.title} ${i + 1}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        </Reveal>

        {relatedPosts.length > 0 && (
          <Reveal>
            <div className="border-t border-graphite-200 dark:border-graphite-700 pt-12 mt-12">
              <h3 className="font-heading text-2xl font-bold text-graphite dark:text-white mb-8">More Articles</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((related: any) => (
                  <Link key={related.id} href={`/blog/${related.slug}`} className="group block">
                    <article className="bg-white dark:bg-graphite-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-video relative overflow-hidden">
                        <Image src={related.coverImage || '/image/PXL_20241012_101314116.jpg'} alt={related.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-heading text-sm font-semibold text-graphite dark:text-white group-hover:text-gold transition-colors line-clamp-2">{related.title}</h4>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
