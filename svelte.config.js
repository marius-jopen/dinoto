import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        // Ignore 404s during prerendering
        if (message.includes('404')) {
          return;
        }
        // Throw other errors
        throw new Error(message);
      }
    }
  },
  preprocess: vitePreprocess()
};
export default config;