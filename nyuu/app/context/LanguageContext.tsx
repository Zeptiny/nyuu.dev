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
  
  // Education Categories
  categoryUniversity: string;
  categoryWebDevelopment: string;
  categoryFrontend: string;
  categoryDevOps: string;
  categoryDatabase: string;
  categoryDataScience: string;
  
  // Education Courses
  courseCS: string;
  courseCSDes: string;
  courseFullStack: string;
  courseFullStackDesc: string;
  courseReact: string;
  courseReactDesc: string;
  courseDocker: string;
  courseDockerDesc: string;
  courseDatabase: string;
  courseDatabaseDesc: string;
  coursePython: string;
  coursePythonDesc: string;
  
  // Tech Stack Categories
  categoryLanguages: string;
  categoryCloudPlatforms: string;
  categoryContainerization: string;
  categoryDatabases: string;
  categoryMonitoring: string;
  
  // Services
  serviceWebDev: string;
  serviceWebDevDesc: string;
  serviceWebDevDetailed: string;
  serviceMobileDev: string;
  serviceMobileDevDesc: string;
  serviceMobileDevDetailed: string;
  serviceUIUX: string;
  serviceUIUXDesc: string;
  serviceUIUXDetailed: string;
  serviceAPI: string;
  serviceAPIDesc: string;
  serviceAPIDetailed: string;
  
  // Projects
  projectOne: string;
  projectOneDesc: string;
  projectTwo: string;
  projectTwoDesc: string;
  projectThree: string;
  projectThreeDesc: string;
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
    
    // Education Categories
    categoryUniversity: 'University',
    categoryWebDevelopment: 'Web Development',
    categoryFrontend: 'Frontend',
    categoryDevOps: 'DevOps',
    categoryDatabase: 'Database',
    categoryDataScience: 'Data Science',
    
    // Education Courses
    courseCS: 'Computer Science Degree',
    courseCSDes: 'Bachelor\'s degree in Computer Science focusing on software engineering and algorithms.',
    courseFullStack: 'Full Stack Web Development',
    courseFullStackDesc: 'Complete course covering frontend and backend development.',
    courseReact: 'Advanced React & Next.js',
    courseReactDesc: 'Modern React patterns and Next.js framework.',
    courseDocker: 'Docker & Kubernetes',
    courseDockerDesc: 'Container orchestration and deployment strategies.',
    courseDatabase: 'Database Design & SQL',
    courseDatabaseDesc: 'Relational database design and advanced SQL queries.',
    coursePython: 'Python for Data Science',
    coursePythonDesc: 'Data analysis, visualization, and machine learning basics.',
    
    // Tech Stack Categories
    categoryLanguages: 'Languages',
    categoryCloudPlatforms: 'Cloud Platforms',
    categoryContainerization: 'Containerization',
    categoryDatabases: 'Databases',
    categoryMonitoring: 'Monitoring & Logging',
    
    // Services
    serviceWebDev: 'Web Development',
    serviceWebDevDesc: 'Full-stack web development using modern technologies and best practices.',
    serviceWebDevDetailed: 'I build responsive, performant web applications using cutting-edge frameworks like React, Next.js, and Vue.js. From simple landing pages to complex web platforms, I deliver scalable solutions that meet your business needs. My expertise includes both frontend and backend development, ensuring a seamless end-to-end experience.',
    serviceMobileDev: 'Mobile Development',
    serviceMobileDevDesc: 'Cross-platform mobile applications with responsive design.',
    serviceMobileDevDetailed: 'Creating native and cross-platform mobile applications for iOS and Android. Using technologies like React Native and Flutter, I develop apps that provide excellent user experience while maintaining code efficiency across platforms. Focus on performance, accessibility, and intuitive user interfaces.',
    serviceUIUX: 'UI/UX Design',
    serviceUIUXDesc: 'User-centered design creating intuitive and beautiful interfaces.',
    serviceUIUXDetailed: 'Designing user interfaces that are both aesthetically pleasing and highly functional. I conduct user research, create wireframes and prototypes, and perform usability testing to ensure the final product meets user needs. My design process focuses on accessibility, consistency, and creating delightful user experiences.',
    serviceAPI: 'API Development',
    serviceAPIDesc: 'RESTful and GraphQL APIs with secure authentication.',
    serviceAPIDetailed: 'Building robust, scalable APIs that power modern applications. I develop RESTful and GraphQL APIs with proper authentication, rate limiting, and comprehensive documentation. Focus on security best practices, performance optimization, and creating APIs that are easy to integrate and maintain.',
    
    // Projects
    projectOne: 'Project One',
    projectOneDesc: 'A comprehensive web application built with modern technologies.',
    projectTwo: 'Project Two',
    projectTwoDesc: 'Mobile-first application with real-time features.',
    projectThree: 'Project Three',
    projectThreeDesc: 'Full-stack application with authentication and database.',
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
    
    // Education Categories
    categoryUniversity: 'Universidade',
    categoryWebDevelopment: 'Desenvolvimento Web',
    categoryFrontend: 'Frontend',
    categoryDevOps: 'DevOps',
    categoryDatabase: 'Banco de Dados',
    categoryDataScience: 'Ciência de Dados',
    
    // Education Courses
    courseCS: 'Graduação em Ciência da Computação',
    courseCSDes: 'Bacharelado em Ciência da Computação com foco em engenharia de software e algoritmos.',
    courseFullStack: 'Desenvolvimento Web Full Stack',
    courseFullStackDesc: 'Curso completo cobrindo desenvolvimento frontend e backend.',
    courseReact: 'React Avançado & Next.js',
    courseReactDesc: 'Padrões modernos de React e framework Next.js.',
    courseDocker: 'Docker & Kubernetes',
    courseDockerDesc: 'Orquestração de contêineres e estratégias de implantação.',
    courseDatabase: 'Design de Banco de Dados & SQL',
    courseDatabaseDesc: 'Design de banco de dados relacional e consultas SQL avançadas.',
    coursePython: 'Python para Ciência de Dados',
    coursePythonDesc: 'Análise de dados, visualização e fundamentos de aprendizado de máquina.',
    
    // Tech Stack Categories
    categoryLanguages: 'Linguagens',
    categoryCloudPlatforms: 'Plataformas em Nuvem',
    categoryContainerization: 'Containerização',
    categoryDatabases: 'Bancos de Dados',
    categoryMonitoring: 'Monitoramento e Registro',
    
    // Services
    serviceWebDev: 'Desenvolvimento Web',
    serviceWebDevDesc: 'Desenvolvimento web full-stack usando tecnologias modernas e melhores práticas.',
    serviceWebDevDetailed: 'Construo aplicações web responsivas e performáticas usando frameworks de ponta como React, Next.js e Vue.js. De páginas de destino simples a plataformas web complexas, entrego soluções escaláveis que atendem às necessidades do seu negócio. Minha expertise inclui desenvolvimento frontend e backend, garantindo uma experiência perfeita de ponta a ponta.',
    serviceMobileDev: 'Desenvolvimento Mobile',
    serviceMobileDevDesc: 'Aplicações móveis multiplataforma com design responsivo.',
    serviceMobileDevDetailed: 'Criando aplicações móveis nativas e multiplataforma para iOS e Android. Usando tecnologias como React Native e Flutter, desenvolvo aplicativos que proporcionam excelente experiência do usuário mantendo eficiência de código entre plataformas. Foco em desempenho, acessibilidade e interfaces de usuário intuitivas.',
    serviceUIUX: 'Design UI/UX',
    serviceUIUXDesc: 'Design centrado no usuário criando interfaces intuitivas e belas.',
    serviceUIUXDetailed: 'Projetando interfaces de usuário que são esteticamente agradáveis e altamente funcionais. Realizo pesquisas de usuário, crio wireframes e protótipos, e executo testes de usabilidade para garantir que o produto final atenda às necessidades do usuário. Meu processo de design foca em acessibilidade, consistência e criação de experiências deliciosas para o usuário.',
    serviceAPI: 'Desenvolvimento de API',
    serviceAPIDesc: 'APIs RESTful e GraphQL com autenticação segura.',
    serviceAPIDetailed: 'Construindo APIs robustas e escaláveis que alimentam aplicações modernas. Desenvolvo APIs RESTful e GraphQL com autenticação adequada, limitação de taxa e documentação abrangente. Foco em melhores práticas de segurança, otimização de desempenho e criação de APIs fáceis de integrar e manter.',
    
    // Projects
    projectOne: 'Projeto Um',
    projectOneDesc: 'Uma aplicação web abrangente construída com tecnologias modernas.',
    projectTwo: 'Projeto Dois',
    projectTwoDesc: 'Aplicação mobile-first com recursos em tempo real.',
    projectThree: 'Projeto Três',
    projectThreeDesc: 'Aplicação full-stack com autenticação e banco de dados.',
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
    
    // Education Categories
    categoryUniversity: 'Universitat',
    categoryWebDevelopment: 'Desenvolupament Web',
    categoryFrontend: 'Frontend',
    categoryDevOps: 'DevOps',
    categoryDatabase: 'Base de Dades',
    categoryDataScience: 'Ciència de Dades',
    
    // Education Courses
    courseCS: 'Grau en Ciències de la Computació',
    courseCSDes: 'Grau en Ciències de la Computació centrat en enginyeria de programari i algoritmes.',
    courseFullStack: 'Desenvolupament Web Full Stack',
    courseFullStackDesc: 'Curs complet que cobreix desenvolupament frontend i backend.',
    courseReact: 'React Avançat & Next.js',
    courseReactDesc: 'Patrons moderns de React i framework Next.js.',
    courseDocker: 'Docker & Kubernetes',
    courseDockerDesc: 'Orquestració de contenidors i estratègies de desplegament.',
    courseDatabase: 'Disseny de Bases de Dades & SQL',
    courseDatabaseDesc: 'Disseny de bases de dades relacionals i consultes SQL avançades.',
    coursePython: 'Python per a Ciència de Dades',
    coursePythonDesc: 'Anàlisi de dades, visualització i fonaments d\'aprenentatge automàtic.',
    
    // Tech Stack Categories
    categoryLanguages: 'Llenguatges',
    categoryCloudPlatforms: 'Plataformes al Núvol',
    categoryContainerization: 'Containerització',
    categoryDatabases: 'Bases de Dades',
    categoryMonitoring: 'Monitoratge i Registre',
    
    // Services
    serviceWebDev: 'Desenvolupament Web',
    serviceWebDevDesc: 'Desenvolupament web full-stack utilitzant tecnologies modernes i millors pràctiques.',
    serviceWebDevDetailed: 'Construeixo aplicacions web responsives i rendibles utilitzant frameworks d\'avantguarda com React, Next.js i Vue.js. Des de pàgines de destinació simples fins a plataformes web complexes, lliuro solucions escalables que satisfan les necessitats del teu negoci. La meva experiència inclou desenvolupament frontend i backend, assegurant una experiència perfecta d\'extrem a extrem.',
    serviceMobileDev: 'Desenvolupament Mòbil',
    serviceMobileDevDesc: 'Aplicacions mòbils multiplataforma amb disseny responsiu.',
    serviceMobileDevDetailed: 'Creant aplicacions mòbils natives i multiplataforma per a iOS i Android. Utilitzant tecnologies com React Native i Flutter, desenvolupo aplicacions que proporcionen excel·lent experiència d\'usuari mantenint eficiència de codi entre plataformes. Focus en rendiment, accessibilitat i interfícies d\'usuari intuïtives.',
    serviceUIUX: 'Disseny UI/UX',
    serviceUIUXDesc: 'Disseny centrat en l\'usuari creant interfícies intuïtives i boniques.',
    serviceUIUXDetailed: 'Dissenyant interfícies d\'usuari que són estèticament agradables i altament funcionals. Faig recerca d\'usuaris, creo wireframes i prototips, i realitzo proves d\'usabilitat per assegurar que el producte final satisfà les necessitats de l\'usuari. El meu procés de disseny se centra en accessibilitat, consistència i creació d\'experiències delicioses per a l\'usuari.',
    serviceAPI: 'Desenvolupament d\'API',
    serviceAPIDesc: 'APIs RESTful i GraphQL amb autenticació segura.',
    serviceAPIDetailed: 'Construint APIs robustes i escalables que alimenten aplicacions modernes. Desenvolupo APIs RESTful i GraphQL amb autenticació adequada, limitació de taxa i documentació exhaustiva. Focus en millors pràctiques de seguretat, optimització de rendiment i creació d\'APIs fàcils d\'integrar i mantenir.',
    
    // Projects
    projectOne: 'Projecte U',
    projectOneDesc: 'Una aplicació web completa construïda amb tecnologies modernes.',
    projectTwo: 'Projecte Dos',
    projectTwoDesc: 'Aplicació mobile-first amb característiques en temps real.',
    projectThree: 'Projecte Tres',
    projectThreeDesc: 'Aplicació full-stack amb autenticació i base de dades.',
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
