import { getTranslations } from "next-intl/server";
import { parseMonthRange } from "@/lib/months";

type Props = {
  range: { from?: string | null; to?: string | null } | null | undefined;
};

// "Available Apr – Sep" pill on a product category card. Renders nothing when
// the owner hasn't set both months. Month names come from the message files.
export default async function AvailabilityBadge({ range }: Props) {
  const months = parseMonthRange(range);
  if (!months) return null;

  const t = await getTranslations("home");
  const monthName = await getTranslations("months");
  const label = (style: "short" | "long") =>
    months.from === months.to
      ? monthName(`${style}.${months.from}`)
      : `${monthName(`${style}.${months.from}`)} – ${monthName(`${style}.${months.to}`)}`;

  return (
    <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/[0.2] bg-black/[0.35] px-3.5 py-1.5 backdrop-blur-md">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-amber" aria-hidden="true" />
      <span className="text-xs font-semibold text-brand-amber" aria-hidden="true">
        {t("available", { range: label("short") })}
      </span>
      <span className="sr-only">{t("available", { range: label("long") })}</span>
    </div>
  );
}
