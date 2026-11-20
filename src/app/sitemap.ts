import type { MetadataRoute } from "next";
import { PROJECTS, projectPath } from "@/content/projects";
import { SITE_URL } from "@/content/site";
import { LANGUAGES, localePath } from "@/i18n/languages";

export const dynamic = "force-static";

/** The home page and each project's, in every language, each pointing at the others. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...PROJECTS.map(({ id }) => projectPath(id))];
  return paths.flatMap((path) => {
    const languages = Object.fromEntries(
      LANGUAGES.map(({ code, tag }) => [tag, `${SITE_URL}${localePath(code, path)}`]),
    );
    return LANGUAGES.map(({ code }) => ({
      url: `${SITE_URL}${localePath(code, path)}`,
      alternates: { languages },
    }));
  });
}
