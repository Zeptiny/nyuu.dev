import type { ToolName } from "@/content/tools";
import type { Dictionary } from "@/i18n/dictionaries";

export type ProjectId = keyof Dictionary["projects"]["items"];
export type ProjectStatus = keyof Dictionary["projects"]["status"];
type FactId = keyof Dictionary["projects"]["facts"];

export type Project = {
  id: ProjectId;
  name: string;
  status: ProjectStatus;
  tags: readonly ToolName[];
  /** Where it runs, if it does. */
  site?: string;
  github?: string;
  /** Figures worth a line of their own. */
  facts?: readonly { id: FactId; value: string }[];
};

/** The projects, newest first. A live one is set apart on panel paper. The text is in the locales. */
export const PROJECTS: readonly Project[] = [
  {
    id: "whiskers",
    name: "Whiskers",
    status: "live",
    tags: ["Python", "FastAPI", "PostgreSQL", "React", "TypeScript", "Docker"],
    site: "https://whiskers.nyuu.dev",
  },
  {
    id: "syncr",
    name: "Syncr",
    status: "development",
    tags: ["Python", "Django", "Docker", "Linux", "AWS S3"],
    github: "https://github.com/Zeptiny/Syncr",
  },
  {
    id: "tryxia",
    name: "Tryxia Host",
    status: "discontinued",
    tags: ["Bash", "Docker", "Linux"],
    facts: [
      { id: "users", value: "200+" },
      { id: "servers", value: "70+" },
    ],
  },
];
