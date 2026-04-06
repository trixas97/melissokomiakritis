import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const quickLinks = [
    { href: "/shop" as const, label: nav("shop") },
    { href: "/about" as const, label: nav("about") },
    { href: "/faqs" as const, label: nav("faqs") },
    { href: "/contact" as const, label: nav("contact") },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #060e04 0%, #0c1a07 30%, #0a0e0a 60%, #040804 100%)",
      }}
    >
      {/* Noise grain */}
      <div className="noise-layer absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Amber glow bleeding up from previous section */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(245,166,35,0.15), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <svg
                viewBox="0 0 32 32"
                className="h-6 w-6 text-brand-amber"
                fill="currentColor"
              >
                <path d="M16 2l8 4.6v9.2L16 20.4 8 15.8V6.6L16 2zm0 2.3L10 8v7l6 3.5L22 15V8l-6-3.7z" />
              </svg>
              <span className="font-display text-base font-bold text-white tracking-tight">
                Μελισσοκομία Κρήτης
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/35">{t("tagline")}</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brand-amber/70 mb-4">
              {t("quick_links")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 transition-colors duration-200 hover:text-brand-amber"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brand-amber/70 mb-4">
              {t("contact_heading")}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/40">
              <li>Crete, Greece</li>
              <li>info@melissokomiakritis.gr</li>
              <li>+30 XXX XXX XXXX</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Μελισσοκομία Κρήτης. {t("rights")}
          </p>
          <p className="text-xs text-white/20 tracking-wide">melissokomiakritis.gr</p>
        </div>
      </div>
    </footer>
  );
}
