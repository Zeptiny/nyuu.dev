import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Language } from '@/app/context/LanguageContext';
import type { BlogPostMeta, BlogPost, HeadingNode } from './types';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const DEFAULT_LANG: Language = 'en';
const SUPPORTED_LANGS: Language[] = ['en', 'pt', 'ca'];

function getPostDirectory(slug: string): string {
  return path.join(BLOG_DIR, slug);
}

function getAvailableLanguages(slug: string): Language[] {
  const dir = getPostDirectory(slug);
  if (!fs.existsSync(dir)) return [];
  return SUPPORTED_LANGS.filter((lang) =>
    fs.existsSync(path.join(dir, `${lang}.mdx`))
  );
}

function readPost(slug: string, lang: Language): { content: string; meta: BlogPostMeta; isFallback: boolean } | null {
  const dir = getPostDirectory(slug);
  const available = getAvailableLanguages(slug);
  if (available.length === 0) return null;

  let selectedLang = lang;
  let isFallback = false;

  if (!available.includes(lang)) {
    selectedLang = DEFAULT_LANG;
    isFallback = lang !== DEFAULT_LANG;
  }

  const filePath = path.join(dir, `${selectedLang}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    content,
    isFallback,
    meta: {
      slug,
      title: data.title ?? slug,
      description: data.description ?? '',
      date: data.date ?? new Date().toISOString(),
      updated: data.updated ?? undefined,
      tags: data.tags ?? [],
      image: data.image ?? undefined,
      draft: data.draft ?? false,
      readingTime: stats.text,
    },
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
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
    content: result.content,
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

export function extractHeadings(content: string): HeadingNode[] {
  const headings: HeadingNode[] = [];
  const lines = content.split('\n');
  for (const line of lines) {
    const match = line.match(/^(#{2,4})\s+(.+)$/);
    if (match) {
      const depth = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      headings.push({ depth, text, id });
    }
  }
  return headings;
}
