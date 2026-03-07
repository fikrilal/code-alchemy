import typography from "@tailwindcss/typography";
import tailwindHamburgers from "tailwind-hamburgers";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{ts,tsx,md,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkbg: "#07090C",
        brand: {
          primary: "#6A42C2",
        },
        slate: {
          50: "#F3F3F3",
          100: "#c9d1d9", // subtle text on darkest bg
          200: "#b1bac4",
          300: "#8b949e", // muted text
          400: "#6e7681",
          500: "#484f58",
          600: "#30363d", // default border
          700: "#21262d", // card/sunken
          800: "#161b22", // surface
          900: "#10161c",
          1000: "#0d1117", // app background
          1100: "#0b0f14",
        },
        red: {
          100: "#fee9e7",
          200: "#fdd3d0",
          300: "#fcb3ad",
          400: "#f4776a",
          500: "#ec221f",
          600: "#c00f0c",
          700: "#900b09",
          800: "#690807",
          900: "#4d0b0a",
          1000: "#300603",
        },
        yellow: {
          100: "#fffbeb",
          200: "#fff1c2",
          300: "#ffe8a3",
          400: "#e8b931",
          500: "#e5a000",
          600: "#bf6a02",
          700: "#975102",
          800: "#682d03",
          900: "#522504",
          1000: "#401b01",
        },
        green: {
          100: "#ebffee",
          200: "#cff7d3",
          300: "#aff4c6",
          400: "#85e0a3",
          500: "#14ae5c",
          600: "#009951",
          700: "#008043",
          800: "#02542d",
          900: "#024023",
          1000: "#062d1b",
        },
        black: {
          100: "#0c0c0d",
          200: "#0c0c0d",
          300: "#0c0c0d",
          400: "#0c0c0d",
          500: "#0c0c0d",
          600: "#0c0c0d",
          700: "#0c0c0d",
          800: "#0c0c0d",
          900: "#0c0c0d",
          1000: "#0c0c0d",
        },
        gray: {
          50: "#ffffff",
          100: "#f5f5f5",
          200: "#e6e6e6",
          300: "#d9d9d9",
          400: "#b3b3b3",
          500: "#757575",
          600: "#444444",
          700: "#383838",
          800: "#2c2c2c",
          900: "#1e1e1e",
          1000: "#111111",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter-tight)", "sans-serif"],
        mono: ["var(--font-fragment-mono)", "monospace"],
      },
    },
  },
  plugins: [tailwindHamburgers, typography],
};

export default config;
