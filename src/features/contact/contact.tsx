import { Mail } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { MARKS } from "@/content/marks";
import { DISCORD, EMAIL, GITHUB } from "@/content/site";
import { ContactForm } from "@/features/contact/contact-form";
import { type Dictionary, fill } from "@/i18n/dictionaries";
import { languageInfo, type Language } from "@/i18n/languages";
import { PageSection, Panel } from "@/shared/components/page";
import { Logo } from "@/shared/ui/logo";

/** Public, so it's set at build time (.env.production). */
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || null;

const ICON = "size-4 shrink-0 transition-colors group-hover:text-(--tint)";

/** The direct ways in beside the form, with the persona pointing at it. */
export function Contact({ language, t }: { language: Language; t: Dictionary }) {
  /** `brand` is the color the icon takes on under the pointer; the email's is the accent. */
  const methods: {
    name: string;
    value: string;
    href: string;
    icon: ReactNode;
    brand: string;
    action: string;
  }[] = [
    {
      name: t.contact.email,
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      icon: <Mail aria-hidden className={ICON} />,
      brand: "var(--acc)",
      action: t.contact.send,
    },
    {
      name: t.contact.github,
      value: GITHUB.handle,
      href: GITHUB.url,
      icon: <Logo paths={MARKS.github} className={ICON} />,
      brand: "#181717",
      action: t.contact.open,
    },
    {
      name: t.contact.discord,
      value: DISCORD.handle,
      href: DISCORD.url,
      icon: <Logo paths={MARKS.discord} className={ICON} />,
      brand: "#5865F2",
      action: t.contact.open,
    },
  ];
  const errors = Object.fromEntries(
    Object.entries(t.contact.form.errors).map(([code, message]) => [
      code,
      fill(message, { email: EMAIL }),
    ]),
  ) as typeof t.contact.form.errors;

  return (
    <PageSection id="contact" title={t.contact.title} note={t.contact.note}>
      <div className="flex flex-wrap items-end gap-x-12 gap-y-10">
        {/* From md up, the room above the panel is where the persona sits. */}
        <div className="min-w-0 flex-[1_1_340px] md:pt-[252px]">
          <Panel label={t.contact.methods} className="relative gap-0 pb-2">
            {/*
             * Seated on the panel's top rule: the thighs meet the edge 68.5% of the way down the
             * drawing, and the legs and tail hang over the right of the heading, which is kept tall
             * enough for them.
             */}
            <img
              src="/persona/sitting-edge-720w.webp"
              srcSet="/persona/sitting-edge-720w.webp 720w, /persona/sitting-edge.webp 1684w"
              sizes="240px"
              alt={t.contact.personaAlt}
              width={720}
              height={1081}
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute -top-0.5 right-3 w-[240px] -translate-y-[68.5%] select-none max-md:hidden"
            />
            <span className="pb-3 text-15 font-medium md:min-h-[96px]">{t.contact.methods}</span>
            <ul className="m-0 list-none p-0">
              {methods.map((method) => {
                const external = !method.href.startsWith("mailto:");
                return (
                  <li
                    key={method.name}
                    style={{ "--brand": method.brand } as CSSProperties}
                    className="group tint flex items-center gap-3 border-t border-rule py-3 text-13"
                  >
                    {method.icon}
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span>{method.name}</span>
                      <span className="truncate font-mono text-12 text-muted">{method.value}</span>
                    </span>
                    <a
                      href={method.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      aria-label={`${method.action}: ${method.name}`}
                      className="text-acc-ink"
                    >
                      {method.action}{" "}
                      <span
                        aria-hidden
                        className="inline-block transition-transform motion-safe:group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </div>
        <div className="min-w-0 flex-[1_1_460px]">
          <ContactForm
            language={language}
            turnstileLanguage={languageInfo(language).turnstile}
            siteKey={SITE_KEY}
            labels={{ ...t.contact.form, errors }}
          />
        </div>
      </div>
    </PageSection>
  );
}
