import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-10 md:py-14 text-[0.9rem] text-[var(--muted)] mt-auto bg-[var(--surface)]">
      <div className="wrap grid grid-cols-1 md:grid-cols-[1.2fr_1.4fr_1fr] gap-8">
        <div>
          <strong className="text-[var(--ink)] font-semibold font-display">AgriN AI</strong>
          <p className="mt-1 text-[0.88rem] leading-relaxed">
            Regenerative Agricultural Intelligence Network. Built for Code with Community by H2S / Google.
          </p>
        </div>

        <div>
          <strong className="text-[var(--ink)] font-semibold font-display">Data sources</strong>
          <p className="mt-1 text-[0.88rem] leading-relaxed">
            Copernicus Sentinel-2, Open-Meteo ECMWF, Google Gemini 1.5, HWSD v2.0
          </p>
        </div>

        <nav aria-label="Legal" className="flex flex-col gap-1.5 text-[0.88rem]">
          <Link href="/privacy" className="hover:text-[var(--ink)] hover:underline">
            Privacy policy
          </Link>
          <Link href="/terms" className="hover:text-[var(--ink)] hover:underline">
            Terms of service
          </Link>
          <Link
            href="/network"
            className="hover:text-[var(--ink)] hover:underline text-[var(--leaf)] font-medium"
          >
            Open standards (CADS protocol)
          </Link>
        </nav>
      </div>
    </footer>
  );
}
