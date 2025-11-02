#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDirectory = path.join(__dirname, '..', 'content', 'blog');
const outputFile = path.join(__dirname, '..', 'app', 'lib', 'blog-data.ts');

const languages = ['en', 'pt', 'ca'];

async function generateBlogData() {
  const blogPostsData = {};
  const blogPostsContent = {};

  for (const language of languages) {
    const langDirectory = path.join(postsDirectory, language);
    
    if (!fs.existsSync(langDirectory)) {
      blogPostsData[language] = [];
      blogPostsContent[language] = {};
      continue;
    }

    const fileNames = fs.readdirSync(langDirectory);
    const posts = [];
    const contents = {};

    for (const fileName of fileNames) {
      if (!fileName.endsWith('.md')) continue;

      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(langDirectory, fileName);
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

      const post = {
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
      };

      if (post.published) {
        posts.push(post);
        contents[slug] = contentHtml;
      }
    }

    // Sort by date
    posts.sort((a, b) => (a.date < b.date ? 1 : -1));

    blogPostsData[language] = posts;
    blogPostsContent[language] = contents;
  }

  // Generate TypeScript file
  const output = `// This file is auto-generated during build
// It contains all blog posts data to be used in Cloudflare Workers
import type { BlogPost } from './blog';

export const blogPostsData: Record<string, BlogPost[]> = ${JSON.stringify(blogPostsData, null, 2)};

export const blogPostsContent: Record<string, Record<string, string>> = ${JSON.stringify(blogPostsContent, null, 2)};
`;

  fs.writeFileSync(outputFile, output, 'utf8');
  console.log('✅ Blog data generated successfully!');
  console.log(`   - Total languages: ${languages.length}`);
  console.log(`   - Total posts: ${Object.values(blogPostsData).flat().length}`);
}

generateBlogData().catch(error => {
  console.error('Error generating blog data:', error);
  process.exit(1);
});
