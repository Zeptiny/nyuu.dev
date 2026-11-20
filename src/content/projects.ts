import type { ToolName } from "@/content/tools";
import type { Dictionary } from "@/i18n/dictionaries";

type Items = Dictionary["projects"]["items"];
export type ProjectId = keyof Items;
export type ProjectStatus = keyof Dictionary["projects"]["status"];

type ProjectOf<Id extends ProjectId> = {
  id: Id;
  name: string;
  status: ProjectStatus;
  /** The year the work began. */
  since: number;
  tags: readonly ToolName[];
  /** Where it runs, if it does. */
  site?: string;
  github?: string;
  /**
   * The screenshots, the first one leading the project's page. Each is taken in both themes:
   * public/projects/{id}/{shot}-light.webp and -dark.webp, at 1440×900. Their captions are in the
   * locales under the same names.
   */
  shots: readonly (keyof Items[Id]["shots"] & string)[];
};

/** One project, its shots checked against its own captions. */
export type Project = { [Id in ProjectId]: ProjectOf<Id> }[ProjectId];

/**
 * The projects, newest first, each with a page of its own at /projects/{id}. A live one is set
 * apart on panel paper. The text is in the locales.
 */
export const PROJECTS: readonly Project[] = [
  {
    id: "whiskers",
    name: "Whiskers",
    status: "live",
    since: 2026,
    tags: ["Python", "FastAPI", "PostgreSQL", "React", "TypeScript", "Docker"],
    site: "https://whiskers.nyuu.dev",
    shots: ["landing", "agents", "api", "windows", "models"],
  },
  {
    id: "syncr",
    name: "Syncr",
    status: "development",
    since: 2025,
    tags: ["Go", "TypeScript", "React", "PostgreSQL", "Docker", "rclone", "restic"],
    github: "https://github.com/Zeptiny/Syncr",
    shots: ["dashboard", "job-live", "snapshot-browser", "schedule", "workers"],
  },
];

export function isProjectId(value: unknown): value is ProjectId {
  return PROJECTS.some((project) => project.id === value);
}

export function projectById(id: ProjectId): Project {
  const project = PROJECTS.find((entry) => entry.id === id);
  if (!project) throw new Error(`No project ${id}`);
  return project;
}

/** A project's page, within a language (see localePath). */
export function projectPath(id: ProjectId): string {
  return `/projects/${id}`;
}
