'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import BlogPostCard from '@/app/components/blog/BlogPostCard';
import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/blog/types';

export default function LatestPostsSection({
  postsByLang,
}: {
  postsByLang: Record<string, BlogPostMeta[]>;
}) {
  const { language, t } = useLanguage();
  const posts = (postsByLang[language] ?? postsByLang.en ?? []).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-10">{t.latestPosts}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/blog" className="btn btn-outline btn-primary">
            {t.viewAllPosts} →
          </Link>
        </div>
      </div>
    </section>
  );
}
