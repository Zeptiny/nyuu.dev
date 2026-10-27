import { useSyncExternalStore } from "react";
import { THEME_KEY } from "@/shared/lib/storage-keys";

/**
 * The colour mode as a data-theme attribute on <html> that the tokens in styles.css key off. The
 * choice is light, dark or system (the default, following the OS); the attribute always holds the
 * resolved light or dark. app/boot-script.ts applies the saved choice before the first paint; these
 * keep it and tell subscribers.
 */
export type Mode = "system" | "light" | "dark";

export const MODES: readonly Mode[] = ["system", "light", "dark"];

const listeners = new Set<() => void>();
const root = () => document.documentElement;
const dark = () => matchMedia("(prefers-color-scheme: dark)");

function store(value: string) {
  try {
    localStorage.setItem(THEME_KEY, value);
  } catch {
    // Private mode: the choice lasts for this page only.
  }
}

function saved(): Mode {
  try {
    const value = localStorage.getItem(THEME_KEY);
    if (value === "light" || value === "dark") return value;
  } catch {
    // Unreadable storage (or none, while prerendering) is the same as no choice.
  }
  return "system";
}

let mode: Mode = saved();

function apply() {
  root().dataset.theme = mode === "system" ? (dark().matches ? "dark" : "light") : mode;
}

function notify() {
  for (const listener of listeners) listener();
}

// Prerendering imports this module without a window.
if (typeof matchMedia !== "undefined") {
  dark().addEventListener("change", () => {
    if (mode !== "system") return;
    apply();
    notify();
  });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setMode(next: Mode) {
  mode = next;
  apply();
  store(next);
  notify();
}

export function useTheme() {
  const current = useSyncExternalStore<Mode>(
    subscribe,
    () => mode,
    () => "system",
  );
  const resolved = useSyncExternalStore<"light" | "dark">(
    subscribe,
    () => (root().dataset.theme === "dark" ? "dark" : "light"),
    () => "light",
  );
  return { mode: current, resolved };
}
