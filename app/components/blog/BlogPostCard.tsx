'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { BlogPostMeta } from '@/lib/blog/types';

export default function BlogPostCard({ post, bgClass = 'bg-base-200' }: { post: BlogPostMeta; bgClass?: string }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <div className={`card card-border ${bgClass} hover:shadow-lg transition-shadow`}>
        {post.image && (
          <figure className="relative h-48">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </figure>
        )}
        <div className="card-body">
          <h3 className="card-title text-lg">{post.title}</h3>
          <p className="text-base-content/70 text-sm line-clamp-2">
            {post.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-base-content/50 mt-1">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          {post.tags.length > 0 && (
            <div className="card-actions mt-2">
              {post.tags.map((tag) => (
                <span key={tag} className="badge badge-outline badge-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
