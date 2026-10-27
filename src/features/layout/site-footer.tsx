import { DISCORD, EMAIL, GITHUB } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { Brand } from "@/shared/components/brand";

export function SiteFooter({ t }: { t: Dictionary }) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-rule px-4 py-5 text-13 text-muted sm:px-10">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <Brand className="text-ink" />
        <span className="font-mono text-12">
          © {new Date().getFullYear()} · {t.footer.rights}
        </span>
      </div>
      <nav aria-label={t.footer.label} className="flex flex-wrap gap-x-5">
        <a href={GITHUB.url} target="_blank" rel="noopener noreferrer" className="py-3">
          {t.contact.github}
        </a>
        <a href={DISCORD.url} target="_blank" rel="noopener noreferrer" className="py-3">
          {t.contact.discord}
        </a>
        <a href={`mailto:${EMAIL}`} className="py-3">
          {EMAIL}
        </a>
      </nav>
    </footer>
  );
}
