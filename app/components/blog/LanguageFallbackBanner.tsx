'use client';

import { useLanguage } from '@/app/context/LanguageContext';

const messages = {
  en: 'This post is not available in your language. Showing the English version.',
  pt: 'Este artigo não está disponível no seu idioma. A mostrar a versão em inglês.',
  ca: 'Aquest article no està disponible en el teu idioma. Es mostra la versió en anglès.',
};

export default function LanguageFallbackBanner() {
  const { language } = useLanguage();

  return (
    <div role="alert" className="alert alert-warning mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <span>{messages[language] ?? messages.en}</span>
    </div>
  );
}
