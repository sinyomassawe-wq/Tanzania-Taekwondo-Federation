/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#1EB53A",
          greenDark: "#178f2e",
          blue: "#00A3DD",
          blueDark: "#007ea8",
          navy: "#0B2A4A",
          gold: "#FCD116",
          goldDark: "#e5bc0f",
          black: "#111111",
          grayBg: "#F5F7FA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(11, 42, 74, 0.08)",
        cardHover: "0 12px 30px -4px rgba(11, 42, 74, 0.15)",
      },
    },
  },
  plugins: [],
};
