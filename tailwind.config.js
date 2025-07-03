/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cor1: "#42D392",
        cor3: "#4FBCDF"
      }
    },
  },
  plugins: [],
}
