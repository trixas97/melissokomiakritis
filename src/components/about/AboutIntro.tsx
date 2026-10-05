import Reveal from "@/components/shared/Reveal";
import { toParagraphs } from "@/lib/text";

type Props = {
  title?: string | null;
  description?: string | null;
};

// The centred introduction under the story photo: a heading and a few
// paragraphs on the plain page background.
export default function AboutIntro({ title, description }: Props) {
  const paragraphs = toParagraphs(description);
  if (!title && paragraphs.length === 0) return null;

  return (
    <section className="px-4 pt-20 sm:px-6 sm:pt-28 lg:px-8">
      <Reveal className="mx-auto max-w-4xl">
        {title && <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-accent">{title}</h2>}
        <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-fg-muted">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
