import { useTranslations } from "next-intl";

type Props = {
  // Nav label key, doubling as the page title
  titleKey: "queens" | "cells" | "nucs";
};

// Shared layout for the Queens, Cells and Bee Nucs pages. Placeholder until
// the product list and order form are built (PLAN.md build order step 6–7).
export default function CategoryPage({ titleKey }: Props) {
  const nav = useTranslations("nav");
  const t = useTranslations("shop");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl font-bold text-white">{nav(titleKey)}</h1>
      <p className="mt-2 text-white/60">{t("shipping_notice")}</p>
    </div>
  );
}
