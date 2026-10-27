import { Check } from "lucide-react";
import { DropdownMenu as MenuPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export const DropdownMenu = MenuPrimitive.Root;
export const DropdownMenuTrigger = MenuPrimitive.Trigger;

export function DropdownMenuContent({
  className,
  align = "end",
  ...props
}: ComponentProps<typeof MenuPrimitive.Content>) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Content
        align={align}
        sideOffset={6}
        className={cn(
          "z-50 min-w-44 border border-rule2 bg-bg p-1 text-13 text-ink shadow-[0_12px_32px_-12px_rgba(0,0,0,0.35)]",
          className,
        )}
        {...props}
      />
    </MenuPrimitive.Portal>
  );
}

export const DropdownMenuRadioGroup = MenuPrimitive.RadioGroup;

/** One choice in a group; the chosen one carries a check on the right. */
export function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: ComponentProps<typeof MenuPrimitive.RadioItem>) {
  return (
    <MenuPrimitive.RadioItem
      className={cn(
        "flex cursor-pointer items-center justify-between gap-4 px-2.5 py-1.5 outline-none select-none data-highlighted:bg-fill",
        className,
      )}
      {...props}
    >
      {children}
      <MenuPrimitive.ItemIndicator className="size-3.5">
        <Check aria-hidden className="size-3.5" />
      </MenuPrimitive.ItemIndicator>
    </MenuPrimitive.RadioItem>
  );
}
