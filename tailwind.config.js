/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.65rem",
      },
      colors: {
        actan: {
          50: "#FBF8F4",
          100: "#F5EFE5",
          200: "#EDE0CF",
          300: "#E3D0B5",
          400: "#DABF9B",
          500: "#D1B183",
          600: "#BE9050",
          700: "#956E37",
          800: "#644A25",
          900: "#302412",
          950: "#1A130A",
        },
        acred: {
          50: "#FCDCD9",
          100: "#FAB9B3",
          200: "#F46E62",
          300: "#EE2816",
          400: "#A2180C",
          500: "#540C06",
          600: "#430A05",
          700: "#340804",
          800: "#210502",
          900: "#130301",
          950: "#0A0101",
        },
      },
    },
  },
  plugins: [],
};
