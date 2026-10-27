import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { LANGUAGES } from "@/i18n/languages";

export const dynamic = "force-static";

/** One page per language, each pointing at the others. */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    LANGUAGES.map((language) => [language.tag, `${SITE_URL}${language.path}`]),
  );
  return LANGUAGES.map((language) => ({
    url: `${SITE_URL}${language.path}`,
    alternates: { languages },
  }));
}
