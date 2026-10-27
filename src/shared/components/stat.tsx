import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type StatItem = { label: ReactNode; value: ReactNode; sub?: ReactNode; muted?: boolean };

/** A headline figure with its label and a mono note beneath. */
function Stat({ label, value, sub, muted = false, className }: StatItem & { className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <span className="text-12 text-muted">{label}</span>
      <span
        className={cn(
          "text-[clamp(20px,2.4vw,28px)] tracking-num tabular-nums",
          muted && "text-muted",
        )}
      >
        {value}
      </span>
      {sub && <span className="font-mono text-12 text-muted">{sub}</span>}
    </div>
  );
}

/** A row of stats between an ink rule and a hairline, split by hairlines. */
export function StatStrip({ items, className }: { items: StatItem[]; className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 border-t border-b border-t-ink border-b-rule md:grid-cols-[repeat(var(--n),minmax(0,1fr))]",
        className,
      )}
      style={{ "--n": items.length } as CSSProperties}
    >
      {items.map((item, index) => (
        <Stat
          key={index}
          {...item}
          className={cn(
            "py-4 pr-4",
            index > 0 && "md:border-l md:border-rule md:pl-4",
            index % 2 === 1 && "max-md:border-l max-md:border-rule max-md:pl-4",
          )}
        />
      ))}
    </div>
  );
}
