import type { Dictionary } from "@/i18n/dictionaries";
import { languageInfo, type Language } from "@/i18n/languages";
import { Brand } from "@/shared/components/brand";
import { LanguageSelect } from "@/shared/components/language-select";
import { ThemeToggle } from "@/shared/components/theme-toggle";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";

/** A section link: muted until the pointer is on it, then in ink over an accent underline. */
const LINK =
  "py-3 transition-colors decoration-acc decoration-2 underline-offset-[6px] hover:text-ink hover:underline hover:opacity-100";

/**
 * The wordmark home, the page's sections, and the language, theme and the way to get in touch. Below
 * lg the sections take a row of their own, so every link stays in view without scrolling.
 */
export function SiteHeader({ language, t }: { language: Language; t: Dictionary }) {
  const sections = [
    { id: "services", label: t.nav.services },
    { id: "projects", label: t.nav.projects },
    { id: "stack", label: t.nav.stack },
    { id: "education", label: t.nav.education },
  ];
  return (
    <header className="flex flex-wrap items-center gap-x-8 gap-y-1 border-b border-rule px-4 py-3 sm:px-10">
      <a href={languageInfo(language).path} aria-label={t.nav.home}>
        <Brand />
      </a>
      <nav
        aria-label={t.nav.label}
        className="flex flex-wrap gap-x-4 text-14 text-muted max-lg:order-last max-lg:w-full sm:gap-x-[22px]"
      >
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`} className={LINK}>
            {section.label}
          </a>
        ))}
        {/* On a phone the button doesn't fit beside the menus, so the way in joins the sections. */}
        <a href="#contact" className={cn(LINK, "sm:hidden")}>
          {t.nav.contact}
        </a>
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <LanguageSelect current={language} label={t.language.label} />
        <ThemeToggle labels={t.theme} />
        <Button asChild variant="primary" size="lg" className="max-sm:hidden">
          <a href="#contact">{t.nav.contact}</a>
        </Button>
      </div>
    </header>
  );
}
