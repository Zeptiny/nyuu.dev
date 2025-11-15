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
  // heroTitle: string;
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
  formalEducationTitle: string;
  coursesTitle: string;
  certificatesTitle: string;
  ongoing: string;
  completed: string;
  downloadCertificate: string;
  filterAll: string;
  
  // Duration units
  hours: string;
  weeks: string;
  months: string;
  years: string;
  
  // Footer
  footerCopyright: string;
  
  // Contact Section
  contactTitle: string;
  contactSubtitle: string;
  contactDescription: string;
  contactMethods: string;
  contactMethodsDescription: string;
  email: string;
  discord: string;
  github: string;
  sendEmail: string;
  open: string;
  getInTouch: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  sendMessage: string;
  
  // Education Courses
  courseCS: string;
  courseCSDes: string;
  courseCKA: string;
  courseCKADesc: string;
  courseLTC: string;
  courseLTCDesc: string;
  courseMSA: string;
  courseMSADesc: string;
  courseZabbix: string;
  courseZabbixDesc: string;
  courseKubernetes: string;
  courseKubernetesDesc: string;
  courseBackendEngineering: string;
  courseBackendEngineeringDesc: string;
  courseAnsibleAdvanced: string;
  courseAnsibleAdvancedDesc: string;
  courseSystemArchitecture: string;
  courseSystemArchitectureDesc: string;
  
  // Tech Stack & Education Categories
  categoryLanguages: string;
  categoryCloudPlatforms: string;
  categoryContainerization: string;
  categoryDatabases: string;
  categoryMonitoring: string;
  categoryUniversity: string;
  categoryDevOps: string;
  categoryDatabase: string;
  categoryAutomation: string;
  categoryInfrastructureAsCode: string;
  categoryArchitecture: string;
  
  // Services
  serviceManagedHosting: string;
  serviceManagedHostingDesc: string;
  serviceManagedHostingDetailed: string;
  serviceInstallation: string;
  serviceInstallationDesc: string;
  serviceInstallationDetailed: string;
  serviceBackups: string;
  serviceBackupsDesc: string;
  serviceBackupsDetailed: string;
  serviceCustom: string;
  serviceCustomDesc: string;
  serviceCustomDetailed: string;
  
  // Projects
  projectOne: string;
  projectOneDesc: string;
  projectTwo: string;
  projectTwoDesc: string;
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
    // heroTitle: 'Computer Science Student',
    heroSubtitle: 'Site Reliability Engineer & Technology Enthusiast',
    heroDescription: 'I\'m Nyuu, a Computer Science Student passionate about learning new things every day.',
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
    formalEducationTitle: 'Formal Education',
    coursesTitle: 'Courses',
    certificatesTitle: 'Certificates',
    ongoing: 'Ongoing',
    completed: 'Completed',
    downloadCertificate: 'Download Certificate',
    filterAll: 'All',
    
    // Duration units
    hours: 'hours',
    weeks: 'weeks',
    months: 'months',
    years: 'years',
    
    // Footer
    footerCopyright: '© {year} Nyuu. All rights reserved.',
    
    // Contact Section
    contactTitle: 'Get In Touch',
    contactSubtitle: "Let's connect",
    contactDescription: 'Feel free to reach out through any of these platforms',
    contactMethods: 'Contact Methods',
    contactMethodsDescription: 'Choose your preferred way to reach out',
    email: 'Email',
    discord: 'Discord',
    github: 'GitHub',
    sendEmail: 'Send',
    open: 'Open',
    getInTouch: 'Get in Touch',
    namePlaceholder: 'Your Name',
    emailPlaceholder: 'your.email@example.com',
    subjectPlaceholder: 'Subject',
    messagePlaceholder: 'Your message here...',
    sendMessage: 'Send Message',
    
    // Education Categories
    categoryUniversity: 'University',
    categoryDevOps: 'DevOps',
    categoryDatabase: 'Database',
    categoryAutomation: 'Automation',
    categoryInfrastructureAsCode: 'Infrastructure as Code',
    categoryArchitecture: 'System Architecture',

    // Education Courses
    courseCS: 'Computer Science Degree',
    courseCSDes: 'Bachelor\'s degree in Computer Science focusing on software engineering and algorithms.',
    courseCKA: 'Certified Kubernetes Administrator (CKA)',
    courseCKADesc: 'Certification program for Kubernetes administrators.',
    courseLTC: 'Linux Training Course',
    courseLTCDesc: 'Comprehensive training on Linux administration and scripting.',
    courseMSA: 'Microservices Architecture',
    courseMSADesc: 'In-depth course on designing and building microservices.',
    courseZabbix: 'Zabbix - Network and Application Monitoring',
    courseZabbixDesc: 'Training on Zabbix for monitoring and managing IT infrastructure.',
    courseKubernetes: 'Kubernetes Fundamentals',
    courseKubernetesDesc: 'Introduction to Kubernetes for container orchestration.',
    courseBackendEngineering: 'Fundamentals of Backend Engineering',
    courseBackendEngineeringDesc: 'Overview of backend development concepts and practices.',
    courseAnsibleAdvanced: 'Ansible Advanced',
    courseAnsibleAdvancedDesc: 'Advanced topics in Ansible for automation and configuration management.',
    courseSystemArchitecture: 'Software Architecture & Design of Modern Large Scale Systems',
    courseSystemArchitectureDesc: 'Comprehensive course on designing and architecting large-scale software systems.',

    // Tech Stack Categories
    categoryLanguages: 'Languages',
    categoryCloudPlatforms: 'Cloud Platforms',
    categoryContainerization: 'Containerization',
    categoryDatabases: 'Databases',
    categoryMonitoring: 'Monitoring & Logging',
    
    // Services
    serviceManagedHosting: "Managed Hosting",
    serviceManagedHostingDesc: "Reliable, hassle-free hosting where everything is taken care of for you.",
    serviceManagedHostingDetailed: "Enjoy smooth, worry-free hosting with full management included. I handle server setup, updates, security, and monitoring so your apps and websites run at their best, whether it’s on bare metal, virtualized environments, or cloud platforms. You’ll have the performance and stability you need without the stress of maintenance.",
    serviceInstallation: "Installation & Setup",
    serviceInstallationDesc: "Get your infrastructure up and running the right way, from the start.",
    serviceInstallationDetailed: "From Linux servers to Docker stacks and Kubernetes clusters, I make sure everything is properly installed, configured, and ready to go. Whether you’re setting up a new environment or migrating an existing one, I ensure each component works together seamlessly, secure, stable, and optimized for your needs.",
    serviceBackups: "Backups & Recovery",
    serviceBackupsDesc: "Keep your data safe with reliable backup and recovery solutions.",
    serviceBackupsDetailed: "I design and deploy backup strategies that protect your data from loss, downtime, or disasters. Using automated tools and best practices, I ensure your files, databases, and configurations are securely stored and can be restored quickly when needed, giving you peace of mind and business continuity.",
    serviceCustom: "Custom Solutions",
    serviceCustomDesc: "Tailored solutions built around your specific goals and infrastructure.",
    serviceCustomDetailed: "Every project is unique, and sometimes off-the-shelf tools aren’t enough. I create customized setups and automations to fit your workflow, from Dockerized apps and cloud integrations to monitoring dashboards or storage backends. Whatever your challenge, I’ll help you design a solution that’s efficient, scalable, and easy to manage.",

    // Projects
    projectOne: 'Syncr',
    projectOneDesc: 'Open-source web application (in development) designed to synchronize, move, and copy files across remote storage services. Compatible with Amazon S3 and SFTP. Features include scheduled jobs, notifications, multi-user support, and full self-hosting via Docker.',
    projectTwo: 'Tryxia Host',
    projectTwoDesc: 'A discontinued free Minecraft hosting service, created as a learning project. Built to gain hands-on experience with hosting, administration, and troubleshooting servers in real-world scenarios. Before its shutdown, the project had a total of 200+ users and 70+ game servers.',
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
    // heroTitle: 'Estudante de Ciência da Computação',
    heroSubtitle: 'Engenheiro de Confiabilidade de Site & Entusiasta de Tecnologia',
    heroDescription: 'Sou Nyuu, um Estudante de Ciência da Computação apaixonado por aprender coisas novas todos os dias.',
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
    formalEducationTitle: 'Educação Formal',
    coursesTitle: 'Cursos',
    certificatesTitle: 'Certificados',
    ongoing: 'Em andamento',
    completed: 'Concluído',
    downloadCertificate: 'Baixar Certificado',
    filterAll: 'Todos',
    
    // Duration units
    hours: 'horas',
    weeks: 'semanas',
    months: 'meses',
    years: 'anos',
    
    // Footer
    footerCopyright: '© {year} Nyuu. Todos os direitos reservados.',
    
    // Contact Section
    contactTitle: 'Entre em Contato',
    contactSubtitle: 'Vamos nos conectar',
    contactDescription: 'Sinta-se à vontade para entrar em contato através de qualquer uma dessas plataformas',
    contactMethods: 'Métodos de Contato',
    contactMethodsDescription: 'Escolha sua forma preferida de entrar em contato',
    email: 'E-mail',
    discord: 'Discord',
    github: 'GitHub',
    sendEmail: 'Enviar',
    open: 'Abrir',
    getInTouch: 'Entre em Contato',
    namePlaceholder: 'Seu Nome',
    emailPlaceholder: 'seu.email@exemplo.com',
    subjectPlaceholder: 'Assunto',
    messagePlaceholder: 'Sua mensagem aqui...',
    sendMessage: 'Enviar Mensagem',
    
    // Education Categories
    categoryUniversity: 'Universidade',
    categoryDevOps: 'DevOps',
    categoryDatabase: 'Banco de Dados',
    categoryAutomation: 'Automação',
    categoryInfrastructureAsCode: 'Infraestrutura como Código',
    categoryArchitecture: 'Arquitetura de Sistemas',
    
    // Education Courses
    courseCS: 'Graduação em Ciência da Computação',
    courseCSDes: 'Bacharelado em Ciência da Computação com foco em engenharia de software e algoritmos.',
    courseCKA: 'Administrador Certificado Kubernetes (CKA)',
    courseCKADesc: 'Programa de certificação para administradores do Kubernetes.',
    courseLTC: 'Curso de Treinamento em Linux',
    courseLTCDesc: 'Treinamento abrangente em administração e script do Linux.',
    courseMSA: 'Arquitetura de Microsserviços',
    courseMSADesc: 'Curso aprofundado sobre design e construção de microserviços.',
    courseZabbix: 'Zabbix - Monitoramento de Rede e Aplicações',
    courseZabbixDesc: 'Treinamento sobre Zabbix para monitoramento e gerenciamento de infraestrutura de TI.',
    courseKubernetes: 'Fundamentos de Kubernetes',
    courseKubernetesDesc: 'Introdução ao Kubernetes para orquestração de contêineres.',
    courseBackendEngineering: 'Fundamentos de Engenharia Backend',
    courseBackendEngineeringDesc: 'Visão geral dos conceitos e práticas de desenvolvimento backend.',
    courseAnsibleAdvanced: 'Ansible Avançado',
    courseAnsibleAdvancedDesc: 'Tópicos avançados em Ansible para automação e gerenciamento de configuração.',
    courseSystemArchitecture: 'Arquitetura de Software & Design de Sistemas em Larga Escala',
    courseSystemArchitectureDesc: 'Curso abrangente sobre design e arquitetura de sistemas de software em larga escala.',

    // Tech Stack Categories
    categoryLanguages: 'Linguagens',
    categoryCloudPlatforms: 'Plataformas em Nuvem',
    categoryContainerization: 'Containerização',
    categoryDatabases: 'Bancos de Dados',
    categoryMonitoring: 'Monitoramento e Registro',
    
    // Services
    serviceManagedHosting: "Hospedagem Gerenciada",
    serviceManagedHostingDesc: "Hospedagem confiável e descomplicada, onde tudo é cuidado para você.",
    serviceManagedHostingDetailed: "Aproveite hospedagem suave e sem preocupações com gerenciamento total incluído. Eu cuido da configuração do servidor, atualizações, segurança e monitoramento para que seus aplicativos e sites funcionem da melhor forma, seja em bare metal, ambientes virtualizados ou plataformas em nuvem. Você terá o desempenho e a estabilidade que precisa sem o stress da manutenção.",
    serviceInstallation: "Instalação & Configuração",
    serviceInstallationDesc: "Coloque sua infraestrutura em funcionamento da forma correta, desde o início.",
    serviceInstallationDetailed: "De servidores Linux a stacks Docker e clusters Kubernetes, me certifico de que tudo está devidamente instalado, configurado e pronto para usar. Seja configurando um novo ambiente ou migrando um existente, garantisco que cada componente funcione em harmonia, seguro, estável e otimizado para suas necessidades.",
    serviceBackups: "Backups & Recuperação",
    serviceBackupsDesc: "Mantenha seus dados seguros com soluções confiáveis de backup e recuperação.",
    serviceBackupsDetailed: "Projeto e implanto estratégias de backup que protegem seus dados contra perda, tempo de inatividade ou desastres. Usando ferramentas automatizadas e melhores práticas, garanto que seus arquivos, bancos de dados e configurações sejam armazenados com segurança e possam ser restaurados rapidamente quando necessário, oferecendo tranquilidade e continuidade dos negócios.",
    serviceCustom: "Soluções Personalizadas",
    serviceCustomDesc: "Soluções sob medida construídas em torno de seus objetivos e infraestrutura específicos.",
    serviceCustomDetailed: "Cada projeto é único, e às vezes ferramentas prontas não são suficientes. Crio configurações e automações personalizadas para se adequar ao seu fluxo de trabalho, desde aplicativos Dockerizados e integrações em nuvem até dashboards de monitoramento ou backends de armazenamento. Seja qual for seu desafio, ajudarei você a projetar uma solução eficiente, escalável e fácil de gerenciar.",

    // Projects
    projectOne: 'Syncr',
    projectOneDesc: 'Aplicação web de código aberto (em desenvolvimento) projetado para sincronizar, mover e copiar arquivos entre serviços de armazenamento remoto. Compatível com Amazon S3 e SFTP. Os recursos incluem tarefas agendadas, notificações, suporte multiusuário e auto-hospedagem completa via Docker.',
    projectTwo: 'Tryxia Host',
    projectTwoDesc: 'Um serviço descontinuado gratuito de hospedagem Minecraft, criado como um projeto de aprendizado. Criado para adquirir experiência prática com hospedagem, administração e solução de problemas de servidores em cenários do mundo real. Antes de seu encerramento, o projeto teve um total de 200+ usuários e 70+ servidores de jogos.',
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
    // heroTitle: 'Estudiant de Ciències de la Computació',
    heroSubtitle: 'Enginyer de Confiabilitat de Site & Entusiasta de la Tecnologia',
    heroDescription: 'Sóc Nyuu, un Estudiant de Ciències de la Computació, un ser apassionat per aprendre coses noves cada dia.',
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
    formalEducationTitle: 'Educació Formal',
    coursesTitle: 'Cursos',
    certificatesTitle: 'Certificats',
    ongoing: 'En curs',
    completed: 'Completat',
    downloadCertificate: 'Descarregar Certificat',
    filterAll: 'Tots',
    
    // Duration units
    hours: 'hores',
    weeks: 'setmanes',
    months: 'mesos',
    years: 'anys',
    
    // Footer
    footerCopyright: '© {year} Nyuu. Tots els drets reservats.',
    
    // Contact Section
    contactTitle: 'Contacta',
    contactSubtitle: 'Connectem',
    contactDescription: 'No dubtis a contactar-me a través de qualsevol d\'aquestes plataformes',
    contactMethods: 'Mètodes de Contacte',
    contactMethodsDescription: 'Tria la teva forma preferida de contactar',
    email: 'Correu electrònic',
    discord: 'Discord',
    github: 'GitHub',
    sendEmail: 'Enviar',
    open: 'Obrir',
    getInTouch: 'Posa\'t en Contacte',
    namePlaceholder: 'El Teu Nom',
    emailPlaceholder: 'el.teu.correu@exemple.com',
    subjectPlaceholder: 'Assumpte',
    messagePlaceholder: 'El teu missatge aquí...',
    sendMessage: 'Enviar Missatge',
    
    // Education Categories
    categoryUniversity: 'Universitat',
    categoryDevOps: 'DevOps',
    categoryDatabase: 'Base de Dades',
    categoryAutomation: 'Automatització',
    categoryInfrastructureAsCode: 'Infraestructura com a Codi',
    categoryArchitecture: 'Arquitectura de Sistemes',

    // Education Courses
    courseCS: 'Grau en Ciències de la Computació',
    courseCSDes: 'Grau en Ciències de la Computació centrat en enginyeria de programari i algoritmes.',
    courseCKA: 'Administrador Certificat Kubernetes (CKA)',
    courseCKADesc: 'Preparació per a l\'examen de certificació CKA.',
    courseLTC: 'Curs de Formació en Linux',
    courseLTCDesc: 'Formació completa en administració de sistemes Linux.',
    courseMSA: 'Arquitectura de Microsservicis',
    courseMSADesc: 'Disseny i implementació de microsservicis.',
    courseZabbix: 'Zabbix - Monitoratge de Xarxa i Aplicacions',
    courseZabbixDesc: 'Monitoratge de xarxes i aplicacions amb Zabbix.',
    courseKubernetes: 'Kubernetes - Orquestració de Contenidors',
    courseKubernetesDesc: 'Introducció a Kubernetes per a l\'orquestració de contenidors.',
    courseBackendEngineering: 'Enginyeria Backend',
    courseBackendEngineeringDesc: 'Fundaments de l\'enginyeria backend i desenvolupament d\'APIs.',
    courseAnsibleAdvanced: 'Ansible Avançat',
    courseAnsibleAdvancedDesc: 'Tópics avançats en Ansible per a l\'automatització i gestió de configuracions.',
    courseSystemArchitecture: 'Arquitectura de Software i Disseny de Sistemes a Gran Escala',
    courseSystemArchitectureDesc: 'Disseny i arquitectura de sistemes de software a gran escala.',
    
    // Tech Stack Categories
    categoryLanguages: 'Llenguatges',
    categoryCloudPlatforms: 'Plataformes al Núvol',
    categoryContainerization: 'Containerització',
    categoryDatabases: 'Bases de Dades',
    categoryMonitoring: 'Monitoratge i Registre',
    
    // Services
    serviceManagedHosting: "Hospedatge Gestionat",
    serviceManagedHostingDesc: "Hospedatge fiable i descomplicat, on tot és cuidat per a tu.",
    serviceManagedHostingDetailed: "Gaudeix d'un hospedatge suau i sense preocupacions amb gestió total inclosa. Em faig càrrec de la configuració del servidor, actualitzacions, seguretat i monitoratge perquè les teves aplicacions i llocs web funcionin al millor nivell, ja sigui en bare metal, entorns virtualitzats o plataformes al núvol. Tindràs el rendiment i l'estabilitat que necessites sense l'estrès del manteniment.",
    serviceInstallation: "Instal·lació i Configuració",
    serviceInstallationDesc: "Posa la teva infraestructura en funcionament de la manera correcta, des del principi.",
    serviceInstallationDetailed: "Des de servidors Linux a stacks Docker i clústers Kubernetes, m'asseguro que tot està correctament instal·lat, configurat i a punt per usar. Ja sigui configurant un entorn nou o migrant un d'existent, garanteixo que cada component funcioni en harmonia, segur, estable i optimitzat per a les teves necessitats.",
    serviceBackups: "Còpies de Seguretat i Recuperació",
    serviceBackupsDesc: "Manté les teves dades segures amb solucions fiables de còpia de seguretat i recuperació.",
    serviceBackupsDetailed: "Dissenyo i desplegó estratègies de còpia de seguretat que protegeixen les teves dades contra pérdua, temps d'inactivitat o desastres. Utilitzant eines automatitzades i millors pràctiques, garanteixo que els teus fitxers, bases de dades i configuracions estiguin emmagatzemats de forma segura i puguin ser restaurats ràpidament quan sigui necessari, oferint tranquil·litat i continuïtat empresarial.",
    serviceCustom: "Solucions Personalitzades",
    serviceCustomDesc: "Solucions personalitzades construïdes al voltant dels teus objectius i infraestructura específics.",
    serviceCustomDetailed: "Cada projecte és únic, i a vegades les eines estàndard no són suficients. Creo configuracions i automatitzacions personalitzades per adaptar-se al teu flux de treball, des d'aplicacions Dockeritzades i integracions al núvol fins a dashboards de monitoratge o backends d'emmagatzematge. Sigui quin sigui el teu desafiament, t'ajudaré a dissenyar una solució eficient, escalable i fàcil de gestionar.",

    // Projects
    projectOne: 'Syncr',
    projectOneDesc: 'Aplicació web de codi obert (en desenvolupament) dissenyada per sincronitzar, moure i copiar fitxers entre serveis d\'emmagatzematge remots. Compatible amb Amazon S3 i SFTP. Funcions inclouen tasques programades, notificacions, suport multiusuari i autohostejament complet amb Docker.',
    projectTwo: 'Tryxia Host',
    projectTwoDesc: 'Un servei descontinuat gratuït de hospedatge Minecraft, creat com un projecte de aprenentatge. Creat per adquirir experiència pràctica amb hospedatge, administració i solució de problemes de servidors en escenaris del món real. Abans del seu tancament, el projecte va tenir un total de 200+ usuaris i 70+ servidors de jocs.',
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
