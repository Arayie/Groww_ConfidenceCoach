import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        surface: {
          DEFAULT: "#111827",
          subtle: "#0D131F",
          card: "#131C2E",
          elevated: "#182338",
          hover: "#1D2B44",
        },
        border: {
          subtle: "#1E293B",
          DEFAULT: "#24324D",
          strong: "#334155",
        },
        groww: {
          DEFAULT: "#00D09C",
          hover: "#00B586",
          dark: "#008764",
          subtle: "rgba(0, 208, 156, 0.10)",
          border: "rgba(0, 208, 156, 0.25)",
        },
        navy: {
          950: "#070A10",
          900: "#0B0F19",
          850: "#0F1624",
          800: "#131C2E",
          700: "#1E2B44",
          600: "#2B3C5E",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
