import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge learns the Ledger's type scale (styles.css `--text-*`), so `text-13` is known as
 * a size and doesn't knock out a color like `text-bg` when both are given.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "20",
        "22",
        "24",
        "26",
        "28",
        "34",
        "64",
        "68",
      ],
      tracking: ["eyebrow", "head", "snug", "num", "big"],
    },
  },
});

/** Joins class names; later Tailwind utilities win over earlier conflicting ones. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
