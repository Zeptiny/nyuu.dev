'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import BlogPostCard from '@/app/components/blog/BlogPostCard';
import TagBadge from '@/app/components/blog/TagBadge';
import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/blog/types';

const POSTS_PER_PAGE = 6;

const uiStrings = {
  en: { title: 'Blog', allTags: 'All', noResults: 'No posts found.', prev: 'Previous', next: 'Next', home: 'Home', post: 'post', posts: 'posts' },
  pt: { title: 'Blog', allTags: 'Todos', noResults: 'Nenhum artigo encontrado.', prev: 'Anterior', next: 'Próximo', home: 'Início', post: 'publicação', posts: 'publicações' },
  ca: { title: 'Blog', allTags: 'Tots', noResults: 'No s\'han trobat articles.', prev: 'Anterior', next: 'Següent', home: 'Inici', post: 'publicació', posts: 'publicacions' },
};

export default function BlogListClient({
  postsByLang,
  tagsByLang,
}: {
  postsByLang: Record<string, BlogPostMeta[]>;
  tagsByLang: Record<string, string[]>;
}) {
  const { language, t } = useLanguage();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const strings = uiStrings[language] ?? uiStrings.en;
  const posts = postsByLang[language] ?? postsByLang.en ?? [];
  const tags = tagsByLang[language] ?? tagsByLang.en ?? [];

  const filtered = activeTag
    ? posts.filter((p) => p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase()))
    : posts;

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  function handleTagClick(tag: string) {
    setActiveTag((prev) => (prev === tag ? null : tag));
    setPage(1);
  }

  const totalCount = (postsByLang[language] ?? postsByLang.en ?? []).length;

  return (
    <>
      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li><Link href="/">{strings.home}</Link></li>
          <li>{strings.title}</li>
        </ul>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">{strings.title}</h1>
          <span className="badge badge-neutral">{totalCount} {totalCount === 1 ? strings.post : strings.posts}</span>
        </div>
        <p className="text-base-content/60">{t.blogSubtitle}</p>
        <div className="divider"></div>
      </div>

      {/* Tags filter */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <TagBadge
            tag={strings.allTags}
            active={activeTag === null}
            onClick={() => { setActiveTag(null); setPage(1); }}
          />
          {tags.map((tag) => (
            <TagBadge
              key={tag}
              tag={tag}
              active={activeTag === tag}
              onClick={handleTagClick}
            />
          ))}
        </div>
      )}

      {/* Posts grid */}
      {paginated.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-base-content/60">{strings.noResults}</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          <button
            type="button"
            className="btn btn-sm"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            {strings.prev}
          </button>
          <span className="btn btn-sm btn-ghost pointer-events-none">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            className="btn btn-sm"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            {strings.next}
          </button>
        </div>
      )}
    </>
  );
}
