import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "border border-ink bg-ink font-medium text-bg hover:opacity-90",
        secondary: "border border-rule2 bg-transparent text-ink hover:bg-hover",
        danger: "border border-rule2 bg-transparent text-bad hover:bg-hover",
        destructive: "border border-bad bg-bad font-medium text-bg hover:opacity-90",
        ghost: "border border-transparent text-muted hover:text-ink",
        link: "h-auto border-0 p-0 text-acc-ink hover:opacity-75",
      },
      size: {
        sm: "px-2.5 py-[5px] text-12",
        md: "px-3 py-1.5 text-13",
        lg: "h-[34px] px-4 text-13",
        xl: "h-10 px-[18px] text-13",
        icon: "size-7 text-13",
      },
    },
    compoundVariants: [{ variant: "link", className: "px-0 py-0" }],
    defaultVariants: { variant: "secondary", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Render the child element (a link) with button styling. */
    asChild?: boolean;
    /** Shows a spinner and disables the button while an action runs. */
    pending?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  pending = false,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  if (asChild) {
    return (
      <Slot.Root className={cn(buttonVariants({ variant, size }), className)} {...props}>
        {children}
      </Slot.Root>
    );
  }
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled ?? pending}
      aria-busy={pending || undefined}
      {...props}
    >
      {pending && <LoaderCircle className="animate-spin" aria-hidden />}
      {children}
    </button>
  );
}
