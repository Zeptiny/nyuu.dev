'use client';

import Image from 'next/image';
import { useLanguage } from '@/app/context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12">
        {/* Persona Image */}
        <div className="hidden lg:block flex-shrink-0">
          <div className="avatar">
            <div>
              <Image
                src="https://placehold.co/400x400/png"
                alt="Persona Image"
                width={400}
                height={400}
                priority
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            Howdy Hey!
          </h1>
          {/* <h2 className="text-2xl md:text-4xl font-semibold mb-4">
            {t.heroTitle}
          </h2> */}
          <p className="text-xl md:text-2xl text-base-content/70 mb-6">
            {t.heroSubtitle}
          </p>
          <p className="text-lg mb-8">
            {t.heroDescription}
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap mb-12">
            <button onClick={() => scrollToSection('services')} className="btn btn-primary btn-lg">
              {t.services}
            </button>
            <button onClick={() => scrollToSection('contact')} className="btn btn-outline btn-lg">
              {t.contact}
            </button>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={() => scrollToSection('services')}
              className="btn btn-ghost btn-circle animate-bounce hover:text-primary"
              aria-label={t.scrollDown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
