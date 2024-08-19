import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import robotsTxt from "astro-robots-txt";

import metaTags from "astro-meta-tags";

// https://astro.build/config
export default defineConfig({
  site: 'https://3d-druck-schmiede.netlify.app',
  integrations: [sitemap(), tailwind(), vue(), metaTags(), robotsTxt({
    sitemap: false,
    // set up robot.txt only
    policy: [{
      userAgent: '*',
      // all crawlers
      allow: '/',
      // allow crawling on all
      disallow: ['/datenschutz', '/impressum'] // disallow on misc pages
    }]
  })]
});