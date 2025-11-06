'use client';

import Image from 'next/image';
import { useLanguage } from '@/app/context/LanguageContext';
import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

interface ContactMethod {
  id: string;
  name: string;
  icon: string; // SVG or icon class
  value: string;
  url: string;
  color: string;
}

export default function ContactSection() {
  const { t, language } = useLanguage();
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Placeholder contact methods - replace with actual data
  const contactMethods: ContactMethod[] = [
    {
      id: 'email',
      name: t.email,
      icon: 'envelope',
      value: 'me@nyuu.dev',
      url: 'mailto:me@nyuu.dev',
      color: 'btn-primary',
    },
    {
      id: 'github',
      name: t.github,
      icon: 'devicon-github-original',
      value: 'Zeptiny',
      url: 'https://github.com/Zeptiny',
      color: 'btn-secondary',
    },
    {
      id: 'discord',
      name: t.discord,
      icon: 'chat',
      value: 'Nyuuzin',
      url: 'https://dc.nyuu.dev',
      color: 'btn-accent',
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    // Check if CAPTCHA token is available
    if (!turnstileToken) {
      setSubmitStatus({
        type: 'error',
        message: 'Please complete the CAPTCHA verification before submitting.',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          token: turnstileToken,
          language,
        }),
      });

      const data = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Your message has been sent successfully!',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTurnstileToken('');
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to send your message. Please try again.',
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred while sending your message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section id="contact" className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.contactTitle}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary to-primary mx-auto mb-4"></div>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-2">
            {t.contactSubtitle}
          </p>
          <p className="text-base-content/60">
            {t.contactDescription}
          </p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

          {/* Persona Image - Pointing */}
          <div className="hidden lg:flex justify-center mb-12">
            <div className="avatar">
              <div>
                <Image
                  src="/persona/pointing.webp"
                  alt="Pointing"
                  width={1100}
                  height={1200}
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-2xl mb-6">{t.getInTouch}</h3>
              
              {/* Status Message */}
              {submitStatus.type && (
                <div role="alert" className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-error'} mb-4`}>
                  <span>{submitStatus.message}</span>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Name Field */}
                <label className="input input-bordered flex items-center gap-2 w-full focus-within:border-primary focus-within:ring-1 focus-within:ring-primary focus-within:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input 
                    type="text" 
                    name="name"
                    className="grow outline-none" 
                    placeholder={t.namePlaceholder} 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </label>

                {/* Email Field */}
                <label className="input input-bordered flex items-center gap-2 w-full focus-within:border-primary focus-within:ring-1 focus-within:ring-primary focus-within:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input 
                    type="email" 
                    name="email"
                    className="grow outline-none" 
                    placeholder={t.emailPlaceholder} 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </label>

                {/* Subject Field */}
                <label className="input input-bordered flex items-center gap-2 w-full focus-within:border-primary focus-within:ring-1 focus-within:ring-primary focus-within:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <input 
                    type="text" 
                    name="subject"
                    className="grow w-full outline-none" 
                    placeholder={t.subjectPlaceholder} 
                    value={formData.subject}
                    onChange={handleInputChange}
                    required 
                  />
                </label>

                {/* Message Field */}
                <label className="form-control">
                  <textarea 
                    name="message"
                    className="textarea textarea-bordered h-32 w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                    placeholder={t.messagePlaceholder}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </label>

                {/* Turnstile CAPTCHA - Required */}
                {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
                  <div className="flex justify-center my-4">
                    <Turnstile
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                      onSuccess={(token: string) => setTurnstileToken(token)}
                      onError={() => setTurnstileToken('')}
                    />
                  </div>
                ) : (
                  <div role="alert" className="alert alert-warning mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0-6a4 4 0 100 8 4 4 0 000-8zm0-1a5 5 0 110 10 5 5 0 010-10z" />
                    </svg>
                    <span>CAPTCHA is not configured. Please set NEXT_PUBLIC_TURNSTILE_SITE_KEY in environment variables.</span>
                  </div>
                )}

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="btn btn-primary btn-block mt-4"
                  disabled={isSubmitting || !turnstileToken}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      {t.sendMessage}
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      {t.sendMessage}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4'>
          {contactMethods.map((method) => (
            <div key={method.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all hover:scale-105 will-change-transform">
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">{renderIcon(method)}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">{method.name}</h4>
                    <p className="text-sm text-base-content/70 break-all">{method.value}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <a
                      href={method.url}
                      target={method.id !== 'email' ? '_blank' : undefined}
                      rel={method.id !== 'email' ? 'noopener noreferrer' : undefined}
                      className={`btn btn-sm ${method.color}`}
                    >
                      {method.id === 'email' ? t.sendEmail : t.open}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
