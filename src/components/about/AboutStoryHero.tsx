import Image from "next/image";
import type { ImageSource } from "@/lib/media";
import ParallaxLayer from "@/components/about/ParallaxLayer";

type Props = {
  eyebrow?: string | null;
  title: string;
  image: ImageSource | null; // null → plain dark background until a photo is uploaded
};

// "Our story" — a full-screen photo below the navbar that drifts with the
// scroll, with a small eyebrow and the large title in the bottom-left corner.
export default function AboutStoryHero({ eyebrow, title, image }: Props) {
  return (
    // Height = screen minus the sticky navbar (h-20 + 1px bottom border)
    <section className="relative h-[calc(100svh-81px)] min-h-[520px] w-full overflow-hidden bg-brand-dark">
      {image && (
        <ParallaxLayer className="absolute inset-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: image.focus }}
          />
        </ParallaxLayer>
      )}

      {/* Legibility scrim — darkest behind the bottom-left text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.25) 100%), linear-gradient(to right, rgba(0,0,0,0.35), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        {eyebrow && (
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white/85">{eyebrow}</p>
        )}
        <h1
          className="mt-5 max-w-3xl text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-white"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
