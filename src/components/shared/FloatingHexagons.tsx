// Decorative honeycomb cells scattered behind a section's content.
// The parent must be `relative` with `overflow-hidden`.

export type HexagonCell = {
  className: string; // position, size, color and opacity
};

const HERO_CELLS: HexagonCell[] = [
  { className: "-top-12 -right-8 w-72 text-brand-amber opacity-[0.05]" },
  { className: "-bottom-10 -left-8 w-48 text-white opacity-[0.04]" },
  { className: "top-1/3 left-[12%] w-14 text-brand-amber opacity-[0.08]" },
  { className: "top-1/2 right-[18%] w-9 text-white opacity-[0.06]" },
];

export default function FloatingHexagons({ cells = HERO_CELLS }: { cells?: HexagonCell[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {cells.map((cell) => (
        <svg
          key={cell.className}
          viewBox="0 0 120 140"
          className={`absolute ${cell.className}`}
          fill="currentColor"
        >
          <path d="M60 0l60 35v70L60 140 0 105V35L60 0z" />
        </svg>
      ))}
    </div>
  );
}
