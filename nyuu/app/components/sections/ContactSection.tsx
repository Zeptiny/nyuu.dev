'use client';

import { useLanguage } from '@/app/context/LanguageContext';

interface ContactMethod {
  id: string;
  name: string;
  icon: string;
  value: string;
  url: string;
  color: string;
}

export default function ContactSection() {
  const { t } = useLanguage();

  // Placeholder contact methods - replace with actual data
  const contactMethods: ContactMethod[] = [
    {
      id: 'email',
      name: t.email,
      icon: '📧',
      value: 'your.email@example.com',
      url: 'mailto:your.email@example.com',
      color: 'btn-primary',
    },
    {
      id: 'github',
      name: t.github,
      icon: '🐙',
      value: 'github.com/yourusername',
      url: 'https://github.com/yourusername',
      color: 'btn-neutral',
    },
    {
      id: 'discord',
      name: t.discord,
      icon: '💬',
      value: 'yourusername#0000',
      url: '#',
      color: 'btn-secondary',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.contactTitle}</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-2">
            {t.contactSubtitle}
          </p>
          <p className="text-base-content/60">
            {t.contactDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contactMethods.map((method) => (
            <div key={method.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="text-6xl mb-4">{method.icon}</div>
                <h3 className="card-title text-xl mb-2">{method.name}</h3>
                <p className="text-sm text-base-content/70 mb-4 break-all">{method.value}</p>
                <div className="card-actions">
                  <a
                    href={method.url}
                    target={method.id !== 'email' ? '_blank' : undefined}
                    rel={method.id !== 'email' ? 'noopener noreferrer' : undefined}
                    className={`btn ${method.color}`}
                  >
                    {method.id === 'email' ? 'Send Email' : `Open ${method.name}`}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
