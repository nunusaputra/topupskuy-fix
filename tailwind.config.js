/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--background-primary)",
        secondary: "var(--background-secondary)",
        secondary_opacity: "var(--background-secondary-opacity)",
        third: "var(--button-auth)",
        fourth: "var(--card-color)",
        fourth_opacity_one: "var(--card-color-opacity-one)",
        fourth_opacity_two: "var(--card-color-opacity-two)",
        fifth: "#64748b",
        sixth: "#a855f7",
        seventh: "var(--order-and-button-color)",
        aurora_1: "var(--aurora-1)",
        aurora_2: "var(--aurora-2)",
        aurora_3: "var(--aurora-3)",
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
