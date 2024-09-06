/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'd_black': 'var(--d-black)',
        'd_lightGray': 'var(--d-lightGray)',
        'd_darkGray': 'var(--d-darkGray)',
        'd_lightGreen': 'var(--d-lightGreen)',
        'd_darkGreen': 'var(--d-darkGreen)',
      }
    }
  },
  plugins: []
};
