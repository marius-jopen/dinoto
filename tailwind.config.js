/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: ['Circular Pro Book'],
    },
    extend: {
      colors: {
        'd_black': 'var(--d-black)',
        'd_white': 'var(--d-white)',
        'd_lightGray': 'var(--d-lightGray)',
        'd_mediumGray': 'var(--d-mediumGray)',
        'd_darkGray': 'var(--d-darkGray)',
        'd_lightGreen': 'var(--d-lightGreen)',
        'd_darkGreen': 'var(--d-darkGreen)',
      },
      borderRadius: {
        '2xl': '30px',
        '3xl': '50px',
      }
    }
  },
  plugins: []
};
