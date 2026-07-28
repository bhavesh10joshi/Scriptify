/** @type {import('tailwindcss').Config} */
export default {
  // dark mode uses a class on the html element, so we can toggle it manually
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
