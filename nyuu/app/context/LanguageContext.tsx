'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'ja';

interface Translations {
  home: string;
  theme: string;
  language: string;
  light: string;
  dark: string;
  welcome: string;
  getStarted: string;
  editPage: string;
  saveChanges: string;
  deployNow: string;
  readDocs: string;
}

const translations: Record<Language, Translations> = {
  en: {
    home: 'Home',
    theme: 'Theme',
    language: 'Language',
    light: 'Light',
    dark: 'Dark',
    welcome: 'Welcome',
    getStarted: 'Get started by editing',
    editPage: 'app/page.tsx',
    saveChanges: 'Save and see your changes instantly.',
    deployNow: 'Deploy now',
    readDocs: 'Read our docs',
  },
  es: {
    home: 'Inicio',
    theme: 'Tema',
    language: 'Idioma',
    light: 'Claro',
    dark: 'Oscuro',
    welcome: 'Bienvenido',
    getStarted: 'Comienza editando',
    editPage: 'app/page.tsx',
    saveChanges: 'Guarda y ve tus cambios al instante.',
    deployNow: 'Desplegar ahora',
    readDocs: 'Lee la documentación',
  },
  fr: {
    home: 'Accueil',
    theme: 'Thème',
    language: 'Langue',
    light: 'Clair',
    dark: 'Sombre',
    welcome: 'Bienvenue',
    getStarted: 'Commencez par éditer',
    editPage: 'app/page.tsx',
    saveChanges: 'Enregistrez et voyez vos changements instantanément.',
    deployNow: 'Déployer maintenant',
    readDocs: 'Lire la documentation',
  },
  de: {
    home: 'Startseite',
    theme: 'Thema',
    language: 'Sprache',
    light: 'Hell',
    dark: 'Dunkel',
    welcome: 'Willkommen',
    getStarted: 'Beginnen Sie mit der Bearbeitung',
    editPage: 'app/page.tsx',
    saveChanges: 'Speichern und sehen Sie Ihre Änderungen sofort.',
    deployNow: 'Jetzt bereitstellen',
    readDocs: 'Dokumentation lesen',
  },
  ja: {
    home: 'ホーム',
    theme: 'テーマ',
    language: '言語',
    light: 'ライト',
    dark: 'ダーク',
    welcome: 'ようこそ',
    getStarted: '編集を始める',
    editPage: 'app/page.tsx',
    saveChanges: '保存して変更を即座に確認できます。',
    deployNow: '今すぐデプロイ',
    readDocs: 'ドキュメントを読む',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const value = {
    language,
    setLanguage,
    t: mounted ? translations[language] : translations.en,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
