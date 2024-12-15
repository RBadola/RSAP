/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from "fluid-tailwind";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", extract],
  theme: {
    screens,
    fontSize,
    extend: {
      colors:{
        primary:"#822e81",
        secondary:"#392061",
        tertiary:"#1a1b25"
      }
    },
  },
  plugins: [fluid],
};
