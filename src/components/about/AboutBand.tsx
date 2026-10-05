import Image from "next/image";
import Reveal from "@/components/shared/Reveal";
import AboutText, { type AboutButton } from "@/components/about/AboutText";
import type { ImageSource } from "@/lib/media";

type Props = {
  id: string;
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  button?: AboutButton | null;
  image: ImageSource | null; // null → plain dark band until a photo is uploaded
};

// An About topic as a full-width photo band, darkened from the left, with the
// text over the dark side. White text in both themes, since it sits on a photo.
export default function AboutBand({ id, eyebrow, title, description, button, image }: Props) {
  return (
    <section
      id={id}
      className="relative flex min-h-[560px] scroll-mt-20 items-center overflow-hidden bg-brand-dark py-20"
    >
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: image.focus }}
        />
      )}

      {/* Even scrim on phones, where the text spans the width; a left-to-right fade from lg up */}
      <div
        className="absolute inset-0 pointer-events-none bg-black/55 lg:bg-transparent lg:bg-gradient-to-r lg:from-black/80 lg:via-black/45 lg:to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <AboutText eyebrow={eyebrow} title={title} description={description} button={button} onPhoto />
        </Reveal>
      </div>
    </section>
  );
}
