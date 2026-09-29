import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import GoogleTranslateProvider from "@/components/layout/GoogleTranslateProvider";

const displayFont = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
});

export const metadata: Metadata = {
  title: "AgriN AI — Regenerative Agricultural Intelligence Network",
  description:
    "AI-powered digital agriculture intelligence combining multi-spectral satellite telemetry, hyper-local meteorological forecasts, and soil chemistry into explainable and regenerative farming decisions.",
  keywords: [
    "agriculture",
    "regenerative farming",
    "NDVI satellite",
    "crop disease scanner",
    "open-meteo",
    "Gemini AI",
    "BRICS agriculture",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable} ${jetbrainsMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col justify-between selection:bg-[#E3EDDD] selection:text-[#14201A]"
      >
        <LanguageProvider>
          <GoogleTranslateProvider />
          <Navbar />
          <main className="flex-1 w-full mx-auto pb-24 md:pb-8">
            {children}
          </main>
          <MobileNav />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
