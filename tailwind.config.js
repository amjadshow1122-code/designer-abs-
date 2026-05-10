/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#001236',
          light: '#14274e',
        },
        secondary: {
          DEFAULT: '#775a19',
          light: '#c5a059',
        },
        background: '#f8f9ff',
        surface: '#ffffff',
      },
      fontFamily: {
        heading: ['EB Garamond', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
