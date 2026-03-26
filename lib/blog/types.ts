import type { Language } from '@/app/context/LanguageContext';

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  image?: string;
  draft?: boolean;
  readingTime: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  isFallback: boolean;
  availableLanguages: Language[];
}

export interface HeadingNode {
  depth: number;
  text: string;
  id: string;
}
