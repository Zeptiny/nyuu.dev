import type { Metadata } from 'next';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Blog — nyuu.dev',
  description: 'Blog posts about SRE, infrastructure, DevOps, and more.',
  openGraph: {
    title: 'Blog — nyuu.dev',
    description: 'Blog posts about SRE, infrastructure, DevOps, and more.',
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto max-w-5xl px-4 py-8 flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}
