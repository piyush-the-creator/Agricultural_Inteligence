import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E2E0D8] py-8 text-xs text-[#58635A] mt-auto">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-[#1B241E] text-sm">AgriN AI</span>
            <span className="text-[#828E84]">—</span>
            <span className="text-[#58635A]">Regenerative Agricultural Intelligence Network</span>
          </div>
          <p className="text-[11px] text-[#828E84] mt-1">
            Built for Code with Community by H2S / Google • Open Digital Public Good Prototype
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px]">
          <span className="font-mono text-[#828E84]">DATA SOURCES:</span>
          <span>Copernicus Sentinel-2</span>
          <span className="text-[#E2E0D8]">•</span>
          <span>Open-Meteo ECMWF</span>
          <span className="text-[#E2E0D8]">•</span>
          <span>Google Gemini 1.5</span>
          <span className="text-[#E2E0D8]">•</span>
          <span>HWSD v2.0</span>
        </div>

        <div className="flex items-center space-x-4 text-[11px]">
          <Link href="/privacy" className="hover:underline hover:text-[#1B241E]">
            Privacy Policy
          </Link>
          <span className="text-[#E2E0D8]">|</span>
          <Link href="/terms" className="hover:underline hover:text-[#1B241E]">
            Terms of Service
          </Link>
          <span className="text-[#E2E0D8]">|</span>
          <Link href="/network" className="hover:underline hover:text-[#1B241E] font-medium text-[#2D5A3C]">
            Open Standards / CADS Protocol (DPG)
          </Link>
        </div>
      </div>
    </footer>
  );
}
