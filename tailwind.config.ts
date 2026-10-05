import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FEF4F2",
          100: "#FDE6E1",
          200: "#FBCDC5",
          300: "#F7A796",
          400: "#F1735C",
          500: "#E8442E",
          600: "#D4331C",
          700: "#B22A16",
          800: "#932617",
          900: "#7A241A",
          950: "#420E07",
        },
        accent: {
          50: "#FFF9EB",
          100: "#FFF0C7",
          200: "#FFE08A",
          300: "#FFCA4D",
          400: "#FFB424",
          500: "#F9910B",
          600: "#DD6B06",
          700: "#B74A09",
          800: "#94390E",
          900: "#7A2F0F",
        },
        charcoal: {
          50: "#F7F6F5",
          100: "#EDEBE8",
          200: "#D9D6D2",
          300: "#BDB9B3",
          400: "#9C978F",
          500: "#857F76",
          600: "#6E6960",
          700: "#5A564F",
          800: "#4B4843",
          900: "#292724",
          950: "#1A1917",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#FAF9F7",
          subtle: "#F4F2EF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "1rem",
        button: "0.625rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(26, 25, 23, 0.05), 0 4px 16px rgba(26, 25, 23, 0.06)",
        "card-hover":
          "0 2px 4px rgba(26, 25, 23, 0.06), 0 12px 32px rgba(26, 25, 23, 0.12)",
        cta: "0 4px 14px rgba(232, 68, 46, 0.35)",
      },
      maxWidth: {
        container: "80rem",
      },
    },
  },
  plugins: [],
};
export default config;
