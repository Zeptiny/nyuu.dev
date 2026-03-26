'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import TableOfContents from '@/app/components/blog/TableOfContents';
import LanguageFallbackBanner from '@/app/components/blog/LanguageFallbackBanner';
import type { BlogPostMeta, HeadingNode } from '@/lib/blog/types';

const uiStrings = {
  en: { blog: 'Blog', home: 'Home', publishedOn: 'Published on', updatedOn: 'Updated on' },
  pt: { blog: 'Blog', home: 'Início', publishedOn: 'Publicado em', updatedOn: 'Atualizado em' },
  ca: { blog: 'Blog', home: 'Inici', publishedOn: 'Publicat el', updatedOn: 'Actualitzat el' },
};

interface Variant {
  html: string;
  meta: BlogPostMeta;
  headings: HeadingNode[];
  isFallback: boolean;
}

export default function BlogPostClient({
  variants,
}: {
  variants: Record<string, Variant>;
}) {
  const { language } = useLanguage();
  const variant = variants[language] ?? variants.en;
  if (!variant) return null;

  const { html, meta, headings, isFallback } = variant;
  const strings = uiStrings[language] ?? uiStrings.en;

  return (
    <>
      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li><Link href="/">{strings.home}</Link></li>
          <li><Link href="/blog">{strings.blog}</Link></li>
          <li>{meta.title}</li>
        </ul>
      </div>

      {isFallback && <LanguageFallbackBanner />}

      <article>
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-3">{meta.title}</h1>
          <p className="text-base-content/60 text-sm mb-3">{meta.description}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/50">
            <time dateTime={meta.date}>
              {strings.publishedOn}{' '}
              {new Date(meta.date).toLocaleDateString(language, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {meta.updated && (
              <span>
                · {strings.updatedOn}{' '}
                {new Date(meta.updated).toLocaleDateString(language, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
            <span>· {meta.readingTime}</span>
          </div>
          {meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {meta.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="badge badge-outline badge-sm"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Content + ToC layout */}
        <div className="flex gap-8">
          <div
            className="prose prose-base max-w-none flex-1 min-w-0"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {headings.length > 0 && (
            <aside className="hidden xl:block w-56 shrink-0">
              <div className="sticky top-20">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          )}
        </div>
      </article>
    </>
  );
}
