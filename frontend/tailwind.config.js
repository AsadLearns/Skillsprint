export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Single accent for the whole app — change these values to re-theme.
        // Warm amber rather than the near-universal SaaS emerald.
        accent: {
          50: "#fdf7ef",
          100: "#faebd7",
          200: "#f4d5ae",
          300: "#ecba7e",
          400: "#e5a663",
          500: "#d98e42",
          600: "#c07533",
          700: "#9c5c2b",
          800: "#6b4020",
          900: "#422917",
          950: "#241509",
        },
      },
    },
  },
  plugins: [],
}