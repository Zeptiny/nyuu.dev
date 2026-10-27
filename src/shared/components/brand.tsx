import { cn } from "@/shared/lib/cn";

/** The wordmark: the mark, then the domain in mono with a faint ".dev", as an address reads. */
export function Brand({ className }: { className?: string }) {
  return (
    <span className={cn("font-mono text-14 font-medium", className)}>
      <Mark />
      nyuu<span className="text-faint">.dev</span>
    </span>
  );
}

/**
 * The mark: a cat's head with its ears up and its eyes in the accent, in the same square-capped
 * strokes as the Whiskers mark. public/favicon.svg is the same drawing on a dark tile. It sits
 * inline, lowered to the x-height, so the wordmark keeps its baseline.
 */
function Mark() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      strokeWidth={1.6}
      strokeLinecap="square"
      aria-hidden="true"
      className="mr-2 inline-block size-[1.3em] align-[-0.35em]"
    >
      <path stroke="currentColor" d="M2.5 13.5v-11l4 3.5h3l4-3.5v11z" />
      <path className="fill-acc" d="M5.2 8.6h1.6v1.6H5.2zM9.2 8.6h1.6v1.6H9.2z" />
    </svg>
  );
}
