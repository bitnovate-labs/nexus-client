/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#004DFF", // Primary blue
          // 50: '#004DFF',
          // 100: '#004DFF',
          // 700: '#1D4ED8',
          // 800: '#1E40AF',
        },
        gray: {
          DEFAULT: "#191D23", // Primary gray
        },
      },
    },
  },
  plugins: [],
};
