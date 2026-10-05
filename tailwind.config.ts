import type { Config } from "tailwindcss";

const brand = {
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
};

const accent = {
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
};

const charcoal = {
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
};

const success = {
  50: "#F0FDF4",
  100: "#DCFCE7",
  200: "#BBF7D0",
  300: "#86EFAC",
  400: "#4ADE80",
  500: "#22C55E",
  600: "#16A34A",
  700: "#15803D",
  800: "#166534",
  900: "#14532D",
};

const warning = {
  50: "#FFFBEB",
  100: "#FEF3C7",
  200: "#FDE68A",
  300: "#FCD34D",
  400: "#FBBF24",
  500: "#F59E0B",
  600: "#D97706",
  700: "#B45309",
  800: "#92400E",
  900: "#78350F",
};

const error = {
  50: "#FEF2F2",
  100: "#FEE2E2",
  200: "#FECACA",
  300: "#FCA5A5",
  400: "#F87171",
  500: "#EF4444",
  600: "#DC2626",
  700: "#B91C1C",
  800: "#991B1B",
  900: "#7F1D1D",
};

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand,
        primary: brand,
        accent,
        charcoal,
        success,
        warning,
        error,
        background: "#FFFFFF",
        surface: {
          DEFAULT: "#FFFFFF",
          elevated: "#FFFFFF",
          muted: "#FAF9F7",
          subtle: "#F4F2EF",
        },
        foreground: {
          DEFAULT: "#292724",
          muted: "#6E6960",
          subtle: "#9C978F",
        },
        border: {
          DEFAULT: "#EDEBE8",
          strong: "#D9D6D2",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: [
          "var(--text-display)",
          { lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.02em" },
        ],
        h1: [
          "var(--text-h1)",
          { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.02em" },
        ],
        h2: [
          "var(--text-h2)",
          { lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.01em" },
        ],
        h3: ["var(--text-h3)", { lineHeight: "1.3", fontWeight: "600" }],
        h4: ["var(--text-h4)", { lineHeight: "1.35", fontWeight: "600" }],
        "body-lg": ["var(--text-body-lg)", { lineHeight: "1.6" }],
        body: ["var(--text-body)", { lineHeight: "1.6" }],
        "body-sm": ["var(--text-body-sm)", { lineHeight: "1.5" }],
        caption: ["var(--text-caption)", { lineHeight: "1.4" }],
        label: ["var(--text-label)", { lineHeight: "1.4", fontWeight: "500" }],
        button: ["var(--text-button)", { lineHeight: "1.5", fontWeight: "600" }],
        nav: ["var(--text-nav)", { lineHeight: "1.5", fontWeight: "500" }],
      },
      spacing: {
        13: "3.25rem",
      },
      borderRadius: {
        card: "1rem",
        button: "0.625rem",
        input: "0.625rem",
        image: "0.75rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(26, 25, 23, 0.05), 0 4px 16px rgba(26, 25, 23, 0.06)",
        "card-hover":
          "0 2px 4px rgba(26, 25, 23, 0.06), 0 12px 32px rgba(26, 25, 23, 0.12)",
        elevated: "0 8px 30px rgba(26, 25, 23, 0.12)",
        cta: "0 4px 14px rgba(232, 68, 46, 0.35)",
      },
      maxWidth: {
        container: "80rem",
        "container-narrow": "48rem",
      },
    },
  },
  plugins: [],
};
export default config;
