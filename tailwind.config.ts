import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B1F2A",
        midnight: "#0F2A3D",
        signal: "#00C2A8",
        amber: "#FFB347",
        mist: "#EDF3F4",
        slate: "#5A7178",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 10px 40px -15px rgba(11,31,42,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
