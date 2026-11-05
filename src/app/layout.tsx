import type { Metadata, Viewport } from "next";
import { Anybody, Instrument_Sans } from "next/font/google";
import { ConceptBanner } from "@/components/site/ConceptBanner";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { CONCEPT_LABEL } from "@/lib/site";
import "./globals.css";

const anybody = Anybody({ subsets: ["latin"], axes: ["wdth"], variable: "--font-anybody", display: "swap" });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://soundplus-redesign-concept.vercel.app"),
  title: { default: "SoundPlus redesign concept by DC Tech", template: "%s | SoundPlus redesign concept" },
  description: `${CONCEPT_LABEL}. A landing page, six app screens and a design system for the SoundPlus Android music player.`,
  // An unofficial concept should never compete with the owner's real site in search.
  robots: { index: false, follow: false },
  openGraph: {
    title: "SoundPlus redesign concept by DC Tech",
    description: `${CONCEPT_LABEL}.`,
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0f0c2e", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anybody.variable} ${instrument.variable}`}>
      <body className="min-h-svh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-amber focus:px-4 focus:py-2 focus:text-on-amber">
          Skip to content
        </a>
        <ConceptBanner />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
