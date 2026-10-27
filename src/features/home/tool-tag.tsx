import type { CSSProperties } from "react";
import { MARKS } from "@/content/marks";
import { TOOLS, type ToolName } from "@/content/tools";
import { Tag } from "@/shared/components/page";
import { cn } from "@/shared/lib/cn";
import { Logo } from "@/shared/ui/logo";

/**
 * A tool's name in a tag that takes on its brand's color under the pointer: the box outlined and
 * washed with it, and the mark, when it shows one, in it (see .tint in styles.css).
 */
export function ToolTag({
  name,
  withMark = false,
  className,
}: {
  name: ToolName;
  withMark?: boolean;
  className?: string;
}) {
  const tool = TOOLS[name];
  return (
    <Tag
      style={{ "--brand": tool.color } as CSSProperties}
      className={cn(
        "group/tag tint transition-colors hover:border-(--tint) hover:bg-(--tint)/12",
        className,
      )}
    >
      {withMark && tool.mark && (
        <Logo
          paths={MARKS[tool.mark]}
          className="size-3.5 transition-colors group-hover/tag:text-(--tint)"
        />
      )}
      {name}
    </Tag>
  );
}
