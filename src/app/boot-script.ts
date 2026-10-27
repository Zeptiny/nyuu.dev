import { LANGUAGES } from "@/i18n/languages";
import { LANGUAGE_KEY, THEME_KEY } from "@/shared/lib/storage-keys";

const OTHER_LANGUAGES = LANGUAGES.filter((language) => language.path !== "/").map(
  (language) => language.code,
);

/**
 * Runs in <head> before the first paint, so neither the theme nor the language flickers:
 *
 * - The saved theme, else the system's, as data-theme (shared/lib/theme.ts keeps it after that).
 * - At the English root address, a visitor whose saved language is another one, or who saved none
 *   and whose browser prefers another one first, goes to that language's page. The page stays
 *   hidden meanwhile (BOOT_STYLE).
 */
export const BOOT_SCRIPT = `(function () {
  var root = document.documentElement;
  function stored(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  var mode = stored(${JSON.stringify(THEME_KEY)});
  if (mode !== "light" && mode !== "dark") {
    mode = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  root.dataset.theme = mode;

  if (location.pathname !== "/") return;
  var others = ${JSON.stringify(OTHER_LANGUAGES)};
  var language = stored(${JSON.stringify(LANGUAGE_KEY)});
  if (language !== "en" && others.indexOf(language) < 0) {
    var preferred = navigator.languages || [];
    for (var i = 0; i < preferred.length; i++) {
      var base = preferred[i].toLowerCase().split("-")[0];
      if (base === "en" || others.indexOf(base) >= 0) { language = base; break; }
    }
  }
  if (others.indexOf(language) >= 0) {
    root.dataset.redirecting = "";
    location.replace("/" + language + location.search + location.hash);
  }
})();`;

export const BOOT_STYLE = "html[data-redirecting] body{visibility:hidden}";
