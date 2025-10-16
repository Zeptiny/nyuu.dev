'use client';

import { useLanguage } from '@/app/context/LanguageContext';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  websiteUrl?: string;
  githubUrl?: string;
}

export default function ProjectsSection() {
  const { t } = useLanguage();

  // Placeholder projects - replace with actual data
  const projects: Project[] = [
    {
      id: '1',
      title: 'Project One',
      description: 'A comprehensive web application built with modern technologies.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      websiteUrl: '#',
      githubUrl: '#',
    },
    {
      id: '2',
      title: 'Project Two',
      description: 'Mobile-first application with real-time features.',
      technologies: ['React Native', 'Firebase', 'Node.js'],
      githubUrl: '#',
    },
    {
      id: '3',
      title: 'Project Three',
      description: 'Full-stack application with authentication and database.',
      technologies: ['Vue.js', 'Express', 'MongoDB', 'Docker'],
      websiteUrl: '#',
      githubUrl: '#',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.projectsTitle}</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            {t.projectsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all">
              {project.image && (
                <figure className="px-4 pt-4">
                  <div className="w-full h-48 bg-base-300 rounded-xl"></div>
                </figure>
              )}
              <div className="card-body">
                <h3 className="card-title text-2xl">{project.title}</h3>
                <p className="text-base-content/70 mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">{t.technologies}:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="badge badge-primary badge-outline">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="card-actions justify-end">
                  {project.websiteUrl && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      {t.viewProject}
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      {t.viewGithub}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
