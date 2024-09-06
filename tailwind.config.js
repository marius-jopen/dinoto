/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        d_black: "#313131",
        d_lightGray: "#F4F4F4",
        d_darkGray: "#C0C0C0",
        d_lightGreen: "#9DFF3A",
        d_darkGreen: "#54AB00",
      }
    }
  },
  plugins: []
};