import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: cloudflare(),
	integrations: [],
	experimental: {
		liveContentCollections: true,
	},
	vite: {
		plugins: [tailwind() as any],
	},
});
