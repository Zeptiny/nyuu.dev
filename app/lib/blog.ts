import type { Language } from '../context/LanguageContext';
import { blogPostsData, blogPostsContent } from './blog-data';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  description: string;
  tags: string[];
  language: string;
  published: boolean;
  image?: string;
  content?: string;
  readingTime?: number;
}

/**
 * Get all blog posts for a specific language
 */
export function getAllPosts(language: Language): BlogPost[] {
  return (blogPostsData[language] || []) as BlogPost[];
}

/**
 * Get a single blog post by slug and language
 */
export async function getPostBySlug(slug: string, language: Language): Promise<BlogPost | null> {
  const posts = blogPostsData[language] || [];
  const post = posts.find((p: any) => p.slug === slug);
  
  if (!post) {
    return null;
  }

  const content = blogPostsContent[language]?.[slug] || '';
  
  return {
    ...post,
    content,
  } as BlogPost;
}

/**
 * Get all unique tags across all posts for a language
 */
export function getAllTags(language: Language): string[] {
  const posts = getAllPosts(language);
  const tagsSet = new Set<string>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag));
  });
  
  return Array.from(tagsSet).sort();
}

/**
 * Get posts filtered by tag
 */
export function getPostsByTag(tag: string, language: Language): BlogPost[] {
  const allPosts = getAllPosts(language);
  return allPosts.filter(post => post.tags.includes(tag));
}

/**
 * Get paginated posts
 */
export function getPaginatedPosts(
  language: Language,
  page: number = 1,
  postsPerPage: number = 10
): {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
  totalPosts: number;
} {
  const allPosts = getAllPosts(language);
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPages,
    currentPage,
    totalPosts,
  };
}

/**
 * Get related posts based on tags
 */
export function getRelatedPosts(post: BlogPost, language: Language, limit: number = 3): BlogPost[] {
  const allPosts = getAllPosts(language);
  
  // Calculate relevance score for each post
  const postsWithScore = allPosts
    .filter(p => p.slug !== post.slug)
    .map(p => {
      const commonTags = p.tags.filter(tag => post.tags.includes(tag));
      return {
        post: p,
        score: commonTags.length,
      };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return postsWithScore.slice(0, limit).map(item => item.post);
}
