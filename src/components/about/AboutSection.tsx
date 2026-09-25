import Image from "next/image";
import FloatingHexagons, { type HexagonCell } from "@/components/shared/FloatingHexagons";
import type { ImageSource } from "@/lib/media";

type Props = {
  id: string; // anchor, e.g. the story hero's Discover link targets the first section
  title?: string | null;
  description?: string | null;
  image: ImageSource | null; // null → an empty tinted frame until a photo is uploaded
  imageSide: "left" | "right";
  background: string; // photographic gradient class from globals.css, e.g. "photo-amber"
  cells: HexagonCell[];
};

// One About page topic: text on one side, photo on the other, over a
// photographic gradient with floating honeycomb cells. Stacks text-then-photo
// on small screens.
export default function AboutSection({ id, title, description, image, imageSide, background, cells }: Props) {
  const paragraphs = (description ?? "").split(/\n\s*\n/).filter((p) => p.trim());
  const photoFirst = imageSide === "left";

  return (
    // scroll-mt clears the sticky navbar when jumped to via an anchor
    <section id={id} className={`relative scroll-mt-20 overflow-hidden py-20 sm:py-28 ${background}`}>
      <div className="noise-layer absolute inset-0 pointer-events-none" aria-hidden="true" />
      <FloatingHexagons cells={cells} />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div className={photoFirst ? "lg:order-2" : ""}>
          {title && (
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {title}
            </h2>
          )}
          <div className="mt-5 h-px w-16 bg-gradient-to-r from-brand-amber/70 to-transparent" />
          <div className="mt-7 max-w-prose space-y-4 text-base sm:text-lg leading-relaxed text-white/65">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div
          className={`relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.04] shadow-2xl shadow-black/50 ${
            photoFirst ? "lg:order-1" : ""
          }`}
        >
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
              style={{ objectPosition: image.focus }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
