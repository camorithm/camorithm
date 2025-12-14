/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
],
theme: {
  extend: {
    fontFamily: {
      // This links the CSS variable from layout.tsx to the class "font-sans"
      sans: ['var(--font-inter)', 'sans-serif'],
      // This links to the class "font-['Space_Grotesk']"
      'Space_Grotesk': ['var(--font-space)', 'sans-serif'],
    },
    animation: {
      'ticker': 'ticker 30s linear infinite',
    },
    keyframes: {
      ticker: {
        '0%': { transform: 'translateX(0)' },
        '100%': { transform: 'translateX(-50%)' },
      },
    },
  },
},
plugins: [],
}