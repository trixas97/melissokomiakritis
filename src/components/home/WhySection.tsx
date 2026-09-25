import FloatingHexagons, { type HexagonCell } from "@/components/shared/FloatingHexagons";
import type { ImageSource } from "@/lib/media";
import HexagonPhoto from "./HexagonPhoto";

type Reason = {
  key: string;
  title: string;
  description?: string | null;
  image: ImageSource | null;
};

type Props = {
  title: string;
  reasons: Reason[];
};

const CELLS: HexagonCell[] = [
  { className: "-top-16 -left-10 w-64 text-brand-amber opacity-[0.05]" },
  { className: "-bottom-14 -right-6 w-56 text-white opacity-[0.04]" },
  { className: "top-[18%] right-[8%] w-12 text-brand-amber opacity-[0.08]" },
  { className: "bottom-[22%] left-[6%] w-9 text-white opacity-[0.06]" },
];

export default function WhySection({ title, reasons }: Props) {
  return (
    <section className="photo-forest relative overflow-hidden py-20 sm:py-28">
      <div className="noise-layer absolute inset-0 pointer-events-none" aria-hidden="true" />
      <FloatingHexagons cells={CELLS} />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">{title}</h2>
          <div className="mt-4 mx-auto h-px w-16 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </div>

        {/* The middle cell sits lower on wide screens, like a row of comb */}
        <ul className="grid grid-cols-1 gap-16 sm:grid-cols-3 sm:gap-8">
          {reasons.map((reason, index) => (
            <li key={reason.key} className={`text-center ${index === 1 ? "sm:mt-20" : ""}`}>
              {/* Each cell starts at a different point of the 6s float, so they drift out of step */}
              <div className="hex-float" style={{ animationDelay: `-${index * 2}s` }}>
                <HexagonPhoto image={reason.image} />
              </div>
              <h3 className="mt-8 font-display text-xl font-bold text-white">{reason.title}</h3>
              <p className="mt-3 mx-auto max-w-[18rem] text-sm leading-relaxed text-white/55">
                {reason.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
