import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Soft Morandi-inspired palette
        canvas: "#f5f3f0", // page background
        card: "#fdfaf5", // main cards
        cardSoft: "#f0ebe4",
        outline: "#d7d0c7",
        ink: {
          300: "#918e9a",
          500: "#5d5a66",
          700: "#3f3c46"
        },
        accent: {
          100: "#f3e6e8",
          300: "#d6c2c8",
          500: "#b593a1"
        }
      }
    }
  },
  plugins: []
};

export default config;


