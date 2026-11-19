import type { ProjectStatus } from "@/content/projects";
import type { Dictionary } from "@/i18n/dictionaries";
import { Badge, type BadgeTone } from "@/shared/ui/badge";

const STATUS_TONE: Record<ProjectStatus, BadgeTone> = {
  live: "success",
  development: "accent",
};

/** Where a project stands, as a word beside a square in its tone. */
export function StatusBadge({
  status,
  t,
  className,
}: {
  status: ProjectStatus;
  t: Dictionary;
  className?: string;
}) {
  return (
    <Badge tone={STATUS_TONE[status]} className={className}>
      {t.projects.status[status]}
    </Badge>
  );
}
