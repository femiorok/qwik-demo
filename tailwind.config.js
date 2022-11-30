/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary_white: "#FEFEFE",
        primary_black: "#000000",
        accent_gray: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
