'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import type { BlogPost } from '@/app/lib/blog';
import { format } from 'date-fns';
import { enUS, pt, ca } from 'date-fns/locale';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const locales = {
  en: enUS,
  pt: pt,
  ca: ca,
};

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Update page title
    document.title = `${post.title} - nyuu.dev`;
  }, [post.title]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const locale = locales[language];

  return (
    <main className="min-h-screen bg-base-100">
      {/* Article Header */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <Link href="/blog" className="text-primary hover:underline mb-4 inline-block">
            ← {t.backToBlog}
          </Link>
        </div>

        {post.image && (
          <figure className="mb-8 rounded-box overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </figure>
        )}

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap gap-3 text-base-content/70 mb-6">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time dateTime={post.date}>
                {format(new Date(post.date), 'PPP', { locale })}
              </time>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{post.readingTime} {t.minRead}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{post.author}</span>
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="badge badge-primary badge-outline">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <button 
              onClick={copyLink}
              className="btn btn-sm btn-outline"
              aria-label={t.copyLink}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              {copied ? t.linkCopied : t.copyLink}
            </button>
          </div>
        </header>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none
            prose-headings:font-bold
            prose-h1:text-4xl prose-h1:mb-4
            prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-base-content prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-base-content prose-strong:font-bold
            prose-code:text-secondary prose-code:bg-base-200 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-base-300 prose-pre:border prose-pre:border-base-content/10
            prose-img:rounded-box prose-img:shadow-lg
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
            prose-ul:list-disc prose-ul:ml-6
            prose-ol:list-decimal prose-ol:ml-6
            prose-li:text-base-content prose-li:mb-2"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        {/* Share Section */}
        <div className="divider my-12"></div>
        
        <div className="text-center">
          <p className="text-lg mb-4">{t.sharePost}</p>
          <div className="flex justify-center gap-2">
            <button 
              onClick={copyLink}
              className="btn btn-outline"
            >
              {copied ? t.linkCopied : t.copyLink}
            </button>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-base-200 py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold mb-8 text-center">{t.relatedPosts}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: BlogPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="card bg-base-100 hover:shadow-xl transition-shadow duration-300"
                >
                  {relatedPost.image && (
                    <figure className="aspect-video">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                      />
                    </figure>
                  )}
                  <div className="card-body">
                    <h3 className="card-title text-xl">{relatedPost.title}</h3>
                    <p className="text-base-content/80 line-clamp-2">{relatedPost.description}</p>
                    <div className="flex gap-2 text-sm text-base-content/60 mt-2">
                      <time dateTime={relatedPost.date}>
                        {format(new Date(relatedPost.date), 'PP', { locale })}
                      </time>
                      <span>•</span>
                      <span>{relatedPost.readingTime} {t.minRead}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
