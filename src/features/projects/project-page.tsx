import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { type Project, PROJECTS } from "@/content/projects";
import { type Dictionary, fill } from "@/i18n/dictionaries";
import { localePath, type Language } from "@/i18n/languages";
import { ExternalLink } from "@/shared/components/external-link";
import { Eyebrow, KeyValues, PageSection, Panel } from "@/shared/components/page";
import { Button } from "@/shared/ui/button";
import { ToolTag } from "@/features/home/tool-tag";
import { ProjectCard } from "@/features/projects/project-card";
import { StatusBadge } from "@/features/projects/status-badge";

/**
 * A project's page: what it is beside the facts, its first screenshot, what it does, the rest of
 * the screenshots, how it's built, and the other projects.
 */
export function ProjectPage({
  project,
  language,
  t,
}: {
  project: Project;
  language: Language;
  t: Dictionary;
}) {
  const text = t.projects.items[project.id];
  const labels = t.projects.page;
  const [lead, ...gallery] = project.shots;
  const others = PROJECTS.filter((other) => other.id !== project.id);
  // Each project's captions have their own keys; the project's shots are checked against them.
  const captions: Record<string, string> = text.shots;
  const shot = (name: string, eager = false) => (
    <Screenshot
      key={name}
      src={`/projects/${project.id}/${name}`}
      id={`${project.id}-${name}`}
      caption={captions[name] ?? ""}
      eager={eager}
    />
  );

  return (
    <>
      <section aria-labelledby="project-title" className="flex flex-col gap-10">
        <a
          href={`${localePath(language)}#projects`}
          className="inline-flex w-fit items-center gap-1.5 py-1 text-13 text-muted transition-colors hover:text-ink hover:opacity-100"
        >
          <ArrowLeft aria-hidden className="size-3.5" />
          {labels.back}
        </a>
        <div className="flex flex-wrap items-end gap-x-12 gap-y-10">
          <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-[22px]">
            <Eyebrow>{text.eyebrow}</Eyebrow>
            <h1
              id="project-title"
              className="m-0 text-[42px] leading-[1.02] font-normal tracking-big sm:text-64 lg:text-68"
            >
              {project.name}
            </h1>
            <p className="m-0 max-w-[620px] text-17 leading-[1.5] text-pretty text-muted">
              {text.lead}
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1.5">
              {project.site && (
                <Button asChild variant="primary" size="xl" className="h-11 px-5">
                  <a href={project.site} target="_blank" rel="noopener noreferrer">
                    {fill(labels.visit, { site: host(project.site) })}
                    <ArrowUpRight aria-hidden />
                  </a>
                </Button>
              )}
              {project.github && (
                <Button
                  asChild
                  variant={project.site ? "secondary" : "primary"}
                  size="xl"
                  className="h-11 px-5"
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    {t.projects.github}
                    <ArrowUpRight aria-hidden />
                  </a>
                </Button>
              )}
            </div>
          </div>
          <Panel label={labels.summary} className="flex-[1_1_320px]">
            <span className="text-15 font-medium">{labels.summary}</span>
            <KeyValues
              items={[
                {
                  label: labels.status,
                  value: <StatusBadge status={project.status} t={t} />,
                  mono: false,
                },
                { label: labels.kind, value: text.kind, mono: false },
                { label: labels.since, value: project.since },
                ...(project.site
                  ? [
                      {
                        label: labels.site,
                        value: (
                          <ExternalLink href={project.site}>{host(project.site)}</ExternalLink>
                        ),
                      },
                    ]
                  : []),
                ...(project.github
                  ? [
                      {
                        label: labels.source,
                        value: (
                          <ExternalLink href={project.github}>{host(project.github)}</ExternalLink>
                        ),
                      },
                    ]
                  : []),
              ]}
            />
            <ul className="m-0 flex list-none flex-wrap gap-1.5 border-t border-rule p-0 pt-4">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <ToolTag name={tag} withMark className="px-2 py-[3px] text-11" />
                </li>
              ))}
            </ul>
          </Panel>
        </div>
        {lead && shot(lead, true)}
      </section>

      <PageSection id="features" title={labels.features} note={text.featuresNote}>
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(text.features).map(([id, feature], index) => (
            <article key={id} className="flex min-w-0 flex-col gap-2.5 border-t border-rule pt-4">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-12 text-acc-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="m-0 text-16 font-medium">{feature.title}</h3>
              </div>
              <p className="m-0 text-13 leading-[1.6] text-pretty text-muted">{feature.text}</p>
            </article>
          ))}
        </div>
      </PageSection>

      {gallery.length > 0 && (
        <PageSection id="screenshots" title={labels.screenshots} note={labels.screenshotsNote}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
            {gallery.map((name) => shot(name))}
          </div>
        </PageSection>
      )}

      <PageSection id="built" title={labels.built}>
        <div className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
          {text.built.map((paragraph) => (
            <p key={paragraph} className="m-0 text-15 leading-[1.6] text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
      </PageSection>

      {others.length > 0 && (
        <PageSection id="other" title={labels.other}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {others.map((other) => (
              <ProjectCard key={other.id} project={other} language={language} t={t} />
            ))}
          </div>
        </PageSection>
      )}
    </>
  );
}

/** "whiskers.nyuu.dev", "github.com/Zeptiny/Syncr": an address without its scheme. */
function host(url: string) {
  return url.replace(/^https:\/\//, "");
}

/**
 * A screenshot taken in both themes, only the one matching the page's showing (.only-light and
 * .only-dark in styles.css). It opens at full size, and the caption names the link.
 */
function Screenshot({
  src,
  id,
  caption,
  eager,
}: {
  /** The path without its theme and extension. */
  src: string;
  id: string;
  caption: string;
  eager: boolean;
}) {
  const captionId = `${id}-caption`;
  return (
    <figure className="group m-0 flex min-w-0 flex-col gap-2.5">
      <div className="aspect-[16/10] overflow-hidden border border-rule bg-panel transition-colors group-hover:border-acc">
        {(["light", "dark"] as const).map((theme) => (
          <a
            key={theme}
            href={`${src}-${theme}.webp`}
            target="_blank"
            rel="noopener"
            aria-labelledby={captionId}
            className={`only-${theme} block size-full cursor-zoom-in hover:opacity-100`}
          >
            <img
              src={`${src}-${theme}.webp`}
              alt=""
              width={1440}
              height={900}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              className="size-full object-cover object-top-left"
            />
          </a>
        ))}
      </div>
      <figcaption id={captionId} className="text-13 leading-[1.5] text-pretty text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
