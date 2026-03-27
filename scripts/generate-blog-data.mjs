import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const OUTPUT_FILE = path.join(process.cwd(), 'lib', 'blog', 'generated.ts');
const SUPPORTED_LANGS = ['en', 'pt', 'ca'];

/** Convert <Callout> JSX to plain HTML before markdown processing */
function preprocessCallouts(content) {
  return content
    .replace(
      /<Callout\s+type="(\w+)"\s*>([\s\S]*?)<\/Callout>/g,
      '<div role="alert" class="alert alert-$1 my-4"><div>\n\n$2\n\n</div></div>'
    )
    .replace(
      /<Callout\s*>([\s\S]*?)<\/Callout>/g,
      '<div role="alert" class="alert alert-info my-4"><div>\n\n$1\n\n</div></div>'
    );
}

/** Get plain text content from a hast node */
function getTextContent(node) {
  if (node.type === 'text') return node.value;
  if (node.children) return node.children.map(getTextContent).join('');
  return '';
}

/** Rehype plugin: collect headings (h2–h4) with IDs from the AST after rehype-slug */
function rehypeCollectHeadings() {
  return (tree, file) => {
    const headings = [];
    const visit = (node) => {
      if (node.type === 'element' && /^h[2-4]$/.test(node.tagName)) {
        const depth = parseInt(node.tagName[1]);
        const id = node.properties?.id || '';
        const text = getTextContent(node);
        if (text) headings.push({ depth, text, id });
      }
      if (node.children) {
        for (const child of node.children) visit(child);
      }
    };
    visit(tree);
    file.data.headings = headings;
  };
}

/** Add target="_blank" and rel to external links */
function rehypeExternalLinks() {
  return (tree) => {
    const visit = (node) => {
      if (node.type === 'element' && node.tagName === 'a' && node.properties?.href) {
        const href = String(node.properties.href);
        if (!href.startsWith('/') && !href.startsWith('#')) {
          node.properties.target = '_blank';
          node.properties.rel = 'noopener noreferrer';
        }
      }
      if (node.children) {
        for (const child of node.children) visit(child);
      }
    };
    visit(tree);
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSlug)
  .use(rehypeCollectHeadings)
  .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
  .use(rehypeExternalLinks)
  .use(rehypeHighlight)
  .use(rehypeStringify);

async function compileMarkdown(content) {
  const preprocessed = preprocessCallouts(content);
  const result = await processor.process(preprocessed);
  return { html: String(result), headings: result.data.headings || [] };
}

async function generate() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
    writeOutput({});
    return;
  }

  const slugs = fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const posts = {};

  for (const slug of slugs) {
    posts[slug] = {};
    for (const lang of SUPPORTED_LANGS) {
      const filePath = path.join(BLOG_DIR, slug, `${lang}.mdx`);
      if (!fs.existsSync(filePath)) continue;

      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const stats = readingTime(content);
      const { html, headings } = await compileMarkdown(content);

      posts[slug][lang] = {
        title: data.title ?? slug,
        description: data.description ?? '',
        date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date ?? ''),
        updated: data.updated instanceof Date ? data.updated.toISOString().split('T')[0] : data.updated ? String(data.updated) : undefined,
        tags: data.tags ?? [],
        image: data.image ?? undefined,
        draft: data.draft ?? false,
        readingTime: stats.text,
        html,
        headings,
      };
    }
  }

  writeOutput(posts);
}

function writeOutput(posts) {
  const code = `// AUTO-GENERATED — do not edit manually.
// Run "npm run generate:blog" to regenerate.

export interface GeneratedHeading {
  depth: number;
  text: string;
  id: string;
}

export interface GeneratedPost {
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  image?: string;
  draft?: boolean;
  readingTime: string;
  html: string;
  headings: GeneratedHeading[];
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
