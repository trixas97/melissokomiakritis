import { useTranslations } from "next-intl";

export default function FaqsPage() {
  const t = useTranslations("faqs");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl font-bold text-white">
        {t("title")}
      </h1>
    </div>
  );
}
