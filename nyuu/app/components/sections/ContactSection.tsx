'use client';

import { useLanguage } from '@/app/context/LanguageContext';

interface ContactMethod {
  id: string;
  name: string;
  icon: string; // SVG or icon class
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
      icon: 'envelope',
      value: 'your.email@example.com',
      url: 'mailto:your.email@example.com',
      color: 'btn-primary',
    },
    {
      id: 'github',
      name: t.github,
      icon: 'devicon-github-original',
      value: 'github.com/yourusername',
      url: 'https://github.com/yourusername',
      color: 'btn-neutral',
    },
    {
      id: 'discord',
      name: t.discord,
      icon: 'chat',
      value: 'yourusername#0000',
      url: '#',
      color: 'btn-secondary',
    },
  ];

  const renderIcon = (method: ContactMethod) => {
    if (method.icon.startsWith('devicon-')) {
      return <i className={`${method.icon} text-6xl`}></i>;
    }
    
    // SVG icons for email and discord
    if (method.id === 'email') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    }
    
    if (method.id === 'discord') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      );
    }
    
    return null;
  };

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
                <div className="mb-4">{renderIcon(method)}</div>
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
