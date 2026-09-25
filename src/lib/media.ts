import type { Media } from "@/payload-types";

export type ImageSource = {
  src: string;
  alt: string;
  focus: string; // CSS object-position from the Media focal point
  width?: number; // intrinsic size, for next/image without `fill` (e.g. the logo)
  height?: number;
};

type Upload = number | Media | null | undefined;

// Resolves a Payload upload field (an id when not populated, the Media doc when
// it is). Returns null when nothing usable is uploaded, so callers decide what
// to show instead.
export function resolveImage(image: Upload): ImageSource | null {
  if (!image || typeof image === "number" || !image.url) return null;
  return {
    src: image.url,
    alt: image.alt ?? "",
    focus: `${image.focalX ?? 50}% ${image.focalY ?? 50}%`,
    width: image.width ?? undefined,
    height: image.height ?? undefined,
  };
}

// Same, for the hero video: URL and MIME type for a <source> element.
export function resolveVideo(video: Upload) {
  if (!video || typeof video === "number" || !video.url) return null;
  return { src: video.url, type: video.mimeType ?? "video/mp4" };
}
