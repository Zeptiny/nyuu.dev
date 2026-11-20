import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isProjectId, projectById, projectPath, PROJECTS } from "@/content/projects";
import { SITE_NAME } from "@/content/site";
import { SiteFooter } from "@/features/layout/site-footer";
import { SiteHeader } from "@/features/layout/site-header";
import { ProjectPage } from "@/features/projects/project-page";
import { getDictionary } from "@/i18n/dictionaries";
import { isLanguage } from "@/i18n/languages";
import { pageMetadata } from "@/i18n/metadata";

type Params = { params: Promise<{ lang: string; project: string }> };

// A page per project in each language, rendered at build time; any other name is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map(({ id }) => ({ project: id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, project: id } = await params;
  if (!isLanguage(lang) || !isProjectId(id)) return {};
  const t = getDictionary(lang);
  return pageMetadata(lang, {
    path: projectPath(id),
    title: `${projectById(id).name} · ${SITE_NAME}`,
    description: t.projects.items[id].description,
  });
}

export default async function Project({ params }: Params) {
  const { lang, project: id } = await params;
  if (!isLanguage(lang) || !isProjectId(id)) notFound();
  const t = getDictionary(lang);
  return (
    <div className="min-h-dvh">
      <SiteHeader language={lang} path={projectPath(id)} t={t} />
      <main className="mx-auto flex max-w-[1280px] flex-col gap-[72px] px-4 pt-8 pb-16 sm:px-10 sm:pt-10">
        <ProjectPage project={projectById(id)} language={lang} t={t} />
      </main>
      <SiteFooter t={t} />
    </div>
  );
}
