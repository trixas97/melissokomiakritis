import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ImageSource } from "@/lib/media";
import Logo from "./Logo";

type Props = {
  siteName: string;
  logo: ImageSource | null;
  logoLight?: ImageSource | null;
  tagline?: string | null;
  address?: string | null;
  email?: string | null;
  phone?: string | null;
  domain?: string | null;
};

// Content comes from /admin → Site settings (passed in by the locale layout);
// headings and link labels from /admin → Labels.
export default function Footer({ siteName, logo, logoLight, tagline, address, email, phone, domain }: Props) {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const quickLinks = [
    { href: "/queens" as const, label: nav("queens") },
    { href: "/cells" as const, label: nav("cells") },
    { href: "/nucs" as const, label: nav("nucs") },
    { href: "/about" as const, label: nav("about") },
    { href: "/faqs" as const, label: nav("faqs") },
    { href: "/gallery" as const, label: nav("gallery") },
    { href: "/contact" as const, label: nav("contact") },
  ];

  return (
    <footer className="photo-footer relative overflow-hidden">
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
        {/* Logo, centred above the columns */}
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="transition-opacity duration-300 hover:opacity-80">
            <Logo logo={logo} logoLight={logoLight} siteName={siteName} className="h-20 w-auto" />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">{tagline}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-10 text-center sm:grid-cols-2">
          {/* Quick links */}
          <div>
            <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent/80 mb-4">
              {t("quick_links")}
            </h3>
            {/* Two columns filled top to bottom: 4 links, then the rest */}
            <ul className="inline-grid grid-flow-col grid-rows-4 gap-x-10 gap-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fg-muted transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent/80 mb-4">
              {t("contact_heading")}
            </h3>
            <ul className="space-y-2.5 text-sm text-fg-muted">
              {address && <li>{address}</li>}
              {email && <li>{email}</li>}
              {phone && <li>{phone}</li>}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-ink/[0.07] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-fg-faint">
            &copy; {new Date().getFullYear()} {siteName}. {t("rights")}
          </p>
          {domain && <p className="text-xs text-fg-faint tracking-wide">{domain}</p>}
        </div>
      </div>
    </footer>
  );
}
