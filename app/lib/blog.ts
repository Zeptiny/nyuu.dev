import type { Language } from '../context/LanguageContext';

// Check if we're running in a Node.js environment with filesystem access
const hasFileSystem = typeof process !== 'undefined' && 
                      typeof process.cwd === 'function' &&
                      typeof require !== 'undefined';

let fs: any, path: any, matter: any, remark: any, html: any, gfm: any;
let postsDirectory: string;
let blogPostsData: Record<string, any[]>;
let blogPostsContent: Record<string, Record<string, string>>;

if (hasFileSystem) {
  // Running in Node.js (development or build time)
  fs = require('fs');
  path = require('path');
  matter = require('gray-matter');
  const remarkModule = require('remark');
  remark = remarkModule.remark;
  html = require('remark-html');
  gfm = require('remark-gfm');
  postsDirectory = path.join(process.cwd(), 'content/blog');
} else {
  // Running in Cloudflare Workers (production)
  const blogData = require('./blog-data');
  blogPostsData = blogData.blogPostsData;
  blogPostsContent = blogData.blogPostsContent;
}

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
  if (!hasFileSystem) {
    // In Cloudflare Workers, use pre-generated data
    return (blogPostsData[language] || []) as BlogPost[];
  }

  const langDirectory = path.join(postsDirectory, language);
  
  if (!fs.existsSync(langDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(langDirectory);
  
  const allPostsData = fileNames
    .filter((fileName: string) => fileName.endsWith('.md'))
    .map((fileName: string) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(langDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Calculate reading time (average 200 words per minute)
      const wordCount = content.split(/\s+/g).length;
      const readingTime = Math.ceil(wordCount / 200);

      return {
        slug,
        title: data.title,
        date: data.date,
        author: data.author,
        description: data.description,
        tags: data.tags || [],
        language: data.language,
        published: data.published !== false,
        image: data.image,
        readingTime,
      } as BlogPost;
    })
    .filter((post: BlogPost) => post.published)
    .sort((a: BlogPost, b: BlogPost) => (a.date < b.date ? 1 : -1));

  return allPostsData;
}

/**
 * Get a single blog post by slug and language
 */
export async function getPostBySlug(slug: string, language: Language): Promise<BlogPost | null> {
  if (!hasFileSystem) {
    // In Cloudflare Workers, use pre-generated data
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

  try {
    const fullPath = path.join(postsDirectory, language, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(gfm)
      .use(html, { sanitize: false })
      .process(content);
    
    const contentHtml = processedContent.toString();

    // Calculate reading time
    const wordCount = content.split(/\s+/g).length;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author,
      description: data.description,
      tags: data.tags || [],
      language: data.language,
      published: data.published !== false,
      image: data.image,
      content: contentHtml,
      readingTime,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
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
