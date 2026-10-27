import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type ProjectStatus } from "@/content/projects";
import type { Dictionary } from "@/i18n/dictionaries";
import { KeyValues, PageSection, Tag } from "@/shared/components/page";
import { cn } from "@/shared/lib/cn";
import { Badge, type BadgeTone } from "@/shared/ui/badge";

const STATUS_TONE: Record<ProjectStatus, BadgeTone> = {
  live: "success",
  development: "accent",
  discontinued: "neutral",
};

export function Projects({ t }: { t: Dictionary }) {
  return (
    <PageSection id="projects" title={t.projects.title} note={t.projects.note}>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {PROJECTS.map((project) => {
          const live = project.status === "live";
          return (
            <article
              key={project.id}
              className={cn(
                "flex flex-col gap-3 border p-4",
                live ? "border-ink bg-panel" : "border-rule2 bg-transparent",
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="m-0 text-16 font-medium">{project.name}</h3>
                <Badge tone={STATUS_TONE[project.status]} className="text-12 text-muted">
                  {t.projects.status[project.status]}
                </Badge>
              </div>
              <p className="m-0 text-13 leading-[1.5] text-pretty text-muted">
                {t.projects.items[project.id].description}
              </p>
              {project.facts && (
                <KeyValues
                  items={project.facts.map((fact) => ({
                    label: t.projects.facts[fact.id],
                    value: fact.value,
                  }))}
                />
              )}
              <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <Tag className="px-2 py-[3px] text-11">{tag}</Tag>
                  </li>
                ))}
              </ul>
              {(project.site ?? project.github) && (
                <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-1 text-13">
                  {project.site && (
                    <ExternalLink href={project.site}>
                      {project.site.replace("https://", "")}
                    </ExternalLink>
                  )}
                  {project.github && (
                    <ExternalLink href={project.github}>{t.projects.github}</ExternalLink>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </PageSection>
  );
}

function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-acc-ink"
    >
      {children}
      <ArrowUpRight aria-hidden className="size-3.5" />
    </a>
  );
}
