import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAboutPage } from "@/lib/content";
import { resolveImage } from "@/lib/media";
import { pick } from "@/lib/text";
import { parseYouTubeId } from "@/lib/youtube";
import type { AboutPage as AboutPageContent } from "@/payload-types";
import AboutStoryHero from "@/components/about/AboutStoryHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutSplit from "@/components/about/AboutSplit";
import AboutBand from "@/components/about/AboutBand";
import AboutVideo from "@/components/about/AboutVideo";

type Props = {
  params: Promise<{ locale: string }>;
};

// Fixed layout per topic: the first sits beside a photo, the rest are
// full-width photo bands. The words and photos come from /admin → About page.
const TOPICS = [
  { key: "beekeeping", Layout: AboutSplit },
  { key: "queenRearing", Layout: AboutBand },
  { key: "nucs", Layout: AboutBand },
] as const;

type Topic = NonNullable<AboutPageContent[(typeof TOPICS)[number]["key"]]>;

// The button only shows when the owner gave it both a label and a page
const resolveButton = (button: Topic["button"]) =>
  button?.label?.trim() && button.link ? { label: button.label, href: `/${button.link}` } : null;

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("about");
  const content = await getAboutPage(locale as (typeof routing.locales)[number]);
  const videoId = parseYouTubeId(content.video?.youtubeUrl);

  return (
    <>
      <AboutStoryHero
        eyebrow={content.story?.eyebrow}
        title={pick(content.story?.title, t("story_title"))}
        image={resolveImage(content.story?.image)}
      />

      <AboutIntro title={content.story?.introTitle} description={content.story?.description} />

      <div className="flex flex-col gap-16 py-20 sm:gap-20 sm:py-28">
        {TOPICS.map(({ key, Layout }) => (
          <Layout
            key={key}
            id={key}
            eyebrow={content[key]?.eyebrow}
            title={content[key]?.title}
            description={content[key]?.description}
            button={resolveButton(content[key]?.button)}
            image={resolveImage(content[key]?.image)}
          />
        ))}

        {videoId && (
          <AboutVideo
            videoId={videoId}
            title={pick(content.video?.title, t("video_title"))}
            description={content.video?.description}
          />
        )}
      </div>
    </>
  );
}
