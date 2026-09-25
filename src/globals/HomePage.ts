import type { GlobalConfig } from "payload";
import { isLoggedIn } from "../collections/access";
import { group, localizedText, localizedTextarea, mediaUpload } from "./fields";

const offerCard = (name: string, label: string) =>
  group(name, label, [
    localizedText("title"),
    localizedText("eyebrow", "Small label under the title"),
    localizedTextarea("description"),
    mediaUpload("image", "Photo"),
  ]);

const reason = (name: string, label: string) =>
  group(name, label, [
    localizedText("title"),
    localizedTextarea("description"),
    mediaUpload("image", "Photo", "Shown inside a hexagon — set the focal point on the photo to keep the subject in view."),
  ]);

// Content of the home page, section by section. Layout, colours and animation
// stay in code; every word and photo is edited here.
export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home page",
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  fields: [
    group("hero", "Hero (top of the page)", [
      localizedText("badge", "Small badge above the title"),
      localizedText("title"),
      localizedTextarea("subtitle"),
      localizedText("ctaLabel", "Button label"),
      localizedText("scrollLabel", "Scroll hint label"),
      mediaUpload("video", "Background video", "MP4 or WebM, muted and looping. Keep it short and light (under ~10 MB)."),
    ]),
    group("offer", "What we offer", [
      localizedText("title"),
      localizedText("cardCta", "Card button label"),
      offerCard("queenBees", "Queen bees card"),
      offerCard("queenCells", "Queen cells card"),
      offerCard("beeNucs", "Bee nucs card"),
    ]),
    group("why", "Why us", [
      localizedText("title"),
      reason("heritage", "Reason 1"),
      reason("healthy", "Reason 2"),
      reason("service", "Reason 3"),
    ]),
  ],
};
