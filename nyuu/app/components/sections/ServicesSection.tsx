'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Service {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  imageLight?: string; // Image for light theme
  imageDark?: string;  // Image for dark theme
}

export default function ServicesSection() {
  const { t } = useLanguage();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get initial theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'dark' || currentTheme === 'light') {
        setTheme(currentTheme);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  // Placeholder services - replace with actual data
  const services: Service[] = [
    {
      id: '1',
      title: 'Web Development',
      description: 'Full-stack web development using modern technologies and best practices.',
      detailedDescription: 'I build responsive, performant web applications using cutting-edge frameworks like React, Next.js, and Vue.js. From simple landing pages to complex web platforms, I deliver scalable solutions that meet your business needs. My expertise includes both frontend and backend development, ensuring a seamless end-to-end experience.',
      imageLight: '/services/web-dev-light.svg',
      imageDark: '/services/web-dev-dark.svg',
    },
    {
      id: '2',
      title: 'Mobile Development',
      description: 'Cross-platform mobile applications with responsive design.',
      detailedDescription: 'Creating native and cross-platform mobile applications for iOS and Android. Using technologies like React Native and Flutter, I develop apps that provide excellent user experience while maintaining code efficiency across platforms. Focus on performance, accessibility, and intuitive user interfaces.',
      imageLight: '/services/mobile-dev-light.svg',
      imageDark: '/services/mobile-dev-dark.svg',
    },
    {
      id: '3',
      title: 'UI/UX Design',
      description: 'User-centered design creating intuitive and beautiful interfaces.',
      detailedDescription: 'Designing user interfaces that are both aesthetically pleasing and highly functional. I conduct user research, create wireframes and prototypes, and perform usability testing to ensure the final product meets user needs. My design process focuses on accessibility, consistency, and creating delightful user experiences.',
      imageLight: '/services/ui-ux-light.svg',
      imageDark: '/services/ui-ux-dark.svg',
    },
    {
      id: '4',
      title: 'API Development',
      description: 'RESTful and GraphQL APIs with secure authentication.',
      detailedDescription: 'Building robust, scalable APIs that power modern applications. I develop RESTful and GraphQL APIs with proper authentication, rate limiting, and comprehensive documentation. Focus on security best practices, performance optimization, and creating APIs that are easy to integrate and maintain.',
      imageLight: '/services/api-dev-light.svg',
      imageDark: '/services/api-dev-dark.svg',
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <section id="services" className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.servicesTitle}</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            {t.servicesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service) => {
            const currentImage = theme === 'dark' ? service.imageDark : service.imageLight;
            
            return (
              <div key={service.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                {currentImage && (
                  <figure className="px-8 pt-8">
                    <div className="w-full h-48 relative">
                      <Image
                        src={currentImage}
                        alt={service.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </figure>
                )}
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-2">{service.title}</h3>
                  <p className="text-base-content/80 font-medium mb-3">{service.description}</p>
                  {service.detailedDescription && (
                    <p className="text-base-content/60 text-sm leading-relaxed">
                      {service.detailedDescription}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
