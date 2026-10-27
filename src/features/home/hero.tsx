import { educationSummary } from "@/content/education";
import { PROJECTS } from "@/content/projects";
import { DISCORD, EMAIL, GITHUB } from "@/content/site";
import { type Dictionary, fill } from "@/i18n/dictionaries";
import { Eyebrow, KeyValues, Panel } from "@/shared/components/page";
import { Button } from "@/shared/ui/button";

/** Who this is and what they do, beside what they're up to now. */
export function Hero({ t }: { t: Dictionary }) {
  return (
    <section aria-labelledby="hero-title" className="flex flex-wrap items-end gap-12">
      <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-[22px]">
        <Eyebrow>{t.hero.eyebrow}</Eyebrow>
        <h1
          id="hero-title"
          className="m-0 text-[42px] leading-[1.02] font-normal tracking-big text-balance sm:text-64 lg:text-68"
        >
          {t.hero.title}
        </h1>
        <p className="m-0 max-w-[540px] text-17 leading-[1.5] text-pretty text-muted">
          {t.hero.body}
        </p>
        <div className="flex flex-wrap gap-2.5 pt-1.5">
          <Button asChild variant="primary" size="xl" className="h-11 px-5">
            <a href="#services">{t.hero.seeServices}</a>
          </Button>
          <Button asChild size="xl" className="h-11 px-5">
            <a href="#contact">{t.hero.contact}</a>
          </Button>
        </div>
        <div className="flex flex-wrap gap-x-[18px] gap-y-1.5 font-mono text-12 text-muted">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span className="text-faint">·</span>
          <a href={GITHUB.url} target="_blank" rel="noopener noreferrer">
            {GITHUB.url.replace("https://", "")}
          </a>
          <span className="text-faint">·</span>
          <a href={DISCORD.url} target="_blank" rel="noopener noreferrer">
            {DISCORD.url.replace("https://", "")}
          </a>
        </div>
      </div>
      <div className="flex min-w-0 flex-[1_1_380px] flex-col items-center">
        {/* The drawing stops at the legs; the panel in front hides where it ends. */}
        <img
          src="/persona/welcoming-840w.webp"
          srcSet="/persona/welcoming-840w.webp 840w, /persona/welcoming.webp 3368w"
          sizes="(min-width: 640px) 280px, 60vw"
          alt={t.hero.personaAlt}
          width={840}
          height={1261}
          fetchPriority="high"
          className="-mb-12 h-auto w-[min(60%,280px)] select-none"
        />
        <Now t={t} />
      </div>
    </section>
  );
}

/** The degree under way, the course in progress, what's being built, and the certifications. */
function Now({ t }: { t: Dictionary }) {
  const { degree, learning, certifications } = educationSummary();
  const building = PROJECTS.filter((project) => project.status !== "discontinued");
  const items = [
    degree && {
      label: t.hero.now.studying,
      value: `${t.education.items[degree.id].title} · ${fill(t.hero.now.since, { year: degree.year })}`,
    },
    learning && { label: t.hero.now.learning, value: t.education.items[learning.id].title },
    building.length > 0 && {
      label: t.hero.now.building,
      value: building.map((project) => project.name).join(" · "),
    },
    certifications.length > 0 && {
      label: t.hero.now.certified,
      value: certifications.map((entry) => t.education.items[entry.id].title).join(" · "),
    },
  ].filter((item) => !!item);
  return (
    <Panel label={t.hero.now.label} className="relative w-full">
      <span className="text-15 font-medium">{t.hero.now.label}</span>
      <KeyValues
        items={items.map((item) => ({ ...item, mono: false }))}
        className="gap-y-2.5 [&_dd]:text-pretty"
      />
    </Panel>
  );
}
