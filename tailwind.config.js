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
        seventh_opacity: "var(--bg-history-opacity)",
        aurora_1: "var(--aurora-1)",
        aurora_2: "var(--aurora-2)",
        aurora_3: "var(--aurora-3)",
        border_color: "var(--border-color)",
        dots: "var(--dots-color)",
      },
      fontSize: {
        md: "1.125rem",
        tm: "0.825rem",
        zs: "9px",
      },
      keyframes: {
        scaleIn: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        muter: "spin 2s linear infinite",
        scaleIn: "scaleIn 0.5s ease-out forwards",
        fadeIn: "fadeIn 0.5s ease-in forwards",
      },
    },
  },
  plugins: [],
};
