/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#dc143c", // define your primary color
        "primary-dark": "#a10e2e",
      },
    },
  },
  plugins: [],
};
