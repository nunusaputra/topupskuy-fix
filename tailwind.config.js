/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#060911",
        secondary: "#0f172a",
        third: "#d8b4fe",
        fourth: "#475569",
        fifth: "#64748b",
        sixth: "#a855f7",
        seventh: "#f97316",
      },
      fontSize: {
        md: "1.125rem",
        tm: "0.825rem",
        zs: "0.675rem",
      },
      animation: {
        muter: "spin 2s linear infinite",
      },
    },
  },
  plugins: [],
};
