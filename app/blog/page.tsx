import BlogListClient from './BlogListClient';
import { getAllPosts, getAllTags } from '@/lib/blog';
import type { Language } from '@/app/context/LanguageContext';
import type { BlogPostMeta } from '@/lib/blog/types';

const LANGUAGES: Language[] = ['en', 'pt', 'ca'];

export default function BlogPage() {
  // Pre-build all language variants so client can switch without API calls
  const postsByLang: Record<string, BlogPostMeta[]> = {};
  const tagsByLang: Record<string, string[]> = {};

  for (const lang of LANGUAGES) {
    postsByLang[lang] = getAllPosts(lang);
    tagsByLang[lang] = getAllTags(lang);
  }

  return <BlogListClient postsByLang={postsByLang} tagsByLang={tagsByLang} />;
}
