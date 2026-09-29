"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  toggleLanguage: () => {},
  setLanguage: () => {},
  isReady: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check saved preference or existing googtrans cookie
    try {
      const savedLang = localStorage.getItem("agrin_language") as Language | null;
      const hasHindiCookie = document.cookie.includes("googtrans=/en/hi") || document.cookie.includes("googtrans=/auto/hi");
      
      if (savedLang === "hi" || hasHindiCookie) {
        setLanguageState("hi");
      } else {
        setLanguageState("en");
      }
    } catch {
      // Ignore storage access errors
    }
    setIsReady(true);
  }, []);

  const applyTranslation = (targetLang: Language) => {
    setLanguageState(targetLang);
    try {
      localStorage.setItem("agrin_language", targetLang);
    } catch {}

    const cookieVal = targetLang === "hi" ? "/en/hi" : "/en/en";
    const host = window.location.hostname;

    // Set cookie on both current path and root domain
    document.cookie = `googtrans=${cookieVal}; path=/;`;
    document.cookie = `googtrans=${cookieVal}; path=/; domain=${host};`;
    if (host.includes(".")) {
      const parts = host.split(".");
      if (parts.length >= 2) {
        const rootDomain = parts.slice(-2).join(".");
        document.cookie = `googtrans=${cookieVal}; path=/; domain=.${rootDomain};`;
      }
    }

    // Attempt to directly trigger Google Translate combo box without page reload
    const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (combo) {
      combo.value = targetLang;
      combo.dispatchEvent(new Event("change"));
    } else {
      // If translate widget is initializing, reload to apply cookie cleanly
      window.location.reload();
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "hi" : "en";
    applyTranslation(nextLang);
  };

  const setLanguage = (lang: Language) => {
    applyTranslation(lang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, setLanguage, isReady }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
