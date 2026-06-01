/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#F5F0EA',
          card: '#FAF7F2',
          elevated: '#FFFFFF',
        },
        ink: {
          DEFAULT: '#2A2520',
          soft: '#6B6258',
          muted: '#9A9088',
        },
        primary: {
          DEFAULT: '#2A2520', // map primary to ink for backward compatibility
          light: '#6B6258',
        },
        secondary: {
          DEFAULT: '#A8854A', // map secondary to gold
          light: '#D9C089',
        },
        gold: {
          DEFAULT: '#A8854A',
          deep: '#8B6B36',
          soft: '#D9C089',
        },
        blush: {
          DEFAULT: '#C9B8A8',
          soft: '#E8DCD0',
        },
        sale: '#8B4A3A',
        background: '#F5F0EA',
        surface: '#FAF7F2',
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'Cormorant', 'Georgia', 'serif'],
        body: ['Manrope', 'Helvetica Neue', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
