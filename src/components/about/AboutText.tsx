import { Link } from "@/i18n/navigation";
import { toParagraphs } from "@/lib/text";

export type AboutButton = { label: string; href: string };

type Props = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  button?: AboutButton | null;
  onPhoto?: boolean; // white text for the full-width photo bands
};

// The text of one About topic: eyebrow, title, paragraphs and an optional
// button. Shared by the side-by-side block and the photo bands.
export default function AboutText({ eyebrow, title, description, button, onPhoto = false }: Props) {
  const paragraphs = toParagraphs(description);

  return (
    <div className="max-w-xl">
      {eyebrow && (
        <p
          className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] ${
            onPhoto ? "text-white/75" : "text-fg-muted"
          }`}
        >
          {eyebrow}
        </p>
      )}
      {title && (
        <h2
          className={`mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${
            onPhoto ? "text-white" : "text-accent"
          }`}
        >
          {title}
        </h2>
      )}
      <div
        className={`mt-6 space-y-4 text-base sm:text-lg leading-relaxed ${onPhoto ? "text-white/85" : "text-fg-muted"}`}
      >
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {button && (
        <Link
          href={button.href}
          className="mt-9 inline-flex items-center rounded-full bg-brand-amber px-8 py-3.5 text-sm font-semibold text-[#0c1500] transition-colors duration-300 hover:bg-brand-amber-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          {button.label}
        </Link>
      )}
    </div>
  );
}
