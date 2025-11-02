'use client';

import { useLanguage } from '../../context/LanguageContext';
import { getAllPosts, type BlogPost } from '../../lib/blog';
import { format } from 'date-fns';
import { enUS, pt, ca } from 'date-fns/locale';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const locales = {
  en: enUS,
  pt: pt,
  ca: ca,
};

export default function BlogPreviewSection() {
  const { language, t } = useLanguage();
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const posts = getAllPosts(language);
    setLatestPosts(posts.slice(0, 3)); // Get only the 3 latest posts
  }, [language]);

  const locale = locales[language];

  if (latestPosts.length === 0) {
    return null; // Don't show the section if there are no posts
  }

  return (
    <section id="blog" className="py-20 bg-base-100">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t.latestPosts}</h2>
          <p className="text-xl text-base-content/70">{t.blogSubtitle}</p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestPosts.map((post: BlogPost) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card bg-base-200 hover:shadow-xl transition-shadow duration-300"
            >
              {post.image && (
                <figure className="aspect-video">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
              )}
              <div className="card-body">
                <h3 className="card-title text-2xl">{post.title}</h3>
                
                <div className="flex flex-wrap gap-2 text-sm text-base-content/60 mb-3">
                  <time dateTime={post.date}>
                    {format(new Date(post.date), 'PPP', { locale })}
                  </time>
                  <span>•</span>
                  <span>{post.readingTime} {t.minRead}</span>
                </div>

                <p className="text-base-content/80 line-clamp-3">{post.description}</p>

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="badge badge-sm badge-outline">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="card-actions justify-end mt-4">
                  <span className="text-primary hover:underline">{t.readMore} →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Posts Button */}
        <div className="text-center">
          <Link href="/blog" className="btn btn-primary btn-lg">
            {t.allPosts} →
          </Link>
        </div>
      </div>
    </section>
  );
}
