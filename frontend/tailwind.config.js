export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Single accent for the whole app — change these values to re-theme.
        // Sky blue, matched to the cloud effect in the hero.
        accent: {
          50: "#eff8ff",
          100: "#dbeefe",
          200: "#bfe2fe",
          300: "#93d1fd",
          400: "#5cb8fa",
          500: "#36a0f0",
          600: "#2183d6",
          700: "#1c69ad",
          800: "#1d598e",
          900: "#1d4b76",
          950: "#142f4d",
        },
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
}