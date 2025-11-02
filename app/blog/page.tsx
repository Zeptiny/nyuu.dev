import { getAllPosts, type BlogPost } from '../lib/blog';
import type { Language } from '../context/LanguageContext';
import BlogList from './BlogList';

interface PageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const language = (params.lang || 'en') as Language;
  const posts = getAllPosts(language);
  
  return <BlogList initialPosts={posts} initialLanguage={language} />;
}
