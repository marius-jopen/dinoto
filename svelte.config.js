import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        // Specifically handle news article 404s
        if (path.startsWith('/news/')) {
          console.warn(`Warning: News article not found at ${path}`);
          return;
        }
        
        // Log other errors but don't fail the build
        if (message.includes('404') || message.includes('500')) {
          console.warn(`Warning: ${message} at ${path}${referrer ? ` (referrer: ${referrer})` : ''}`);
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