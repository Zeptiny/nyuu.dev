'use client';

import { useEffect, useState } from 'react';
import type { HeadingNode } from '@/lib/blog/types';

export default function TableOfContents({ headings }: { headings: HeadingNode[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <h4 className="font-semibold text-sm mb-2 text-base-content/70">
        Table of Contents
      </h4>
      <ul className="menu menu-sm p-0">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`${heading.depth === 3 ? 'ml-3' : ''} ${heading.depth === 4 ? 'ml-6' : ''} ${activeId === heading.id ? 'active font-medium' : 'text-base-content/60'}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
