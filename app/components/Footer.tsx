'use client';

import { useLanguage } from '@/app/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-base-300 text-base-content">
      <div className="footer footer-center p-10 w-full">
        <nav className="grid grid-flow-col gap-4">
          <a href="/#hero" className="link link-hover">{t.hero}</a>
          <a href="/#services" className="link link-hover">{t.services}</a>
          <a href="/#projects" className="link link-hover">{t.projects}</a>
          <a href="/blog" className="link link-hover">{t.blog}</a>
          <a href="/#contact" className="link link-hover">{t.contact}</a>
        </nav>
        <aside>
          <p className="text-sm text-base-content/60">
            © {currentYear} nyuu.dev - Some rights reserved
          </p>
        </aside>
      </div>
    </footer>
  );
}
