/**
 * The languages the site speaks, each named in itself so a visitor can find theirs whatever the page
 * is showing. English is served at the root, the others under their code (next.config.ts).
 */
export const LANGUAGES = [
  { code: "en", name: "English", path: "/", tag: "en", openGraph: "en_US", turnstile: "en" },
  {
    code: "pt",
    name: "Português",
    path: "/pt",
    tag: "pt-BR",
    openGraph: "pt_BR",
    turnstile: "pt-br",
  },
  // Turnstile has no Catalan; "auto" follows the browser.
  { code: "ca", name: "Català", path: "/ca", tag: "ca", openGraph: "ca_ES", turnstile: "auto" },
] as const;

export type Language = (typeof LANGUAGES)[number]["code"];
export type LanguageInfo = (typeof LANGUAGES)[number];

const CODES: readonly string[] = LANGUAGES.map((language) => language.code);

export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && CODES.includes(value);
}

export function languageInfo(code: Language): LanguageInfo {
  return LANGUAGES.find((language) => language.code === code) ?? LANGUAGES[0];
}
