'use client';

import { useLanguage } from '@/app/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-10">
      <aside>
        <p className="font-semibold text-lg">nyuu.dev</p>
        <p className="text-base-content/70">
          {t.footer}
        </p>
        <p className="text-sm text-base-content/60">
          © {currentYear} nyuu.dev - All rights reserved
        </p>
      </aside>
    </footer>
  );
}
