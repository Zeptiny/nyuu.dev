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
 * The mark: the persona's fedora, cat ears poking out behind it, its band in the accent.
 * Solid shapes rather than strokes, so the hat still reads at favicon size; public/favicon.svg is
 * the same drawing on a dark tile. It sits inline, lowered to the x-height, so the wordmark keeps
 * its baseline.
 */
function Mark() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className="mr-2 inline-block size-[1.3em] align-[-0.35em]"
    >
      <path d="M5.4 6.4 3.6 2.4l3.6 2.4zM10.6 6.4l1.8-4-3.6 2.4z" />
      <path d="M4.3 11.7 5 5.5c.9-.5 2-.4 3 .5 1-.9 2.1-1 3-.5l.7 6.2z" />
      <path d="M.8 10.3c1.7.9 4.2 1.3 7.2 1.3s5.5-.4 7.2-1.3c-.3 1.5-3.4 2.4-7.2 2.4S1.1 11.8.8 10.3z" />
      <path className="fill-acc" d="M4.68 8.3h6.64l.15 1.4H4.53z" />
    </svg>
  );
}
