import Image from "next/image";
import type { ImageSource } from "@/lib/media";

type Props = {
  logo: ImageSource | null;
  logoLight?: ImageSource | null; // dark-lettered version for the light theme
  siteName: string;
  className: string; // height, e.g. "h-14 w-auto"
  preload?: boolean;
};

// The uploaded logo, or the business name in bold text until one is uploaded.
// With a light-theme logo, both are rendered and CSS shows the one for the theme.
export default function Logo({ logo, logoLight, siteName, className, preload }: Props) {
  const onlyLogo = logo ?? logoLight;
  if (!onlyLogo) {
    return <span className="text-lg font-bold text-fg">{siteName}</span>;
  }

  const renderImage = (image: ImageSource, visibility: string) => (
    <Image
      src={image.src}
      alt={image.alt || siteName}
      width={image.width ?? 915}
      height={image.height ?? 367}
      preload={preload}
      className={`${className} ${visibility}`}
    />
  );

  if (!logo || !logoLight) return renderImage(onlyLogo, "");

  return (
    <>
      {renderImage(logo, "light:hidden")}
      {renderImage(logoLight, "hidden light:block")}
    </>
  );
}
