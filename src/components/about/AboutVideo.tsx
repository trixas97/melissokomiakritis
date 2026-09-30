import FloatingHexagons from "@/components/shared/FloatingHexagons";
import SectionFade from "@/components/shared/SectionFade";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

type Props = {
  videoId: string;
  title: string;
  description?: string | null;
};

const CELLS = [
  { className: "-top-16 -right-12 w-72 text-brand-amber opacity-[0.05]" },
  { className: "-bottom-12 left-[6%] w-40 text-ink opacity-[0.04]" },
  { className: "top-[20%] left-[8%] w-10 text-brand-amber opacity-[0.08]" },
  { className: "bottom-[18%] right-[8%] w-8 text-ink opacity-[0.06]" },
];

// The About page's YouTube video: centred heading and text above a 16:9
// player, over the same photographic gradient as the topic sections.
export default function AboutVideo({ videoId, title, description }: Props) {
  const paragraphs = (description ?? "").split(/\n\s*\n/).filter((p) => p.trim());

  return (
    <section id="video" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28 photo-forest">
      <div className="noise-layer absolute inset-0 pointer-events-none" aria-hidden="true" />
      <FloatingHexagons cells={CELLS} />
      <SectionFade edge="top" />
      <SectionFade edge="bottom" to="footer" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-prose text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-fg">{title}</h2>
          <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-brand-amber/70 to-transparent" />
          {paragraphs.length > 0 && (
            <div className="mt-7 space-y-4 text-base sm:text-lg leading-relaxed text-fg-soft">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>

        <div className="relative mt-12 aspect-video w-full overflow-hidden rounded-[2rem] border border-ink/[0.08] bg-ink/[0.04] shadow-2xl shadow-shadow/50">
          <iframe
            src={getYouTubeEmbedUrl(videoId)}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
