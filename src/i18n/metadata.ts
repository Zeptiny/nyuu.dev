import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/content/site";
import { type Language, LANGUAGES, languageInfo, localePath } from "@/i18n/languages";

/**
 * A page's metadata in one language: its title and description, its address, and the same page in
 * every other language. `path` is the page within a language ("" for the home page). A page's
 * metadata replaces the layout's key by key, so each page sets all of these.
 */
export function pageMetadata(
  language: Language,
  { path = "", title, description }: { path?: string; title: string; description: string },
): Metadata {
  const info = languageInfo(language);
  const url = localePath(language, path);
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(LANGUAGES.map(({ code, tag }) => [tag, localePath(code, path)])),
        "x-default": localePath("en", path),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: info.openGraph,
      alternateLocale: LANGUAGES.filter(({ code }) => code !== language).map(
        ({ openGraph }) => openGraph,
      ),
    },
    twitter: { card: "summary", title, description },
    icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
  };
}
