"use client";

import React, { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function GoogleTranslateProvider() {
  useEffect(() => {
    // Define the initialization callback on window
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi",
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout?.SIMPLE,
          },
          "google_translate_element"
        );
      }
    };

    // Check if script is already injected
    if (document.getElementById("google-translate-script")) {
      return;
    }

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.type = "text/javascript";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="google_translate_element"
      aria-hidden="true"
      style={{ display: "none", position: "absolute", top: -9999, left: -9999 }}
    />
  );
}
