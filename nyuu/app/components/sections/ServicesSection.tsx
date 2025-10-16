'use client';

import { useLanguage } from '@/app/context/LanguageContext';

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export default function ServicesSection() {
  const { t } = useLanguage();

  // Placeholder services - replace with actual data
  const services: Service[] = [
    {
      id: '1',
      icon: '💻',
      title: 'Web Development',
      description: 'Full-stack web development using modern technologies and best practices.',
    },
    {
      id: '2',
      icon: '📱',
      title: 'Mobile Development',
      description: 'Cross-platform mobile applications with responsive design.',
    },
    {
      id: '3',
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'User-centered design creating intuitive and beautiful interfaces.',
    },
    {
      id: '4',
      icon: '🔧',
      title: 'API Development',
      description: 'RESTful and GraphQL APIs with secure authentication.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.servicesTitle}</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            {t.servicesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="text-6xl mb-4">{service.icon}</div>
                <h3 className="card-title text-xl mb-2">{service.title}</h3>
                <p className="text-base-content/70">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
