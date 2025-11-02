import { MetadataRoute } from 'next';
import { getAllPosts } from './lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nyuu.dev';
  
  // Get all blog posts for all languages
  const enPosts = getAllPosts('en');
  const ptPosts = getAllPosts('pt');
  const caPosts = getAllPosts('ca');
  
  const allPosts = [...enPosts, ...ptPosts, ...caPosts];
  
  const blogUrls = allPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...blogUrls,
  ];
}
