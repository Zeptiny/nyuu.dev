import { ArrowUpRight } from "lucide-react";
import { cn } from "@/shared/lib/cn";

/** A link off the site, in a new tab, with an arrow that nudges out under the pointer. */
export function ExternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group/link inline-flex items-center gap-1 text-acc-ink", className)}
    >
      {children}
      <ArrowUpRight
        aria-hidden
        className="size-3.5 transition-transform motion-safe:group-hover/link:translate-x-px motion-safe:group-hover/link:-translate-y-px"
      />
    </a>
  );
}
