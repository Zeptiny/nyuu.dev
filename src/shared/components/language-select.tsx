"use client";

import { Languages } from "lucide-react";
import { isLanguage, LANGUAGES, localePath, type Language } from "@/i18n/languages";
import { LANGUAGE_KEY } from "@/shared/lib/storage-keys";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

/**
 * Opens the same page in the language, and remembers the choice, so the root address opens in it
 * next time (app/boot-script.ts).
 */
function choose(language: Language, path: string) {
  try {
    localStorage.setItem(LANGUAGE_KEY, language);
  } catch {
    // Private mode: the choice lasts for this visit only.
  }
  window.location.assign(localePath(language, path) + window.location.hash);
}

/**
 * The language menu: the current language's code, and every language by its own name. `path` is the
 * page within a language, so a choice stays on it.
 */
export function LanguageSelect({
  current,
  path,
  label,
}: {
  current: Language;
  path: string;
  label: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={label}
        className="flex cursor-pointer items-center gap-1.5 border border-rule2 bg-transparent px-2.5 py-[5px] text-12 text-ink"
      >
        <Languages aria-hidden className="size-3.5 text-muted" />
        {current.toUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-44">
        <DropdownMenuRadioGroup
          value={current}
          onValueChange={(next) => {
            if (isLanguage(next) && next !== current) choose(next, path);
          }}
        >
          {LANGUAGES.map(({ code, name, tag }) => (
            <DropdownMenuRadioItem key={code} value={code} lang={tag}>
              {name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
