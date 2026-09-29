import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import GoogleTranslateProvider from "@/components/layout/GoogleTranslateProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
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
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#FBFBF9] text-[#1B241E] flex flex-col justify-between selection:bg-[#EBF2ED] selection:text-[#1E5E2E]"
      >
        <LanguageProvider>
          <GoogleTranslateProvider />
          <Navbar />
          <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-8">
            {children}
          </main>
          <MobileNav />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
