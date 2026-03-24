# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical Rules

- **NEVER modify Prismic Slices** (`src/lib/slices/`). These are directly connected to the live website. Always ask before touching any slice file.
- **NEVER merge to main.** Main is the production branch tied to the live site.
- **Always merge to staging.** All work goes to the `staging` branch without needing explicit permission.

## Commands

- `npm run dev` — Start dev server (Vite + Slice Machine UI concurrently)
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm run check` — Svelte type checking (`svelte-kit sync && svelte-check`)
- `npm run lint` — ESLint + Prettier validation
- `npm run format` — Auto-format with Prettier
- `npm run slicemachine` — Start Prismic Slice Machine UI standalone

## Architecture

**SvelteKit + Prismic CMS** portfolio/marketing site. Content is managed through Prismic's Slice Machine system.

### Routing

Routes live in `src/routes/[[preview=preview]]/` to support Prismic preview mode:
- `/` — Homepage (fetches `page` type with UID `home`)
- `/[uid]` — Dynamic pages
- `/work/[uid]` — Work/project detail pages
- `/news/[uid]` — News articles

Each route's `+page.server.ts` fetches page content, navigation (top/bottom), work items, and news articles from Prismic.

### Prismic Integration

- **Client config**: `src/lib/prismicio.ts` — route resolver, client factory, repo name
- **Types**: `src/prismicio-types.d.ts` — auto-generated from Prismic models (do not edit manually)
- **Custom types**: `customtypes/` — Prismic content type definitions (page, work, news_article, navigation_top, navigation_bottom)

### Slices

`src/lib/slices/` contains 27+ Prismic Slice components. Each slice has:
- `index.svelte` — Component implementation
- `model.json` — Prismic field schema (managed by Slice Machine)
- `mocks.json` — Mock data for development

Slices receive a typed `slice` prop from Prismic's `SliceZone`.

### Reusable Components

`src/lib/components/` contains shared components (header, footer, navigation, slider, cards, project items, etc.). Key utilities:
- `color-styles.js` — Maps Prismic color field values to CSS class names
- `distances.js` — Maps spacing field values (none/xs/s/m/xl/xxl) to Tailwind classes
- `stores.js` — Svelte writable stores for `workStore` and `newsStore` (cross-component data sharing)

### Styling

- **Tailwind CSS** with custom theme in `tailwind.config.js`:
  - Font: "Circular Pro Book" (with Medium weight)
  - Color palette via CSS variables (`--d-black`, `--d-white`, `--d-lightGray`, `--d-mediumGray`, `--d-darkGray`, `--d-lightGreen`, `--d-darkGreen`)
- **`src/app.css`**: Custom typography scale (h5/hxl to p3), 6 theme style classes (`.style-white`, `.style-light-gray`, etc.), box layout utilities, Splide carousel overrides
- **Prettier**: Tabs, single quotes, no trailing commas, 100 char width

### Key Dependencies

- **@splidejs/splide** + **@splidejs/svelte-splide** — Carousel/slider
- **aos** — Animate On Scroll (initialized in root `+layout.svelte`)
- **hls.js** — HLS video streaming support
