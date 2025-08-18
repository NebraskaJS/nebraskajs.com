import { defineLiveCollection } from 'astro:content';
import { lumaEventLoader } from './loaders/lumaLoader.js';

const events = defineLiveCollection({
	loader: lumaEventLoader({
		apiKey: import.meta.env.LUMA_API_KEY || process.env.LUMA_API_KEY!,
		calendarId: 'cal-iLfUS8vuU4cGy9A', // NebraskaJS calendar ID from the API response
	}),
});

export const collections = { events };