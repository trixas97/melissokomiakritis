import Image from "next/image";
import type { ImageSource } from "@/lib/media";

type Props = {
  logo: ImageSource | null;
  siteName: string;
  className: string; // height, e.g. "h-14 w-auto"
  preload?: boolean;
};

// The uploaded logo, or the business name in the display font until one is uploaded.
export default function Logo({ logo, siteName, className, preload }: Props) {
  if (!logo) {
    return <span className="font-display text-lg font-bold text-white">{siteName}</span>;
  }
  return (
    <Image
      src={logo.src}
      alt={logo.alt || siteName}
      width={logo.width ?? 915}
      height={logo.height ?? 367}
      preload={preload}
      className={className}
    />
  );
}
