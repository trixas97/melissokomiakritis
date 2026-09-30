type Props = {
  edge: "top" | "bottom";
  to?: "seam" | "footer"; // seam: the colour every section fades through; footer: the footer's top colour
  className?: string; // height, e.g. "h-24"
};

// Softens the edge of a section's background so neighbouring sections blend.
// Every section fades to the same seam colour (see --edge-seam in globals.css),
// so any two sections meet seamlessly whatever their gradients are.
// The parent must be `relative`, with its content in a `relative z-10` layer.
export default function SectionFade({ edge, to = "seam", className = "h-24" }: Props) {
  const direction = edge === "top" ? "to top" : "to bottom";
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${edge === "top" ? "top-0" : "bottom-0"} ${className}`}
      style={{ background: `linear-gradient(${direction}, transparent, var(--edge-${to}))` }}
      aria-hidden="true"
    />
  );
}
