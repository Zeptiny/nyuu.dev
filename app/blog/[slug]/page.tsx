import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllSlugs, getPostBySlug } from '@/lib/blog';
import { extractHeadings } from '@/lib/blog';
import BlogPostClient from './BlogPostClient';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { getMDXComponents } from '@/app/blog/mdx-components';
import type { Language } from '@/app/context/LanguageContext';
import type { BlogPostMeta, HeadingNode } from '@/lib/blog/types';

const LANGUAGES: Language[] = ['en', 'pt', 'ca'];

interface PageProps {
  params: Promise<{ slug: string }>;
}

const rehypePrettyCodeOptions = {
  theme: {
    dark: 'github-dark-dimmed',
    light: 'github-light',
  },
  keepBackground: false,
};

async function compileMDXContent(source: string) {
  const { content } = await compileMDX({
    source,
    components: getMDXComponents(),
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [rehypePrettyCode, rehypePrettyCodeOptions],
        ],
      },
    },
  });
  return content;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'en');
  if (!post) return {};

  return {
    title: `${post.title} — nyuu.dev`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated,
      ...(post.image && { images: [{ url: post.image }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  // Build all language variants that exist
  const variants: Record<string, {
    content: React.ReactNode;
    meta: BlogPostMeta;
    headings: HeadingNode[];
    isFallback: boolean;
  }> = {};

  for (const lang of LANGUAGES) {
    const post = getPostBySlug(slug, lang);
    if (!post) continue;

    const content = await compileMDXContent(post.content);
    const headings = extractHeadings(post.content);

    variants[lang] = {
      content,
      meta: {
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        updated: post.updated,
        tags: post.tags,
        image: post.image,
        draft: post.draft,
        readingTime: post.readingTime,
      },
      headings,
      isFallback: post.isFallback,
    };
  }

  if (Object.keys(variants).length === 0) {
    notFound();
  }

  return <BlogPostClient variants={variants} />;
}
