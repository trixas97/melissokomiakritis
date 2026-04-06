import { useTranslations } from "next-intl";

export default function ShopPage() {
  const t = useTranslations("shop");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl font-bold text-brand-dark">
        {t("title")}
      </h1>
      <p className="mt-2 text-brand-warm-gray">{t("shipping_notice")}</p>
    </div>
  );
}
