/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16bfb7'
      }
    },
    screens: {
      md: '800px'
    }
  },
  plugins: []
}

