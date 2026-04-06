import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin", "latin-ext", "greek"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Μελισσοκομία Κρήτης — Pure Cretan Queen Bees",
  description:
    "Queen bees, queen cells, and bee colonies bred with care in the heart of Crete. Βασίλισσες μέλισσες, βασιλικά κελιά και μελισσοκολωνίες από την Κρήτη.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
