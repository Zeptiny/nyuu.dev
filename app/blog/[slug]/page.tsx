import { getPostBySlug, getRelatedPosts, getAllPosts, type BlogPost } from '@/app/lib/blog';
import type { Language } from '@/app/context/LanguageContext';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export async function generateStaticParams() {
  const languages: Language[] = ['en', 'pt', 'ca'];
  const paths: { slug: string }[] = [];
  
  languages.forEach(lang => {
    const posts = getAllPosts(lang);
    posts.forEach(post => {
      paths.push({ slug: post.slug });
    });
  });
  
  return paths;
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const search = await searchParams;
  const language = (search.lang || 'en') as Language;
  
  const post = await getPostBySlug(slug, language);
  
  if (!post) {
    notFound();
  }
  
  const relatedPosts = getRelatedPosts(post, language, 3);
  
  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}

