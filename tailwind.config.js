/** @type {import('tailwindcss').Config} */
export default {
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
  extend: {
    fontFamily: {
      // Now you can just use className="font-sans" or "font-display"
      sans: ['Inter', 'sans-serif'],
      display: ['Space Grotesk', 'sans-serif'],
    },
    colors: {
      // Add the specific FTMO-style blue to your theme
      brand: {
        blue: '#007aff', 
        dark: '#0a0b0d',
      }
    }
  },
},
plugins: [],
}