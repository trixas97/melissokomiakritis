"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { getStoredTheme, getSystemTheme, storeTheme, watchSystemTheme, type Theme } from "@/lib/theme";

const root = () => document.documentElement;

// The current theme is whatever <html data-theme> says (set before paint by
// THEME_INIT_SCRIPT), so the button re-renders when that attribute changes.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(root(), { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getTheme = (): Theme => (root().dataset.theme === "light" ? "light" : "dark");
const getServerTheme = (): Theme | null => null; // unknown until the browser runs

const applyTheme = (theme: Theme) => {
  root().dataset.theme = theme;
};

// Sun/moon button in the navbar. The icon is switched by CSS, so it is right
// even before hydration.
export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const t = useTranslations("nav");

  // Until the visitor picks a theme, follow the device setting as it changes
  useEffect(
    () =>
      watchSystemTheme(() => {
        if (!getStoredTheme()) applyTheme(getSystemTheme());
      }),
    [],
  );

  function toggleTheme() {
    const next = getTheme() === "light" ? "dark" : "light";
    applyTheme(next);
    storeTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t("theme_light")}
      aria-pressed={theme === null ? undefined : theme === "light"}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-fg-soft transition-all duration-200 hover:border-brand-amber/50 hover:bg-ink/[0.08] hover:text-fg"
    >
      {/* Sun in the dark theme (switch to light), moon in the light theme */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 light:hidden"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hidden h-4 w-4 light:block"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
