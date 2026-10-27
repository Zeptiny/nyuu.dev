"use client";

import { MODES, setMode, useTheme, type Mode } from "@/shared/lib/theme";

/** Steps through system, light and dark; the dot is filled while the page is dark. */
export function ThemeToggle({ labels }: { labels: Record<Mode, string> & { switchTo: string } }) {
  const { mode, resolved } = useTheme();
  const next = MODES[(MODES.indexOf(mode) + 1) % MODES.length] ?? "system";
  return (
    <button
      type="button"
      onClick={() => setMode(next)}
      aria-label={labels.switchTo.replace("{mode}", labels[next])}
      className="flex cursor-pointer items-center gap-1.5 border border-rule2 bg-transparent px-2.5 py-[5px] text-12 text-ink"
    >
      <span
        aria-hidden
        className="size-[9px] rounded-full border-[1.5px] border-ink"
        style={{ background: resolved === "light" ? "transparent" : "var(--ink)" }}
      />
      {labels[mode]}
    </button>
  );
}
