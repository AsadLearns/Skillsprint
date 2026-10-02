export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Niche developer platform palette: Electric Indigo/Violet + Cyber Cyan + Emerald
        accent: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        cyber: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          950: "#083344",
        },
        dark: {
          950: "#050811",
          900: "#090d1a",
          850: "#0f1527",
          800: "#141d33",
          750: "#1a2540",
          700: "#212e4f",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Outfit", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Outfit", "Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(99, 102, 241, 0.4)",
        "glow-cyan": "0 0 25px -5px rgba(6, 182, 212, 0.35)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.08)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)",
        cardHover: "0 20px 35px -8px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(99, 102, 241, 0.15)",
      },
    },
  },
  plugins: [],
}