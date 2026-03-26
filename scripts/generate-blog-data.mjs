import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const OUTPUT_FILE = path.join(process.cwd(), 'lib', 'blog', 'generated.ts');
const SUPPORTED_LANGS = ['en', 'pt', 'ca'];

function generate() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
    writeOutput({});
    return;
  }

  const slugs = fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  /** @type {Record<string, Record<string, { title: string; description: string; date: string; updated?: string; tags: string[]; image?: string; draft?: boolean; readingTime: string; content: string }>>} */
  const posts = {};

  for (const slug of slugs) {
    posts[slug] = {};
    for (const lang of SUPPORTED_LANGS) {
      const filePath = path.join(BLOG_DIR, slug, `${lang}.mdx`);
      if (!fs.existsSync(filePath)) continue;

      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const stats = readingTime(content);

      posts[slug][lang] = {
        title: data.title ?? slug,
        description: data.description ?? '',
        date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date ?? ''),
        updated: data.updated instanceof Date ? data.updated.toISOString().split('T')[0] : data.updated ? String(data.updated) : undefined,
        tags: data.tags ?? [],
        image: data.image ?? undefined,
        draft: data.draft ?? false,
        readingTime: stats.text,
        content,
      };
    }
  }

  writeOutput(posts);
}

function writeOutput(posts) {
  const code = `// AUTO-GENERATED — do not edit manually.
// Run "npm run generate:blog" to regenerate.

export interface GeneratedPost {
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  image?: string;
  draft?: boolean;
  readingTime: string;
  content: string;
}

/** slug → lang → post data */
export const blogData: Record<string, Record<string, GeneratedPost>> = ${JSON.stringify(posts, null, 2)};
`;

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, code, 'utf-8');
  const slugCount = Object.keys(posts).length;
  console.log(`✓ Generated blog data: ${slugCount} post(s) → lib/blog/generated.ts`);
}

generate();
