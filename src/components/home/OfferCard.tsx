import Image from "next/image";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import type { ImageSource } from "@/lib/media";

type Props = {
  href: "/queens" | "/cells" | "/nucs";
  title: string;
  eyebrow?: string | null;
  description?: string | null;
  image: ImageSource | null;
  ctaLabel: string;
  badge: ReactNode; // availability badge, positioned over the photo
  accent?: boolean; // the raised, amber-tinted middle card
};

// One "What we offer" category card linking to its category page.
export default function OfferCard({ href, title, eyebrow, description, image, ctaLabel, badge, accent = false }: Props) {
  return (
    <Link
      href={href}
      className={`group glass-dark flex flex-col rounded-[2rem] overflow-hidden shadow-2xl shadow-black/60 transition-all duration-500 hover:-translate-y-3 ${
        accent ? "sm:-mt-4" : ""
      }`}
      style={accent ? { borderColor: "rgba(245,166,35,0.18)" } : undefined}
    >
      <div className="relative h-56 overflow-hidden bg-white/[0.03]">
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ objectPosition: image.focus }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        {badge}
      </div>

      <div className="flex flex-1 flex-col p-8">
        <h3 className="font-display text-2xl font-bold text-white mb-1">{title}</h3>
        {eyebrow && (
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-amber mb-6">{eyebrow}</p>
        )}
        <p className="text-sm leading-relaxed text-white/40 flex-1 mb-8">{description}</p>
        <div
          className={`w-full rounded-xl border py-3.5 text-center text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 group-hover:border-transparent group-hover:bg-brand-amber group-hover:text-[#0c1500] ${
            accent
              ? "border-brand-amber/25 bg-brand-amber/[0.08] text-brand-amber"
              : "border-white/[0.12] bg-white/[0.04] text-white/60"
          }`}
        >
          {ctaLabel}
        </div>
      </div>
    </Link>
  );
}
