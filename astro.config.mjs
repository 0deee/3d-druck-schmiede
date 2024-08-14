import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://3d-druck-schmiede.netlify.app',
  integrations: [sitemap(), tailwind()]
});