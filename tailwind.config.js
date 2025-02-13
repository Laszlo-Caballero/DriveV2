/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "shadow-green": {
          50: "#f4f9f8",
          100: "#dbece7",
          200: "#b7d8cf",
          300: "#93c2b7",
          400: "#629f92",
          500: "#488478",
          600: "#386961",
          700: "#30554f",
          800: "#2a4542",
          900: "#263b38",
          950: "#122120",
        },

        "blue-zodiac": {
          50: "#f1f6fd",
          100: "#deeafb",
          200: "#c5dcf8",
          300: "#9dc6f3",
          400: "#6fa7eb",
          500: "#4d86e4",
          600: "#386ad8",
          700: "#2f56c6",
          800: "#2c47a1",
          900: "#283f80",
          950: "#1c274c",
        },
      },
    },
  },
  plugins: [],
};
