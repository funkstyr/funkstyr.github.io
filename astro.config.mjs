import "dotenv/config";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import rehypeExternalLinks from "rehype-external-links";
// import remarkUnwrapImages from "remark-unwrap-images";

import { expressiveCodeOptions } from "./src/site.config";
import { remarkReadingTime } from "./src/utils/remarkReadingTime.ts";

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL,
  prefetch: true,

  // Inline all CSS to eliminate render-blocking stylesheets
  build: {
    inlineStylesheets: "always",
  },

  //   output: "server",

  integrations: [expressiveCode(expressiveCodeOptions), icon(), mdx()],

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [
    {
      provider: fontProviders.fontshare(),
      name: "Satoshi",
      cssVariable: "--font-sans",
      styles: ["normal", "italic"],
    },
  ],

  markdown: {
    processor: unified({
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [
        [
          rehypeExternalLinks,
          {
            target: "_blank",
            rel: ["nofollow, noopener, noreferrer"],
          },
        ],
      ],
      remarkRehype: {
        footnoteLabelProperties: {
          className: [""],
        },
      },
    }),
  },
});
