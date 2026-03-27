/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blinkit-green': '#0c831f',
        'blinkit-yellow': '#f8cb46'
      }
    },
  },
  plugins: [],
}
