'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Service {
  id: string;
  titleKey: string; // Translation key for title
  descriptionKey: string; // Translation key for description
  detailedDescriptionKey?: string; // Translation key for detailed description
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
      titleKey: 'serviceManagedHosting',
      descriptionKey: 'serviceManagedHostingDesc',
      detailedDescriptionKey: 'serviceManagedHostingDetailed',
      imageLight: '/services/web-dev-light.svg',
      imageDark: '/services/web-dev-dark.svg',
    },
    {
      id: '2',
      titleKey: 'serviceInstallation',
      descriptionKey: 'serviceInstallationDesc',
      detailedDescriptionKey: 'serviceInstallationDetailed',
      imageLight: '/services/mobile-dev-light.svg',
      imageDark: '/services/mobile-dev-dark.svg',
    },
    {
      id: '3',
      titleKey: 'serviceBackups',
      descriptionKey: 'serviceBackupsDesc',
      detailedDescriptionKey: 'serviceBackupsDetailed',
      imageLight: '/services/ui-ux-light.svg',
      imageDark: '/services/ui-ux-dark.svg',
    },
    {
      id: '4',
      titleKey: 'serviceCustom',
      descriptionKey: 'serviceCustomDesc',
      detailedDescriptionKey: 'serviceCustomDetailed',
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
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4"></div>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            {t.servicesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const currentImage = theme === 'dark' ? service.imageDark : service.imageLight;
            
            // Calculate position in gradient (0 to 1) based on index
            const totalServices = services.length;
            const position = index / (totalServices - 1); // 0, 0.33, 0.66, 1
            
            // Create color stops: primary -> secondary -> accent -> info
            let borderColor;
            if (position <= 0.33) {
              // Between primary and secondary
              borderColor = `color-mix(in oklch, var(--color-primary) ${(1 - position / 0.33) * 100}%, var(--color-secondary) ${(position / 0.33) * 100}%)`;
            } else if (position <= 0.66) {
              // Between secondary and accent
              const localPos = (position - 0.33) / 0.33;
              borderColor = `color-mix(in oklch, var(--color-secondary) ${(1 - localPos) * 100}%, var(--color-accent) ${localPos * 100}%)`;
            } else {
              // Between accent and accent (stays accent)
              borderColor = `var(--color-accent)`;
            }
            
            return (
              <div 
                key={service.id} 
                className="card bg-base-100 shadow-xl border-t-4 border-transparent transition-all will-change-transform hover:scale-105"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderTopColor = borderColor;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderTopColor = 'transparent';
                }}
              >
                {currentImage && (
                  <figure className="px-8 pt-8">
                    <div className="w-full h-48 relative">
                      <Image
                        src={currentImage}
                        alt={t[service.titleKey as keyof typeof t] as string}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </figure>
                )}
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-2">{t[service.titleKey as keyof typeof t]}</h3>
                  <p className="text-base-content/80 font-medium mb-3">{t[service.descriptionKey as keyof typeof t]}</p>
                  {service.detailedDescriptionKey && (
                    <p className="text-base-content/60 text-sm leading-relaxed">
                      {t[service.detailedDescriptionKey as keyof typeof t]}
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
