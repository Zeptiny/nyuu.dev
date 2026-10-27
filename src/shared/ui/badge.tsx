import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export type BadgeTone = "neutral" | "info" | "success" | "warning" | "danger" | "accent" | "ink";

const TONE_COLOR: Record<BadgeTone, string> = {
  neutral: "var(--faint)",
  info: "var(--blue)",
  success: "var(--ok)",
  warning: "var(--warn)",
  danger: "var(--bad)",
  accent: "var(--acc)",
  ink: "var(--ink)",
};

/** A small square in the tone's color. */
export function Swatch({
  color,
  size = 7,
  className,
}: {
  color: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("inline-block shrink-0", className)}
      style={{ width: size, height: size, background: color }}
    />
  );
}

/**
 * A status as the Ledger shows it: a colored square beside the word, never a filled pill. The word
 * carries the meaning; the color only repeats it.
 */
export function Badge({
  className,
  tone = "neutral",
  children,
  ...props
}: ComponentProps<"span"> & { tone?: BadgeTone | null }) {
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 whitespace-nowrap", className)}
      {...props}
    >
      <Swatch color={TONE_COLOR[tone ?? "neutral"]} />
      {children}
    </span>
  );
}
