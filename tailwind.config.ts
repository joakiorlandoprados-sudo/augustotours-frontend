import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          deep: "#023E8A",
          mid: "#0077B6",
          light: "#48CAE4",
          pale: "#ADE8F4",
        },
        sunset: {
          orange: "#F4A261",
          warm: "#E76F51",
        },
        neutral: {
          dark: "#1A1A2E",
          mid: "#4A4A6A",
          light: "#F0F4F8",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        soft: "0 4px 16px rgba(2, 62, 138, 0.08)",
        card: "0 8px 24px rgba(2, 62, 138, 0.12)",
        chat: "0 12px 32px rgba(2, 62, 138, 0.25)",
      },
      keyframes: {
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "bounce-subtle": "bounceSubtle 1.2s ease-in-out infinite",
        "slide-up": "slideUp 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
