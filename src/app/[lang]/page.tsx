import { notFound } from "next/navigation";
import { DISCORD, EMAIL, GITHUB, SITE_URL } from "@/content/site";
import { Contact } from "@/features/contact/contact";
import { EducationSection } from "@/features/education/education";
import { Hero } from "@/features/home/hero";
import { Projects } from "@/features/home/projects";
import { Services } from "@/features/home/services";
import { Stack } from "@/features/home/stack";
import { SiteFooter } from "@/features/layout/site-footer";
import { SiteHeader } from "@/features/layout/site-header";
import { getDictionary } from "@/i18n/dictionaries";
import { isLanguage, languageInfo } from "@/i18n/languages";

/** The whole site: one page per language, each section an anchor the header links to. */
export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const t = getDictionary(lang);
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nyuu",
    url: `${SITE_URL}${languageInfo(lang).path}`,
    email: `mailto:${EMAIL}`,
    description: t.meta.description,
    sameAs: [GITHUB.url, DISCORD.url],
  };
  return (
    <div className="min-h-dvh">
      <SiteHeader language={lang} t={t} />
      <main className="mx-auto flex max-w-[1280px] flex-col gap-[72px] px-4 pt-14 pb-16 sm:px-10 sm:pt-[72px]">
        <Hero t={t} />
        <Services t={t} />
        <Projects t={t} />
        <Stack t={t} />
        <EducationSection language={lang} t={t} />
        <Contact language={lang} t={t} />
      </main>
      <SiteFooter t={t} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
