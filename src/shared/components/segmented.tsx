import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type Option<Value extends string> = { value: Value; label: ReactNode };

/**
 * Mutually exclusive options in one bordered strip; the chosen one is filled with ink. Used for
 * chart metrics, groupings, ranges, and tabs.
 */
export function Segmented<Value extends string>({
  value,
  options,
  onChange,
  label,
  size = "md",
  dividerBefore,
  quiet = false,
  className,
}: {
  value: Value;
  options: readonly Option<Value>[];
  onChange: (value: Value) => void;
  /** Accessible name for the group. */
  label: string;
  /** "sm" for controls beside a chart title, "md" beside a section title. */
  size?: "sm" | "md";
  /** Sets one option apart with a rule before it ("Custom" after preset ranges). */
  dividerBefore?: Value;
  /** Unchosen options in the muted color, for filters rather than views. */
  quiet?: boolean;
  className?: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className={cn("flex border border-rule2", className)}>
      {options.map((option) => {
        const on = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(option.value)}
            className={cn(
              "cursor-pointer border-0 whitespace-nowrap",
              size === "sm" ? "px-[11px] py-1 text-12" : "px-3 py-[5px] text-13",
              on
                ? "bg-ink text-bg"
                : cn("bg-transparent hover:bg-hover", quiet ? "text-muted" : "text-ink"),
              option.value === dividerBefore && "border-l border-rule2",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
