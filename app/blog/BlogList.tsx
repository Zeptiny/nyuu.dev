'use client';

import { useLanguage, type Language } from '../context/LanguageContext';
import type { BlogPost } from '../lib/blog';
import { getAllPosts } from '../lib/blog';
import { format } from 'date-fns';
import { enUS, pt, ca } from 'date-fns/locale';
import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';

const locales = {
  en: enUS,
  pt: pt,
  ca: ca,
};

interface BlogListProps {
  initialPosts: BlogPost[];
  initialLanguage: Language;
}

export default function BlogList({ initialPosts, initialLanguage }: BlogListProps) {
  const { language, t } = useLanguage();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [posts, setPosts] = useState(initialPosts);
  
  // Reload posts when language changes
  useEffect(() => {
    if (language !== initialLanguage) {
      // Fetch posts for the new language
      const newPosts = getAllPosts(language);
      setPosts(newPosts);
      setSelectedTag(null); // Reset tag filter when language changes
    }
  }, [language, initialLanguage]);
  
  // Get all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [posts]);

  // Filter posts by selected tag
  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter(post => post.tags.includes(selectedTag));
  }, [posts, selectedTag]);

  const locale = locales[language];

  return (
    <main className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="hero bg-base-200 py-20">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">{t.blogTitle}</h1>
            <p className="text-xl text-base-content/70">{t.blogSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{t.technologies}</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`badge badge-lg ${!selectedTag ? 'badge-primary' : 'badge-ghost'}`}
              >
                {t.filterAll}
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`badge badge-lg ${selectedTag === tag ? 'badge-primary' : 'badge-ghost'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-base-content/60">{t.noPosts}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post: BlogPost) => (
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
                  <h2 className="card-title text-2xl">{post.title}</h2>
                  
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
                      {post.tags.map(tag => (
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
        )}
      </div>
    </main>
  );
}
