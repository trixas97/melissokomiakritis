import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAboutPage } from "@/lib/content";
import { resolveImage } from "@/lib/media";
import { pick } from "@/lib/text";
import AboutSection from "@/components/about/AboutSection";
import AboutStoryHero from "@/components/about/AboutStoryHero";

type Props = {
  params: Promise<{ locale: string }>;
};

// Fixed layout per topic, following the client's brief; the words and photos
// come from /admin → About page.
// The large cell sits on the text side so it never covers the photo.
const SECTIONS = [
  {
    key: "beekeeping",
    imageSide: "right",
    background: "photo-amber",
    cells: [
      { className: "-top-16 -left-12 w-72 text-brand-amber opacity-[0.05]" },
      { className: "-bottom-12 right-[6%] w-40 text-white opacity-[0.04]" },
      { className: "top-[22%] left-[46%] w-10 text-brand-amber opacity-[0.08]" },
      { className: "bottom-[14%] left-[8%] w-8 text-white opacity-[0.06]" },
    ],
  },
  {
    key: "queenRearing",
    imageSide: "left",
    background: "photo-forest",
    cells: [
      { className: "-top-14 -right-10 w-72 text-brand-amber opacity-[0.05]" },
      { className: "-bottom-14 left-[4%] w-44 text-white opacity-[0.04]" },
      { className: "top-[18%] right-[44%] w-9 text-white opacity-[0.06]" },
      { className: "bottom-[16%] right-[10%] w-12 text-brand-amber opacity-[0.08]" },
    ],
  },
  {
    key: "nucs",
    imageSide: "right",
    background: "photo-olive",
    cells: [
      { className: "-bottom-16 -left-10 w-64 text-brand-amber opacity-[0.05]" },
      { className: "-top-10 right-[10%] w-36 text-white opacity-[0.04]" },
      { className: "top-[16%] left-[10%] w-12 text-brand-amber opacity-[0.08]" },
      { className: "bottom-[20%] left-[47%] w-8 text-white opacity-[0.06]" },
    ],
  },
] as const;

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("about");
  const content = await getAboutPage(locale as (typeof routing.locales)[number]);

  return (
    <>
      <AboutStoryHero
        title={pick(content.story?.title, t("story_title"))}
        description={content.story?.description}
        image={resolveImage(content.story?.image)}
        discoverLabel={t("discover")}
        targetId={SECTIONS[0].key}
      />

      {SECTIONS.map(({ key, imageSide, background, cells }) => (
        <AboutSection
          key={key}
          id={key}
          title={content[key]?.title}
          description={content[key]?.description}
          image={resolveImage(content[key]?.image)}
          imageSide={imageSide}
          background={background}
          cells={[...cells]}
        />
      ))}
    </>
  );
}
