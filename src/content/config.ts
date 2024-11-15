import { z, defineCollection } from 'astro:content';

const presenters = defineCollection({
	type: 'data',
	schema: z.object({
		id: z.string(),
		count: z.union([z.number(), z.literal('Infinity')]),
		name: z.string(),
		avatar_url: z.string().url(),
		blog: z.string().url(),
		github: z.string(),
		twitter: z.string(),
	}),
});

export const collections = {
	presenters,
};
