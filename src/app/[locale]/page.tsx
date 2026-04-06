import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/* ── Trust section icons ── */

function HeritageIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M24 4l16 9v22L24 44 8 35V13L24 4z"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.2"
      />
      <path d="M24 12l8 4.6v9.2L24 30.4l-8-4.6v-9.2L24 12z" fill="currentColor" opacity="0.15" />
      <path d="M24 16l4 2.3v4.6L24 25.2l-4-2.3v-4.6L24 16z" fill="currentColor" />
    </svg>
  );
}

function HealthIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.2" opacity="0.2" />
      <circle cx="24" cy="24" r="10" fill="currentColor" opacity="0.1" />
      <path
        d="M18 24h12M24 18v12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ServiceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M24 4C13 4 4 13 4 24c0 4 1.2 7.7 3.2 10.8L4 44l9.2-3.2C16.3 42.8 20 44 24 44c11 0 20-9 20-20S35 4 24 4z"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.2"
      />
      <path
        d="M24 8c-8.8 0-16 7.2-16 16 0 3.2.9 6.2 2.6 8.7L8 40l7.3-2.6c2.5 1.7 5.5 2.6 8.7 2.6 8.8 0 16-7.2 16-16S32.8 8 24 8z"
        fill="currentColor"
        opacity="0.08"
      />
      <circle cx="17" cy="24" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="31" cy="24" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

/* ── Floating hexagon decorations ── */

function FloatingHexagons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        viewBox="0 0 120 140"
        className="absolute -top-12 -right-8 w-72 text-brand-amber opacity-[0.05]"
        fill="currentColor"
      >
        <path d="M60 0l60 35v70L60 140 0 105V35L60 0z" />
      </svg>
      <svg
        viewBox="0 0 120 140"
        className="absolute -bottom-10 -left-8 w-48 text-white opacity-[0.04]"
        fill="currentColor"
      >
        <path d="M60 0l60 35v70L60 140 0 105V35L60 0z" />
      </svg>
      <svg
        viewBox="0 0 120 140"
        className="absolute top-1/3 left-[12%] w-14 text-brand-amber opacity-[0.08]"
        fill="currentColor"
      >
        <path d="M60 0l60 35v70L60 140 0 105V35L60 0z" />
      </svg>
      <svg
        viewBox="0 0 120 140"
        className="absolute top-1/2 right-[18%] w-9 text-white opacity-[0.06]"
        fill="currentColor"
      >
        <path d="M60 0l60 35v70L60 140 0 105V35L60 0z" />
      </svg>
    </div>
  );
}

/* ── Page ── */

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <>
      {/* ════════ HERO ════════ */}
      <section className="relative flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center overflow-hidden bg-[#0b190a]">
        {/* Background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover scale-110"
          style={{ filter: "blur(4px)" }}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        >
          <source src="/bee-animation.mp4" type="video/mp4" />
        </video>

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
          {/* Overline badge */}
          <div className="mb-7 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-amber/30 bg-brand-amber/[0.1] px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-brand-amber backdrop-blur-sm">
              <span className="h-1 w-1 rounded-full bg-brand-amber" />
              Κρήτη · Crete
            </span>
          </div>

          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.0] tracking-tight"
            style={{ textShadow: "0 4px 48px rgba(0,0,0,0.5)" }}
          >
            {t("hero_title")}
          </h1>

          <p className="mt-7 text-lg sm:text-xl text-white/50 max-w-xl mx-auto leading-relaxed">
            {t("hero_subtitle")}
          </p>

          <div className="mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2.5 rounded-full bg-brand-amber px-9 py-4 text-sm font-semibold text-[#0c1500] shadow-2xl shadow-brand-amber/20 transition-all duration-300 hover:bg-brand-amber-dark hover:shadow-brand-amber/35 hover:-translate-y-0.5 active:translate-y-0"
            >
              {t("cta")}
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="mt-20 flex flex-col items-center gap-2 opacity-30">
            <span className="text-[0.6rem] font-semibold tracking-[0.3em] uppercase text-white">
              Scroll
            </span>
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
      <section className="photo-amber relative py-20 sm:py-28">
        <div className="noise-layer absolute inset-0 pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="mb-14 text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {t("categories_title")}
            </h2>
            <div className="mt-4 mx-auto h-px w-16 bg-gradient-to-r from-transparent via-brand-amber/60 to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* ── Queen Bees ── */}
            <Link
              href="/shop"
              className="group glass-dark flex flex-col rounded-[2rem] overflow-hidden shadow-2xl shadow-black/60 transition-all duration-500 hover:-translate-y-3"
            >
              {/* Photo area */}
              <div className="relative h-56 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.pexels.com/photos/36766950/pexels-photo-36766950/free-photo-of-close-up-of-honey-bees-on-active-honeycomb.jpeg?auto=compress&cs=tinysrgb&w=800&h=560&dpr=1"
                  alt="Queen bee on honeycomb"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-5 left-5 rounded-full border border-white/[0.2] bg-black/[0.35] px-3.5 py-1.5 backdrop-blur-md">
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-amber">
                    Διαθέσιμο
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-8">
                <h3 className="font-display text-2xl font-bold text-white mb-1">
                  {t("cat_queens")}
                </h3>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-amber mb-6">
                  Apis Mellifera · Κρήτη
                </p>
                <p className="text-sm leading-relaxed text-white/40 flex-1 mb-8">
                  {t("cat_queens_desc")}
                </p>
                <div className="w-full rounded-xl border border-white/[0.12] bg-white/[0.04] py-3.5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 transition-all duration-300 group-hover:border-transparent group-hover:bg-brand-amber group-hover:text-[#0c1500]">
                  {t("cat_cta")}
                </div>
              </div>
            </Link>

            {/* ── Queen Cells ── */}
            <Link
              href="/shop"
              className="group glass-dark flex flex-col rounded-[2rem] overflow-hidden shadow-2xl shadow-black/60 transition-all duration-500 hover:-translate-y-3 sm:-mt-4"
              style={{ borderColor: "rgba(245,166,35,0.18)" }}
            >
              <div className="relative h-56 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.pexels.com/photos/56876/queen-cup-honeycomb-honey-bee-new-queen-rearing-compartment-56876.jpeg?auto=compress&cs=tinysrgb&w=800&h=560&dpr=1"
                  alt="Queen cells on honeycomb"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-5 left-5 rounded-full border border-brand-amber/30 bg-brand-amber/[0.25] px-3.5 py-1.5 backdrop-blur-md">
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-amber">
                    Σεζόν 2025
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-8">
                <h3 className="font-display text-2xl font-bold text-white mb-1">
                  {t("cat_cells")}
                </h3>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-amber mb-6">
                  Carniolan Hybrid · Grafted
                </p>
                <p className="text-sm leading-relaxed text-white/40 flex-1 mb-8">
                  {t("cat_cells_desc")}
                </p>
                <div className="w-full rounded-xl border border-brand-amber/25 bg-brand-amber/[0.08] py-3.5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-brand-amber transition-all duration-300 group-hover:border-transparent group-hover:bg-brand-amber group-hover:text-[#0c1500]">
                  {t("cat_cta")}
                </div>
              </div>
            </Link>

            {/* ── Bee Colonies ── */}
            <Link
              href="/shop"
              className="group glass-dark flex flex-col rounded-[2rem] overflow-hidden shadow-2xl shadow-black/60 transition-all duration-500 hover:-translate-y-3"
            >
              <div className="relative h-56 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.pexels.com/photos/17859331/pexels-photo-17859331/free-photo-of-beekeeper-holding-hive-frame.jpeg?auto=compress&cs=tinysrgb&w=800&h=560&dpr=1"
                  alt="Beekeeper holding hive frame with colony"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-5 left-5 rounded-full border border-white/[0.2] bg-black/[0.35] px-3.5 py-1.5 backdrop-blur-md">
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-amber">
                    Διαθέσιμο
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-8">
                <h3 className="font-display text-2xl font-bold text-white mb-1">
                  {t("cat_colonies")}
                </h3>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-amber mb-6">
                  Established Colony · 8+ Frames
                </p>
                <p className="text-sm leading-relaxed text-white/40 flex-1 mb-8">
                  {t("cat_colonies_desc")}
                </p>
                <div className="w-full rounded-xl border border-white/[0.12] bg-white/[0.04] py-3.5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 transition-all duration-300 group-hover:border-transparent group-hover:bg-brand-amber group-hover:text-[#0c1500]">
                  {t("cat_cta")}
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Fade into forest section */}
        <div
          className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #020810)" }}
          aria-hidden="true"
        />
      </section>

      {/* ════════ TRUST / WHY US ════════ */}
      <section className="photo-forest relative py-20 sm:py-28">
        <div className="noise-layer absolute inset-0 pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="mb-14 text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {t("trust_title")}
            </h2>
            <div className="mt-4 mx-auto h-px w-16 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Heritage */}
            <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.07] hover:border-white/[0.13]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.06] mb-6 transition-colors duration-300 group-hover:border-brand-amber/25">
                <HeritageIcon className="h-7 w-7 text-brand-amber" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2.5">
                {t("trust_heritage")}
              </h3>
              <p className="text-sm leading-relaxed text-white/40">
                {t("trust_heritage_desc")}
              </p>
            </div>

            {/* Healthy */}
            <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.07] hover:border-white/[0.13]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.06] mb-6 transition-colors duration-300 group-hover:border-brand-amber/25">
                <HealthIcon className="h-7 w-7 text-brand-amber" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2.5">
                {t("trust_healthy")}
              </h3>
              <p className="text-sm leading-relaxed text-white/40">
                {t("trust_healthy_desc")}
              </p>
            </div>

            {/* Service */}
            <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.07] hover:border-white/[0.13]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.06] mb-6 transition-colors duration-300 group-hover:border-brand-amber/25">
                <ServiceIcon className="h-7 w-7 text-brand-amber" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2.5">
                {t("trust_service")}
              </h3>
              <p className="text-sm leading-relaxed text-white/40">
                {t("trust_service_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
