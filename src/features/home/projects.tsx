import { PROJECTS } from "@/content/projects";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Language } from "@/i18n/languages";
import { PageSection } from "@/shared/components/page";
import { ProjectCard } from "@/features/projects/project-card";

export function Projects({ language, t }: { language: Language; t: Dictionary }) {
  return (
    <PageSection id="projects" title={t.projects.title} note={t.projects.note}>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} language={language} t={t} />
        ))}
      </div>
    </PageSection>
  );
}
