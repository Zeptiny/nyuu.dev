'use client';

import { useLanguage } from '@/app/context/LanguageContext';

interface Technology {
  name: string;
  icon?: string; // DevIcon class name (e.g., 'devicon-react-original')
}

interface TechCategory {
  categoryKey: string; // Translation key for category name
  technologies: Technology[];
}

export default function StackSection() {
  const { t } = useLanguage();

  // Placeholder tech stack - replace with actual data
  const techStack: TechCategory[] = [
    {
      categoryKey: 'categoryLanguages',
      technologies: [
        { name: 'Python', icon: 'devicon-python-plain' },
        { name: 'C++', icon: 'devicon-cplusplus-plain' },
        { name: 'C', icon: 'devicon-c-plain' },
        { name: 'Java', icon: 'devicon-java-plain' },
        { name: 'Bash', icon: 'devicon-bash-plain' },
        { name: 'Dart', icon: 'devicon-dart-plain' },
        { name: 'JavaScript', icon: 'devicon-javascript-plain' },
        { name: 'Assembly', icon: 'devicon-wasm-original' },
      ],
    },
    {
      categoryKey: 'categoryCloudPlatforms',
      technologies: [
        { name: 'Hetzner' },
        { name: 'Oracle', icon: 'devicon-oracle-original' },
        { name: 'Digital Ocean', icon: 'devicon-digitalocean-original' },
        { name: 'AWS', icon: 'devicon-amazonwebservices-plain-wordmark' },
        { name: 'GCP', icon: 'devicon-googlecloud-plain' },
        { name: 'Azure', icon: 'devicon-azure-plain' },
      ],
    },
    {
      categoryKey: 'categoryContainerization',
      technologies: [
        { name: 'Docker', icon: 'devicon-docker-plain' },
        { name: 'Kubernetes', icon: 'devicon-kubernetes-plain' },
      ],
    },
    {
      categoryKey: 'categoryDatabases',
      technologies: [
        { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
        { name: 'MariaDB', icon: 'devicon-mariadb-original' },
        { name: 'MySQL', icon: 'devicon-mysql-original' },
        { name: 'Oracle', icon: 'devicon-oracle-original' },
      ],
    },
    {
      categoryKey: 'categoryMonitoring',
      technologies: [
        { name: 'Zabbix' },
        { name: 'Prometheus', icon: 'devicon-prometheus-original' },
        { name: 'Grafana', icon: 'devicon-grafana-plain' },
      ],
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

        <div className="max-w-6xl mx-auto space-y-8">
          {techStack.map((category, index) => (
            <div key={index}>
              <h3 className="text-2xl font-bold mb-4">{t[category.categoryKey as keyof typeof t]}</h3>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="card card-compact bg-base-100 shadow hover:shadow-lg transition-shadow"
                  >
                    <div className="card-body">
                      <p className="flex items-center gap-2 whitespace-nowrap">
                        {tech.icon && <i className={`${tech.icon} text-xl`}></i>}
                        {tech.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
