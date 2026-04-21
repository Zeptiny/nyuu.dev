import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import ProjectsSection from './components/sections/ProjectsSection';
import StackSection from './components/sections/StackSection';
import EducationSection from './components/sections/EducationSection';
import ContactSection from './components/sections/ContactSection';
import LatestPostsSection from './components/sections/LatestPostsSection';
import Footer from './components/Footer';
import { getAllPosts } from '@/lib/blog';
import type { Language } from '@/app/context/LanguageContext';
import type { BlogPostMeta } from '@/lib/blog/types';

const LANGUAGES: Language[] = ['en', 'pt', 'ca'];

export default function Home() {
  const postsByLang: Record<string, BlogPostMeta[]> = {};
  for (const lang of LANGUAGES) {
    postsByLang[lang] = getAllPosts(lang);
  }

  return (
    <main className='cursor-default'>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <StackSection />
      <EducationSection />
      <LatestPostsSection postsByLang={postsByLang} />
      <ContactSection />
      <Footer />
    </main>
  );
}
