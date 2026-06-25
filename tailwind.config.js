/** @type {import('tailwindcss').Config} */
module.exports = {
  // 🚨 DARK MODE CONTROL ENABLED via root class
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'blob-pulse': 'blob-pulse 10s ease-in-out infinite',
      },
      keyframes: {
        'blob-pulse': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(20px, -20px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      },
    },
  },
  plugins: [],
}