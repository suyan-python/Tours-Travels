// tailwind.config.js or tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#dc143c",
        "primary-dark": "#a10e2e",
      },
    },
  },
  plugins: [],
};

export default config;
