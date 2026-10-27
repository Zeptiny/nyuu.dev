import { SERVICES } from "@/content/services";
import type { Dictionary } from "@/i18n/dictionaries";
import { PageSection } from "@/shared/components/page";

export function Services({ t }: { t: Dictionary }) {
  return (
    <PageSection id="services" title={t.services.title} note={t.services.note}>
      <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
        {SERVICES.map((service, index) => {
          const text = t.services.items[service.id];
          return (
            <article key={service.id} className="flex min-w-0 flex-col gap-3">
              <figure className="m-0 flex flex-col gap-2">
                <div className="aspect-[2/1] overflow-hidden border border-rule bg-panel">
                  {(["light", "dark"] as const).map((theme) => (
                    <img
                      key={theme}
                      src={`/services/${service.shot}-${theme}.webp`}
                      alt=""
                      width={1920}
                      height={960}
                      loading="lazy"
                      decoding="async"
                      className={`only-${theme} size-full object-cover object-top-left`}
                    />
                  ))}
                </div>
                <figcaption className="font-mono text-11 text-faint">{service.tool}</figcaption>
              </figure>
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-mono text-12 text-acc-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="m-0 text-20 font-medium">{text.title}</h3>
              </div>
              <p className="m-0 text-14 leading-[1.5]">{text.lead}</p>
              <p className="m-0 text-13 leading-[1.6] text-pretty text-muted">{text.detail}</p>
            </article>
          );
        })}
      </div>
    </PageSection>
  );
}
