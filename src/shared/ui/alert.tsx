import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

const alertVariants = cva("border px-3 py-2.5 text-12 leading-[1.5]", {
  variants: {
    tone: {
      info: "border-rule2",
      accent: "border-acc bg-panel",
      warning: "border-warn",
      danger: "border-bad",
    },
  },
  defaultVariants: { tone: "info" },
});

type AlertProps = Omit<ComponentProps<"div">, "title"> &
  VariantProps<typeof alertVariants> & { title?: ReactNode; action?: ReactNode };

/** A ruled notice; the border's color says how much it matters. */
export function Alert({ className, tone, title, action, children, ...props }: AlertProps) {
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn(
        alertVariants({ tone }),
        "flex flex-wrap items-start gap-x-4 gap-y-2",
        className,
      )}
      {...props}
    >
      <div className="min-w-0 flex-1">
        {title && <p className="m-0 text-13 font-medium text-ink">{title}</p>}
        {children && <div className={cn(title && "mt-0.5", "text-muted")}>{children}</div>}
      </div>
      {action}
    </div>
  );
}
