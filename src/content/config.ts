import { defineCollection, z } from 'astro:content';
import { lumaEventLoader } from '../loaders/staticLumaLoader';

const events = defineCollection({
	loader: lumaEventLoader({
		apiKey: import.meta.env.LUMA_API_KEY!,
		calendarId: 'cal-iLfUS8vuU4cGy9A',
	}),
	schema: z.object({
		api_id: z.string(),
		created_at: z.string(),
		cover_url: z.string(),
		calendar_api_id: z.string(),
		description: z.string(),
		description_md: z.string(),
		duration_interval: z.string(),
		end_at: z.string(),
		geo_address_json: z.object({
			geo_latitude: z.string().nullable(),
			geo_longitude: z.string().nullable(),
			meeting_url: z.string().nullable(),
		}).nullable(),
		name: z.string(),
		start_at: z.string(),
		timezone: z.string(),
		url: z.string(),
		user_api_id: z.string(),
		visibility: z.enum(['public', 'members-only', 'private']),
		zoom_meeting_url: z.string().nullable(),
		tags: z.array(z.object({
			api_id: z.string(),
			name: z.string(),
		})),
	}),
});

export const collections = { events };