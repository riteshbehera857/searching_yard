/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'medium': { 'max': '1200px' },
        'tablet': { 'max': '768px' },
        'xs': { 'max': '650px' },
      },
    },
  },
  plugins: [],
}
