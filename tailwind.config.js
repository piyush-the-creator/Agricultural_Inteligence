/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        agrin: {
          canvas: "#FBFBF9",
          slate: "#1B241E",
          canopy: "#2D5A3C",
          "canopy-hover": "#244730",
          "canopy-surface": "#EBF2ED",
          border: "#E2E0D8",
          "border-strong": "#B8B6AC",
          muted: "#58635A",
          dim: "#828E84",
          "optimal-bg": "#EBF5EE",
          "optimal-text": "#1E5E2E",
          "optimal-border": "#BCE3C5",
          "moderate-bg": "#FFF9EB",
          "moderate-text": "#875A00",
          "moderate-border": "#F5DE9C",
          "danger-bg": "#FDF0ED",
          "danger-text": "#992615",
          "danger-border": "#F3BEB2",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
