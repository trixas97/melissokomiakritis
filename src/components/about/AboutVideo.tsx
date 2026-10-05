import Reveal from "@/components/shared/Reveal";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import { toParagraphs } from "@/lib/text";

type Props = {
  videoId: string;
  title: string;
  description?: string | null;
};

// The About page's YouTube video: centred heading and text above a 16:9
// player, on the plain page background like the introduction.
export default function AboutVideo({ videoId, title, description }: Props) {
  const paragraphs = toParagraphs(description);

  return (
    <section id="video" className="scroll-mt-20 px-4 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-accent">{title}</h2>
          {paragraphs.length > 0 && (
            <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-fg-muted">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>

        <div className="relative mt-12 aspect-video w-full overflow-hidden rounded-2xl bg-ink/[0.06] shadow-2xl shadow-shadow/40">
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
      </Reveal>
    </section>
  );
}
