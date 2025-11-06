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
        { name: 'Bash', icon: 'devicon-bash-plain' },
        { name: 'Java', icon: 'devicon-java-plain' },
      ],
    },
    {
      categoryKey: 'categoryCloudPlatforms',
      technologies: [
        { name: 'Hetzner' },
        { name: 'Scaleway' },
        { name: 'Oracle', icon: 'devicon-oracle-original' },
        { name: 'Digital Ocean', icon: 'devicon-digitalocean-original' },
        { name: 'AWS', icon: 'devicon-amazonwebservices-plain-wordmark' },
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
    {
      categoryKey: 'categoryInfrastructureAsCode',
      technologies: [
        { name: 'Ansible', icon: 'devicon-ansible-plain' },
      ],
    },
  ];

  return (
    <section id="stack" className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.stackTitle}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-primary mx-auto mb-4"></div>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            {t.stackSubtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {techStack.map((category, index) => {
            // Calculate position in gradient (0 to 1) based on index
            const totalCategories = techStack.length;
            const position = index / (totalCategories - 1); // 0, 0.25, 0.5, 0.75, 1
            
            // Create color stops: primary (0%) -> secondary (33%) -> accent (66%) -> accent (100%)
            // This creates a smooth gradient from primary to accent through secondary
            let gradientColor;
            if (position <= 0.33) {
              // Between primary and secondary
              gradientColor = `color-mix(in oklch, var(--color-primary) ${(1 - position / 0.33) * 100}%, var(--color-secondary) ${(position / 0.33) * 100}%)`;
            } else if (position <= 0.66) {
              // Between secondary and accent
              const localPos = (position - 0.33) / 0.33;
              gradientColor = `color-mix(in oklch, var(--color-secondary) ${(1 - localPos) * 100}%, var(--color-accent) ${localPos * 100}%)`;
            } else {
              // Between accent and accent (stays accent)
              gradientColor = `var(--color-accent)`;
            }
            
            return (
              <div key={index} className="border-l-4 pl-6 hover:border-opacity-100 transition-all" style={{ borderColor: gradientColor }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: gradientColor }}>{t[category.categoryKey as keyof typeof t]}</h3>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="card card-compact bg-base-100 shadow hover:shadow-lg transition-all group hover:scale-105"
                  >
                    <div className="card-body">
                      <p 
                        className="flex items-center gap-2 whitespace-nowrap text-base-content transition-colors"
                        style={{
                          // @ts-ignore - CSS custom property for hover
                          '--hover-color': gradientColor,
                        } as React.CSSProperties}
                      >
                        {tech.icon && <i className={`${tech.icon} text-xl`}></i>}
                        {tech.name}
                      </p>
                    </div>
                    <style jsx>{`
                      .group:hover p {
                        color: ${gradientColor};
                      }
                    `}</style>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
