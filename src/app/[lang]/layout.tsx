import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@/app/styles.css";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { BOOT_SCRIPT, BOOT_STYLE } from "@/app/boot-script";
import { getDictionary } from "@/i18n/dictionaries";
import { isLanguage, LANGUAGES, languageInfo } from "@/i18n/languages";
import { pageMetadata } from "@/i18n/metadata";

type Params = { params: Promise<{ lang: string }> };

// Each language's pages are rendered at build time; any other code is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LANGUAGES.map(({ code }) => ({ lang: code }));
}

export const viewport: Viewport = { colorScheme: "light dark" };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  const t = getDictionary(lang);
  return pageMetadata(lang, { title: t.meta.title, description: t.meta.description });
}

export default async function RootLayout({ children, params }: Params & { children: ReactNode }) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return (
    // The boot script sets data-theme (and may set data-redirecting) before React hydrates.
    <html lang={languageInfo(lang).tag} data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        <style dangerouslySetInnerHTML={{ __html: BOOT_STYLE }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
