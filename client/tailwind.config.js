/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b0f1a",
        surface: "rgba(255,255,255,0.06)",
        neonPink: "#ff4ecd",
        neonCyan: "#22d3ee",
        neonPurple: "#8b5cf6",
        neonGreen: "#22c55e",
        neonYellow: "#f59e0b",
        neonRed: "#ef4444",
      },
      boxShadow: {
        glow: "0 0 24px rgba(34,211,238,0.2)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};