import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Swatch } from "@/shared/ui/badge";

/**
 * A toggle chip: a status filter with its swatch and count, or a mono name to pick (a model). The
 * chosen one is filled with ink.
 */
export function Chip({
  active,
  color,
  count,
  mono = false,
  children,
  className,
  ...props
}: Omit<ComponentProps<"button">, "color"> & {
  active: boolean;
  color?: string;
  count?: ReactNode;
  mono?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "flex cursor-pointer items-center gap-[7px] border",
        mono ? "px-2.5 py-[5px] font-mono text-12" : "px-[11px] py-[5px] text-13",
        active
          ? "border-ink bg-ink text-bg"
          : "border-rule2 bg-transparent text-ink hover:bg-hover",
        className,
      )}
      {...props}
    >
      {color && <Swatch color={color} />}
      {children}
      {count !== undefined && <span className="font-mono text-11 opacity-70">{count}</span>}
    </button>
  );
}

/** A legend entry: a swatch (or a line) and its name. */
export function LegendItem({
  color,
  line = false,
  children,
  className,
}: {
  color: string;
  line?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-1.5", className)}>
      {line ? (
        <span
          aria-hidden
          className="inline-block h-0.5 w-3.5"
          style={{ background: color, boxShadow: "0 0 0 1.5px var(--bg)" }}
        />
      ) : (
        <Swatch color={color} size={9} />
      )}
      {children}
    </span>
  );
}
