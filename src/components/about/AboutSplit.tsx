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
  image: ImageSource | null; // null → an empty tinted frame until a photo is uploaded
};

// An About topic as text on the left and a photo on the right, on the plain
// page background. Stacks text-then-photo on small screens.
export default function AboutSplit({ id, eyebrow, title, description, button, image }: Props) {
  return (
    // scroll-mt clears the sticky navbar when jumped to via an anchor
    <section id={id} className="scroll-mt-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <AboutText eyebrow={eyebrow} title={title} description={description} button={button} />
        </Reveal>

        <Reveal className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink/[0.06]">
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: image.focus }}
            />
          )}
        </Reveal>
      </div>
    </section>
  );
}
