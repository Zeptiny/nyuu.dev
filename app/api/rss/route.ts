import { getAllPosts } from '@/app/lib/blog';
import type { Language } from '@/app/context/LanguageContext';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = (searchParams.get('lang') || 'en') as Language;
  
  const posts = getAllPosts(lang);
  const baseUrl = 'https://nyuu.dev';
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>nyuu.dev Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Thoughts, tutorials, and insights about DevOps, SRE, and Technology</description>
    <language>${lang}</language>
    <atom:link href="${baseUrl}/rss.xml?lang=${lang}" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>nyuu@nyuu.dev (${post.author})</author>
      ${post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
