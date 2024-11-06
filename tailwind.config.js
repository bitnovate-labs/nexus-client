/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blue: {
          600: '#004DFF',
          // 700: '#1D4ED8',
          // 800: '#1E40AF',
        },
      },
    },
  },
  plugins: [],
}

