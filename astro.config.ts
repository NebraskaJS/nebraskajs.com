import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	integrations: [],
	vite: {
		plugins: [tailwind() as any],
	},
});
