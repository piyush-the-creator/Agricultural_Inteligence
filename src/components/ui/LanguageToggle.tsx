"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface LanguageToggleProps {
  compact?: boolean;
  className?: string;
}

export default function LanguageToggle({
  compact = false,
  className = "",
}: LanguageToggleProps) {
  const { language, toggleLanguage, isReady } = useLanguage();

  if (!isReady) {
    return (
      <div className="w-16 h-7 rounded bg-[#F2F4F3] border border-[#E2E0D8] animate-pulse" />
    );
  }

  const isHindi = language === "hi";

  return (
    <button
      onClick={toggleLanguage}
      type="button"
      title={isHindi ? "Switch to English" : "हिन्दी में अनुवाद करें (Translate to Hindi)"}
      aria-label="Toggle language between English and Hindi"
      className={`notranslate inline-flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all duration-200 border shadow-xs select-none ${
        isHindi
          ? "bg-[#2D5A3C] text-white border-[#1E432B] hover:bg-[#234730]"
          : "bg-white text-[#1B241E] border-[#E2E0D8] hover:border-[#2D5A3C] hover:bg-[#F7F9F8]"
      } ${className}`}
    >
      <span className="text-sm leading-none" role="img" aria-label="flag">
        {isHindi ? "🇮🇳" : "🌐"}
      </span>
      <span className="font-semibold tracking-tight">
        {isHindi ? "हिन्दी" : "English"}
      </span>
      <span
        className={`text-[10px] uppercase font-mono px-1 py-0.2 rounded transition-colors ${
          isHindi
            ? "bg-[#1E432B] text-[#DCE8DF]"
            : "bg-[#F2F4F3] text-[#58635A]"
        }`}
      >
        {isHindi ? "EN" : "हिन्दी"}
      </span>
    </button>
  );
}
