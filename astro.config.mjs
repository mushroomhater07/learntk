import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import node from "@astrojs/node";
import cloudflare from "@astrojs/cloudflare";
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";

import starlight from "@astrojs/starlight";

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
// export default defineConfig({
//   site: 'https://example.com',
//   integrations: [mdx(), sitemap(), react(), starlight({
//     title: 'code creators',
//   })],
//   output: "server",
//   // adapter: cloudflare(),
//   adapter: node({
//     mode: "standalone"
//   }) 1
export default defineConfig({
  site: 'https://learntk.vercel.app',
  integrations: [ starlight({
    title: 'code creators',
    customCss: [
      // Relative path to your custom CSS file
      './src/styles/custom.css',
    ],  },)],
  output: "server",
  adapter: vercel(),
  adapter: node({
    mode: "standalone"
  }),
  esbuild: {
    target: 'esnext',
    platform: 'linux',
  }
});