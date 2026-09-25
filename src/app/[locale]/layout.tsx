import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getSiteSettings } from "@/lib/content";
import { resolveImage } from "@/lib/media";
import { pick } from "@/lib/text";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "../globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin", "latin-ext", "greek"],
  display: "swap",
});

// Fallbacks for anything left empty in /admin → Site settings
const DEFAULT_NAME = "Μελισσοκομία Κρήτης";
const DEFAULT_TITLE = "Μελισσοκομία Κρήτης — Pure Cretan Queen Bees";
const DEFAULT_DESCRIPTION =
  "Queen bees, queen cells, and bee nucs bred with care in the heart of Crete. Βασίλισσες μέλισσες, βασιλικά κελιά και παραφυάδες από την Κρήτη.";

type Locale = (typeof routing.locales)[number];

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const { seo } = await getSiteSettings(locale as Locale);
  return {
    title: pick(seo?.title, DEFAULT_TITLE),
    description: pick(seo?.description, DEFAULT_DESCRIPTION),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const settings = await getSiteSettings(locale as Locale);
  const siteName = pick(settings.siteName, DEFAULT_NAME);
  const logo = resolveImage(settings.logo);
  const footer = settings.footer;

  return (
    <html lang={locale} className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider>
          <Navbar siteName={siteName} logo={logo} />
          <main className="flex-1">{children}</main>
          <Footer
            siteName={siteName}
            logo={logo}
            tagline={footer?.tagline}
            address={footer?.address}
            email={footer?.email}
            phone={footer?.phone}
            domain={footer?.domain}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
