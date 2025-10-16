'use client';

import { useLanguage } from '@/app/context/LanguageContext';

interface TechCategory {
  category: string;
  technologies: string[];
}

export default function StackSection() {
  const { t } = useLanguage();

  // Placeholder tech stack - replace with actual data
  const techStack: TechCategory[] = [
    {
      category: 'Frontend',
      technologies: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'DaisyUI'],
    },
    {
      category: 'Backend',
      technologies: ['Node.js', 'Express', 'Python', 'FastAPI', 'Django'],
    },
    {
      category: 'Database',
      technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Firebase'],
    },
    {
      category: 'DevOps & Tools',
      technologies: ['Git', 'Docker', 'AWS', 'Vercel', 'GitHub Actions'],
    },
    {
      category: 'Mobile',
      technologies: ['React Native', 'Flutter', 'Expo'],
    },
    {
      category: 'Other',
      technologies: ['GraphQL', 'REST APIs', 'WebSockets', 'Jest', 'Playwright'],
    },
  ];

  return (
    <section id="stack" className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.stackTitle}</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            {t.stackSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStack.map((category, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-4 text-primary">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="badge badge-lg badge-outline">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
