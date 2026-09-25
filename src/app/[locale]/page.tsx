import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAvailability, getHomePage } from "@/lib/content";
import { resolveImage, resolveVideo } from "@/lib/media";
import { pick } from "@/lib/text";
import FloatingHexagons from "@/components/shared/FloatingHexagons";
import AvailabilityBadge from "@/components/home/AvailabilityBadge";
import OfferCard from "@/components/home/OfferCard";
import WhySection from "@/components/home/WhySection";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const [home, availability] = await Promise.all([
    getHomePage(locale as (typeof routing.locales)[number]),
    getAvailability(),
  ]);
  const { hero, offer, why } = home;
  const video = resolveVideo(hero?.video);

  const cards = [
    { key: "queenBees", href: "/queens", card: offer?.queenBees, fallbackTitle: t("cat_queens"), fallbackDesc: t("cat_queens_desc") },
    { key: "queenCells", href: "/cells", card: offer?.queenCells, fallbackTitle: t("cat_cells"), fallbackDesc: t("cat_cells_desc") },
    { key: "beeNucs", href: "/nucs", card: offer?.beeNucs, fallbackTitle: t("cat_nucs"), fallbackDesc: t("cat_nucs_desc") },
  ] as const;

  const reasons = (["heritage", "healthy", "service"] as const).map((key) => ({
    key,
    title: pick(why?.[key]?.title, t(`trust_${key}`)),
    description: pick(why?.[key]?.description, t(`trust_${key}_desc`)),
    image: resolveImage(why?.[key]?.image),
  }));

  return (
    <>
      {/* ════════ HERO ════════ */}
      <section className="relative flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center overflow-hidden bg-[#0b190a]">
        {video && (
          <video
            key={video.src}
            className="absolute inset-0 h-full w-full object-cover scale-110"
            style={{ filter: "blur(4px)" }}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          >
            <source src={video.src} type={video.type} />
          </video>
        )}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none" aria-hidden="true" />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Film grain */}
        <div className="noise-layer absolute inset-0 pointer-events-none" aria-hidden="true" />

        <FloatingHexagons />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          {hero?.badge && (
            <div className="mb-7 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-amber/30 bg-brand-amber/[0.1] px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-brand-amber backdrop-blur-sm">
                <span className="h-1 w-1 rounded-full bg-brand-amber" />
                {hero.badge}
              </span>
            </div>
          )}

          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.0] tracking-tight"
            style={{ textShadow: "0 4px 48px rgba(0,0,0,0.5)" }}
          >
            {pick(hero?.title, t("hero_title"))}
          </h1>

          <p className="mt-7 text-lg sm:text-xl text-white/50 max-w-xl mx-auto leading-relaxed">
            {pick(hero?.subtitle, t("hero_subtitle"))}
          </p>

          <div className="mt-12">
            {/* Scrolls to the category cards below */}
            <a
              href="#offer"
              className="inline-flex items-center gap-2.5 rounded-full bg-brand-amber px-9 py-4 text-sm font-semibold text-[#0c1500] shadow-2xl shadow-brand-amber/20 transition-all duration-300 hover:bg-brand-amber-dark hover:shadow-brand-amber/35 hover:-translate-y-0.5 active:translate-y-0"
            >
              {pick(hero?.ctaLabel, t("cta"))}
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="mt-20 flex flex-col items-center gap-2 opacity-30">
            {hero?.scrollLabel && (
              <span className="text-[0.6rem] font-semibold tracking-[0.3em] uppercase text-white">
                {hero.scrollLabel}
              </span>
            )}
            <div className="h-10 w-px bg-gradient-to-b from-white to-transparent" />
          </div>
        </div>

        {/* Fade into next section */}
        <div
          className="absolute bottom-0 inset-x-0 h-36 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #191000)" }}
          aria-hidden="true"
        />
      </section>

      {/* ════════ PRODUCT CATEGORIES ════════ */}
      {/* scroll-mt clears the sticky navbar when jumping here from the hero */}
      <section id="offer" className="photo-amber relative scroll-mt-20 py-20 sm:py-28">
        <div className="noise-layer absolute inset-0 pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {pick(offer?.title, t("categories_title"))}
            </h2>
            <div className="mt-4 mx-auto h-px w-16 bg-gradient-to-r from-transparent via-brand-amber/60 to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {cards.map(({ key, href, card, fallbackTitle, fallbackDesc }, index) => (
              <OfferCard
                key={key}
                href={href}
                title={pick(card?.title, fallbackTitle)}
                eyebrow={card?.eyebrow}
                description={pick(card?.description, fallbackDesc)}
                image={resolveImage(card?.image)}
                ctaLabel={pick(offer?.cardCta, t("cat_cta"))}
                accent={index === 1}
                badge={<AvailabilityBadge range={availability[key]} accent={index === 1} />}
              />
            ))}
          </div>
        </div>

        {/* Fade into forest section */}
        <div
          className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #020810)" }}
          aria-hidden="true"
        />
      </section>

      <WhySection title={pick(why?.title, t("trust_title"))} reasons={reasons} />
    </>
  );
}
