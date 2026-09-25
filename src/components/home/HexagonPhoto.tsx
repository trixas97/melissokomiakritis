import Image from "next/image";
import type { ImageSource } from "@/lib/media";

// Rounded pointy-top hexagon, viewBox 0 0 100 115.47 (width : height = 1 : 2/√3)
const HEXAGON_PATH =
  "M42.21 4.5Q50 0 57.79 4.5L92.21 24.37Q100 28.87 100 37.87L100 77.6Q100 86.6 92.21 91.1L57.79 110.97Q50 115.47 42.21 110.97L7.79 91.1Q0 86.6 0 77.6L0 37.87Q0 28.87 7.79 24.37Z";

const HEXAGON_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 115.47"><path d="${HEXAGON_PATH}"/></svg>`,
)}")`;

type Props = {
  image: ImageSource | null; // null → an empty tinted cell until a photo is uploaded
};

// A photo clipped to a honeycomb cell, framed by a slightly larger amber cell
// outline sharing the same centre. The Media focal point keeps the subject in view.
export default function HexagonPhoto({ image }: Props) {
  return (
    <div className="relative mx-auto aspect-[100/115.47] w-full max-w-[15rem]">
      <svg
        viewBox="0 0 100 115.47"
        className="absolute inset-0 h-full w-full overflow-visible text-brand-amber/40"
        fill="none"
        aria-hidden="true"
      >
        {/* Scale about the hexagon's centre (50, 57.735) so the gap is even on every side */}
        <path
          d={HEXAGON_PATH}
          transform="translate(50 57.735) scale(1.09) translate(-50 -57.735)"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div
        className="absolute inset-0 bg-white/[0.04]"
        style={{
          maskImage: HEXAGON_MASK,
          WebkitMaskImage: HEXAGON_MASK,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
      >
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="240px"
            className="object-cover"
            style={{ objectPosition: image.focus }}
          />
        )}
      </div>
    </div>
  );
}
