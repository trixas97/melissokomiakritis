// Light/dark theme, shared by the pre-paint script (layout) and the navbar toggle.
// The theme lives in <html data-theme>; a visitor's explicit choice is kept in
// localStorage, otherwise the device setting decides.

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

const LIGHT_QUERY = "(prefers-color-scheme: light)";

export const isTheme = (value: unknown): value is Theme => value === "light" || value === "dark";

// Runs inline in <head> before the first paint, so the page never flashes the
// wrong theme. Kept dependency-free: it is serialised into the HTML.
export const THEME_INIT_SCRIPT = `(function(){var d=document.documentElement;try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t!=="light"&&t!=="dark")t=matchMedia(${JSON.stringify(LIGHT_QUERY)}).matches?"light":"dark";d.dataset.theme=t}catch(e){d.dataset.theme="dark"}})()`;

export const getSystemTheme = (): Theme => (window.matchMedia(LIGHT_QUERY).matches ? "light" : "dark");

export const watchSystemTheme = (onChange: () => void) => {
  const query = window.matchMedia(LIGHT_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

export function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    return null; // storage blocked (private mode, cookies off)
  }
}

export function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // storage blocked — the choice lasts until the page is left
  }
}
