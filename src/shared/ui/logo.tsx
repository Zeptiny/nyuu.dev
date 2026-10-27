import { cn } from "@/shared/lib/cn";

/**
 * A product's or a model maker's mark: paths on a 24-unit square, filled with the text's color, so
 * it follows the name beside it through light, dark, and a chosen chip's ink.
 */
export function Logo({ paths, className }: { paths: readonly string[]; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      fillRule="evenodd"
      aria-hidden="true"
      className={cn("size-4 shrink-0", className)}
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
