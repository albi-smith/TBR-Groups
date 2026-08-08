import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteImagemin from 'vite-plugin-imagemin';
import Sitemap from 'vite-plugin-sitemap';
import vitePrerender from 'vite-plugin-prerender';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Routes from src/App.jsx — concrete URLs for the dynamic params:
// /service/:serviceSlug (slugs from src/data/servicesData.js) and /links/:subPage
const serviceSlugs = [
  'digital-solutions',
  'csc',
  'document-registration',
  'ticket-booking',
  'insurance',
  'banking',
  'postal',
  'business-registration',
  'project-binding',
  'computer-accessories',
  'mobile-accessories',
  'stationary',
  'journals-books',
  'organic-foods',
];

const prerenderRoutes = [
  '/',
  '/links',
  '/links/traders',
  '/links/education',
  ...serviceSlugs.map((slug) => `/service/${slug}`),
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.7, 0.8], speed: 4 },
      svgo: {
        plugins: [
          { name: 'removeViewBox' },
          { name: 'removeEmptyAttrs', active: false },
        ],
      },
      webp: { quality: 80 },
    }),
    Sitemap({
      hostname: 'https://tbr-groups.vercel.app/',
      dynamicRoutes: prerenderRoutes.filter((r) => r !== '/'),
    }),
    vitePrerender({
      staticDir: path.resolve(__dirname, 'dist'),
      routes: prerenderRoutes,
      renderer: new vitePrerender.PuppeteerRenderer({
        headless: true,
        inject: true,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        renderAfterTime: 4000,
        maxConcurrentRoutes: 1,
      }),
    }),
  ],
  server: {
    port: 3000,
  },
});
