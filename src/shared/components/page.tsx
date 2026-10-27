import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

/** The mono, spaced-out label above a title: "SITE RELIABILITY ENGINEER · TECHNOLOGY ENTHUSIAST". */
export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("font-mono text-11 tracking-eyebrow text-muted uppercase", className)}>
      {children}
    </div>
  );
}

/**
 * A block of the page under an ink rule, with its title and an optional note beside it. `id` is the
 * in-page anchor the header links to.
 */
export function PageSection({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: ReactNode;
  note?: ReactNode;
  children: ReactNode;
}) {
  const headingId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="flex min-w-0 scroll-mt-6 flex-col gap-6 border-t border-ink pt-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id={headingId} className="m-0 text-28 font-normal tracking-num">
          {title}
        </h2>
        {note && <div className="max-w-[560px] text-13 leading-[1.5] text-muted">{note}</div>}
      </div>
      {children}
    </section>
  );
}

/** Panel paper under a heavy ink rule: what sits beside the page's main text. */
export function Panel({
  label,
  className,
  children,
}: {
  /** Names the panel for screen readers. */
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <aside
      aria-label={label}
      className={cn("flex min-w-0 flex-col gap-4 border-t-2 border-ink bg-panel p-5", className)}
    >
      {children}
    </aside>
  );
}

type DetailItem = { label: ReactNode; value: ReactNode; mono?: boolean };

/**
 * Labels beside their values: muted words on the left, values right-aligned (mono by default, for
 * figures and identifiers). Empty values show an em dash.
 */
export function KeyValues({ items, className }: { items: DetailItem[]; className?: string }) {
  return (
    <dl className={cn("m-0 grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-1.5 text-13", className)}>
      {items.map((item, index) => (
        <div key={index} className="contents">
          <dt className="text-muted">{item.label}</dt>
          <dd
            className={cn("m-0 min-w-0 text-right break-words", item.mono !== false && "font-mono")}
          >
            {item.value ?? <span className="text-faint">—</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** A name in a hairline box, for tags and tools: the static form of a mono chip. */
export function Tag({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <span
      style={style}
      className={cn(
        "inline-flex items-center gap-[7px] border border-rule2 px-2.5 py-[5px] font-mono text-12 whitespace-nowrap",
        className,
      )}
    >
      {children}
    </span>
  );
}
