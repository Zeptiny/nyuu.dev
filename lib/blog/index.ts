import { blogData } from './generated';
import type { Language } from '@/app/context/LanguageContext';
import type { BlogPostMeta, BlogPost, HeadingNode } from './types';

const DEFAULT_LANG: Language = 'en';
const SUPPORTED_LANGS: Language[] = ['en', 'pt', 'ca'];

function getAvailableLanguages(slug: string): Language[] {
  const langMap = blogData[slug];
  if (!langMap) return [];
  return SUPPORTED_LANGS.filter((lang) => lang in langMap);
}

function readPost(slug: string, lang: Language): { html: string; headings: HeadingNode[]; meta: BlogPostMeta; isFallback: boolean } | null {
  const langMap = blogData[slug];
  if (!langMap) return null;

  const available = getAvailableLanguages(slug);
  if (available.length === 0) return null;

  let selectedLang = lang;
  let isFallback = false;

  if (!available.includes(lang)) {
    selectedLang = DEFAULT_LANG;
    isFallback = lang !== DEFAULT_LANG;
  }

  const post = langMap[selectedLang];
  if (!post) return null;

  return {
    html: post.html,
    headings: post.headings,
    isFallback,
    meta: {
      slug,
      title: post.title,
      description: post.description,
      date: post.date,
      updated: post.updated,
      tags: post.tags,
      image: post.image,
      draft: post.draft,
      readingTime: post.readingTime,
    },
  };
}

export function getAllSlugs(): string[] {
  return Object.keys(blogData);
}

export function getAllPosts(lang: Language): BlogPostMeta[] {
  const isProduction = process.env.NODE_ENV === 'production';
  return getAllSlugs()
    .map((slug) => readPost(slug, lang)?.meta)
    .filter((meta): meta is BlogPostMeta => {
      if (!meta) return false;
      if (isProduction && meta.draft) return false;
      return true;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string, lang: Language): BlogPost | null {
  const result = readPost(slug, lang);
  if (!result) return null;

  return {
    ...result.meta,
    html: result.html,
    headings: result.headings,
    isFallback: result.isFallback,
    availableLanguages: getAvailableLanguages(slug),
  };
}

export function getAllTags(lang: Language): string[] {
  const posts = getAllPosts(lang);
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string, lang: Language): BlogPostMeta[] {
  return getAllPosts(lang).filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}
