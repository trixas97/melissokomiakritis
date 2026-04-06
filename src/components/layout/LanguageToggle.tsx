"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale() {
    const next = locale === "el" ? "en" : "el";
    router.replace(pathname, { locale: next });
  }

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-1 rounded-full border border-white/20 px-2.5 py-1 text-xs font-semibold tracking-wide transition-all duration-200 hover:border-brand-amber/50 hover:bg-white/[0.08]"
      aria-label={`Switch to ${locale === "el" ? "English" : "Greek"}`}
    >
      <span className={locale === "el" ? "text-white" : "text-white/35"}>EL</span>
      <span className="text-white/20">|</span>
      <span className={locale === "en" ? "text-white" : "text-white/35"}>EN</span>
    </button>
  );
}
