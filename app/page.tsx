'use client';

import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import ProjectsSection from './components/sections/ProjectsSection';
import StackSection from './components/sections/StackSection';
import EducationSection from './components/sections/EducationSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className='cursor-default'>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <StackSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
