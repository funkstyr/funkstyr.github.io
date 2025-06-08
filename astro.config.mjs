import "dotenv/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
// @ts-check
import { defineConfig } from "astro/config";

import { expressiveCodeOptions } from "./src/site.config";

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL,
  prefetch: true,

  //   output: "server",

  integrations: [
    expressiveCode(expressiveCodeOptions),
    icon(),
    mdx(),
    sitemap(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
