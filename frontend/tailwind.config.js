/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Baloo 2'", "sans-serif"],
        roboto: ["'Roboto'"],
        inter: ["'Inter'"],
      },
    },
  },
  plugins: [],
};
