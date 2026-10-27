import ca from "@/locales/ca.json";
import en from "@/locales/en.json";
import pt from "@/locales/pt.json";
import { type Language, languageInfo } from "@/i18n/languages";

/** Every text on the site, shaped like the English file. */
export type Dictionary = typeof en;

// Typed as the English, so a key missing from another language fails to compile.
const DICTIONARIES: Record<Language, Dictionary> = { en, pt, ca };

/** The text for one language. Server-side only: client components get the strings they show as props. */
export function getDictionary(language: Language): Dictionary {
  return DICTIONARIES[language];
}

/** Fills a template's "{name}" slots; a slot without a value stays as written. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (slot, key: string) =>
    key in values ? String(values[key]) : slot,
  );
}

/** The form of a counted phrase that the language's plural rules pick for `count`. */
export function plural(
  language: Language,
  count: number,
  forms: { one: string; other: string },
): string {
  const rule = new Intl.PluralRules(languageInfo(language).tag).select(count);
  return rule === "one" ? forms.one : forms.other;
}

/** A number as the language writes it: "26.5" in English, "26,5" in Portuguese and Catalan. */
export function formatNumber(language: Language, value: number): string {
  return new Intl.NumberFormat(languageInfo(language).tag, { maximumFractionDigits: 1 }).format(
    value,
  );
}
