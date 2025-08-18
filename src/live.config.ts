import { defineLiveCollection } from 'astro:content';
import { lumaEventLoader } from './loaders/lumaLoader.js';

const lumaApiKey = import.meta.env.LUMA_API_KEY || process.env.LUMA_API_KEY;
console.log('🔑 Environment check - LUMA_API_KEY available:', !!lumaApiKey);
console.log('🌍 All environment variables:', Object.keys(process.env).filter(key => key.includes('LUMA')));

const events = defineLiveCollection({
	loader: lumaEventLoader({
		apiKey: lumaApiKey!,
		calendarId: 'cal-iLfUS8vuU4cGy9A', // NebraskaJS calendar ID from the API response
	}),
});

export const collections = { events };