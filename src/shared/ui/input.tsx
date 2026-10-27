import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

const controlClass =
  "w-full rounded-none border border-rule2 bg-transparent px-2.5 text-13 text-ink outline-none placeholder:text-faint focus-visible:border-ink focus-visible:outline-none disabled:opacity-60 aria-invalid:border-bad";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(controlClass, "h-[34px]", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea className={cn(controlClass, "min-h-20 py-2 leading-[1.5]", className)} {...props} />
  );
}

export function NativeSelect({ className, ...props }: ComponentProps<"select">) {
  return (
    <select
      className={cn(controlClass, "h-[34px] cursor-pointer bg-bg pr-8", className)}
      {...props}
    />
  );
}

export function Label({ className, ...props }: ComponentProps<"label">) {
  return <label className={cn("text-12 text-muted", className)} {...props} />;
}
