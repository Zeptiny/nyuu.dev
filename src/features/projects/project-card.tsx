import { ArrowRight } from "lucide-react";
import { type Project, projectPath } from "@/content/projects";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath, type Language } from "@/i18n/languages";
import { ExternalLink } from "@/shared/components/external-link";
import { cn } from "@/shared/lib/cn";
import { ToolTag } from "@/features/home/tool-tag";
import { StatusBadge } from "@/features/projects/status-badge";

/**
 * A project in a card, a live one on panel paper. The name links to the project's page and its hit
 * area covers the card; the links off the site sit above it.
 */
export function ProjectCard({
  project,
  language,
  t,
}: {
  project: Project;
  language: Language;
  t: Dictionary;
}) {
  const live = project.status === "live";
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-3 border p-4 transition-[border-color,box-shadow] hover:border-acc hover:shadow-[4px_4px_0_var(--acc-soft)]",
        live ? "border-ink bg-panel" : "border-rule2 bg-transparent",
      )}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="m-0 text-16 font-medium">
          <a
            href={localePath(language, projectPath(project.id))}
            className="inline-flex items-center gap-1.5 transition-colors group-hover:text-acc-ink group-hover:opacity-100 after:absolute after:inset-0"
          >
            {project.name}
            <ArrowRight
              aria-hidden
              className="size-3.5 text-muted transition-[translate,color] group-hover:text-acc-ink motion-safe:group-hover:translate-x-0.5"
            />
          </a>
        </h3>
        <StatusBadge status={project.status} t={t} className="text-12 text-muted" />
      </div>
      <p className="m-0 text-13 leading-[1.5] text-pretty text-muted">
        {t.projects.items[project.id].description}
      </p>
      <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
        {project.tags.map((tag) => (
          <li key={tag}>
            <ToolTag name={tag} className="px-2 py-[3px] text-11" />
          </li>
        ))}
      </ul>
      {(project.site ?? project.github) && (
        <div className="relative mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-1 text-13">
          {project.site && (
            <ExternalLink href={project.site}>{project.site.replace("https://", "")}</ExternalLink>
          )}
          {project.github && <ExternalLink href={project.github}>{t.projects.github}</ExternalLink>}
        </div>
      )}
    </article>
  );
}
