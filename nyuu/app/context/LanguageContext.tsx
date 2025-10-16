'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'pt' | 'ca';

interface Translations {
  // Navigation
  home: string;
  theme: string;
  language: string;
  light: string;
  dark: string;
  
  // Sections
  hero: string;
  services: string;
  projects: string;
  stack: string;
  education: string;
  contact: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  scrollDown: string;
  
  // Services Section
  servicesTitle: string;
  servicesSubtitle: string;
  
  // Projects Section
  projectsTitle: string;
  projectsSubtitle: string;
  viewProject: string;
  viewGithub: string;
  technologies: string;
  
  // Stack Section
  stackTitle: string;
  stackSubtitle: string;
  
  // Education Section
  educationTitle: string;
  educationSubtitle: string;
  ongoing: string;
  completed: string;
  downloadCertificate: string;
  filterAll: string;
  
  // Contact Section
  contactTitle: string;
  contactSubtitle: string;
  contactDescription: string;
  email: string;
  discord: string;
  github: string;
  
  // Footer
  footer: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    home: 'Home',
    theme: 'Theme',
    language: 'Language',
    light: 'Light',
    dark: 'Dark',
    
    // Sections
    hero: 'Home',
    services: 'Services',
    projects: 'Projects',
    stack: 'Tech Stack',
    education: 'Education',
    contact: 'Contact',
    
    // Hero Section
    heroTitle: 'Computer Science Student',
    heroSubtitle: 'Full Stack Developer & Technology Enthusiast',
    heroDescription: 'Building innovative solutions and learning new technologies every day.',
    scrollDown: 'Scroll down to explore',
    
    // Services Section
    servicesTitle: 'Services',
    servicesSubtitle: 'What I can do for you',
    
    // Projects Section
    projectsTitle: 'Projects',
    projectsSubtitle: 'Some of my recent work',
    viewProject: 'View Project',
    viewGithub: 'View on GitHub',
    technologies: 'Technologies',
    
    // Stack Section
    stackTitle: 'Tech Stack',
    stackSubtitle: 'Technologies and tools I work with',
    
    // Education Section
    educationTitle: 'Education & Courses',
    educationSubtitle: 'My learning journey',
    ongoing: 'Ongoing',
    completed: 'Completed',
    downloadCertificate: 'Download Certificate',
    filterAll: 'All',
    
    // Contact Section
    contactTitle: 'Get In Touch',
    contactSubtitle: "Let's connect",
    contactDescription: 'Feel free to reach out through any of these platforms',
    email: 'Email',
    discord: 'Discord',
    github: 'GitHub',
    
    // Footer
    footer: 'Made with ❤️ using Next.js and DaisyUI',
  },
  pt: {
    // Navigation
    home: 'Início',
    theme: 'Tema',
    language: 'Idioma',
    light: 'Claro',
    dark: 'Escuro',
    
    // Sections
    hero: 'Início',
    services: 'Serviços',
    projects: 'Projetos',
    stack: 'Tecnologias',
    education: 'Educação',
    contact: 'Contato',
    
    // Hero Section
    heroTitle: 'Estudante de Ciência da Computação',
    heroSubtitle: 'Desenvolvedor Full Stack & Entusiasta de Tecnologia',
    heroDescription: 'Construindo soluções inovadoras e aprendendo novas tecnologias todos os dias.',
    scrollDown: 'Role para explorar',
    
    // Services Section
    servicesTitle: 'Serviços',
    servicesSubtitle: 'O que posso fazer por você',
    
    // Projects Section
    projectsTitle: 'Projetos',
    projectsSubtitle: 'Alguns dos meus trabalhos recentes',
    viewProject: 'Ver Projeto',
    viewGithub: 'Ver no GitHub',
    technologies: 'Tecnologias',
    
    // Stack Section
    stackTitle: 'Stack Tecnológico',
    stackSubtitle: 'Tecnologias e ferramentas com as quais trabalho',
    
    // Education Section
    educationTitle: 'Educação & Cursos',
    educationSubtitle: 'Minha jornada de aprendizado',
    ongoing: 'Em andamento',
    completed: 'Concluído',
    downloadCertificate: 'Baixar Certificado',
    filterAll: 'Todos',
    
    // Contact Section
    contactTitle: 'Entre em Contato',
    contactSubtitle: 'Vamos nos conectar',
    contactDescription: 'Sinta-se à vontade para entrar em contato através de qualquer uma dessas plataformas',
    email: 'E-mail',
    discord: 'Discord',
    github: 'GitHub',
    
    // Footer
    footer: 'Feito com ❤️ usando Next.js e DaisyUI',
  },
  ca: {
    // Navigation
    home: 'Inici',
    theme: 'Tema',
    language: 'Idioma',
    light: 'Clar',
    dark: 'Fosc',
    
    // Sections
    hero: 'Inici',
    services: 'Serveis',
    projects: 'Projectes',
    stack: 'Tecnologies',
    education: 'Educació',
    contact: 'Contacte',
    
    // Hero Section
    heroTitle: 'Estudiant de Ciències de la Computació',
    heroSubtitle: 'Desenvolupador Full Stack & Entusiasta de la Tecnologia',
    heroDescription: 'Construint solucions innovadores i aprenent noves tecnologies cada dia.',
    scrollDown: 'Desplaça cap avall per explorar',
    
    // Services Section
    servicesTitle: 'Serveis',
    servicesSubtitle: 'Què puc fer per tu',
    
    // Projects Section
    projectsTitle: 'Projectes',
    projectsSubtitle: 'Alguns dels meus treballs recents',
    viewProject: 'Veure Projecte',
    viewGithub: 'Veure a GitHub',
    technologies: 'Tecnologies',
    
    // Stack Section
    stackTitle: 'Stack Tecnològic',
    stackSubtitle: 'Tecnologies i eines amb les quals treballo',
    
    // Education Section
    educationTitle: 'Educació i Cursos',
    educationSubtitle: 'El meu camí d\'aprenentatge',
    ongoing: 'En curs',
    completed: 'Completat',
    downloadCertificate: 'Descarregar Certificat',
    filterAll: 'Tots',
    
    // Contact Section
    contactTitle: 'Contacta',
    contactSubtitle: 'Connectem',
    contactDescription: 'No dubtis a contactar-me a través de qualsevol d\'aquestes plataformes',
    email: 'Correu electrònic',
    discord: 'Discord',
    github: 'GitHub',
    
    // Footer
    footer: 'Fet amb ❤️ utilitzant Next.js i DaisyUI',
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
