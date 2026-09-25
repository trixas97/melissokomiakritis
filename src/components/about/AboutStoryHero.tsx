import Image from "next/image";
import type { ImageSource } from "@/lib/media";

type Props = {
  title: string;
  description?: string | null;
  image: ImageSource | null; // null → plain dark background until a photo is uploaded
  discoverLabel: string;
  targetId: string; // id of the section the Discover link scrolls to
};

// "Our story" — labo's About hero with a still photo instead of a video:
// a full-screen background below the navbar, title and description centred on
// top, and a Discover link at the bottom that scrolls to the first section.
export default function AboutStoryHero({ title, description, image, discoverLabel, targetId }: Props) {
  return (
    // Height = screen minus the sticky navbar (h-20 + 1px bottom border)
    <section className="relative h-[calc(100svh-81px)] min-h-[520px] w-full overflow-hidden bg-brand-dark">
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: image.focus }}
        />
      )}

      {/* Legibility scrim — darkest at the top and bottom edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.65) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1
          className="max-w-4xl font-display text-5xl md:text-7xl font-bold tracking-tight text-white"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-white/90"
            style={{ textShadow: "0 1px 16px rgba(0,0,0,0.45)" }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Plain anchor: globals.css makes the jump smooth unless motion is reduced */}
      <a
        href={`#${targetId}`}
        className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 rounded-full px-4 py-2 text-white/85 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <span className="text-xs uppercase tracking-[0.2em]">{discoverLabel}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 animate-bounce motion-reduce:animate-none"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
