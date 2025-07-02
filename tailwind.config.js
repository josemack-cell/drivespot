import { fontFamily } from 'tailwindcss/defaultTheme';

// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
theme: {
    extend: {
      colors: {
        primary: '#0076d6',     // Autodoc Blue
        navy: '#0b243e',        // Deep header/nav background
        accent: '#ff6c0a',      // Autodoc Orange
        warning: '#fcd116',     // Bright Yellow
        light: '#f2f2f2',       // Light background
        muted: '#d9d9d9',       // For borders/dividers
        white: '#ffffff',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Use if you've imported Inter
      },
    },
  },
  plugins: [],
}
