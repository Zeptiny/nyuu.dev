import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

function Callout({ type = 'info', children }: { type?: 'info' | 'success' | 'warning' | 'error'; children: React.ReactNode }) {
  const colorMap = {
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
    error: 'alert-error',
  };
  return (
    <div role="alert" className={`alert ${colorMap[type]} my-4`}>
      <div>{children}</div>
    </div>
  );
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2 className="text-2xl font-bold mt-10 mb-4 scroll-mt-20" {...props} />
    ),
    h3: (props) => (
      <h3 className="text-xl font-semibold mt-8 mb-3 scroll-mt-20" {...props} />
    ),
    h4: (props) => (
      <h4 className="text-lg font-semibold mt-6 mb-2 scroll-mt-20" {...props} />
    ),
    a: ({ href, children, ...props }) => {
      if (href?.startsWith('/') || href?.startsWith('#')) {
        return <Link href={href} className="link link-primary" {...props}>{children}</Link>;
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="link link-primary" {...props}>
          {children}
        </a>
      );
    },
    img: ({ src, alt, width, height, ...props }) => {
      if (!src) return null;
      if (src.startsWith('http')) {
        return (
          <Image
            src={src}
            alt={alt ?? ''}
            width={Number(width) || 800}
            height={Number(height) || 450}
            className="rounded-lg my-4"
            {...props}
          />
        );
      }
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt ?? ''} className="rounded-lg my-4" {...props} />;
    },
    blockquote: (props) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-base-content/70" {...props} />
    ),
    table: (props) => (
      <div className="overflow-x-auto my-4">
        <table className="table table-zebra" {...props} />
      </div>
    ),
    Callout,
    ...components,
  };
}
