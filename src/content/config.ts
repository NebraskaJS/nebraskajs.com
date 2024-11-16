import { z, defineCollection } from 'astro:content';
import { file } from 'astro/loaders';

const posts = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		videolength: z.string().optional(),
		author: z.string(),
		presented: z.string().optional(),
		youtubeurl: z.string().optional(),
		meetuplink: z.string().optional(),
		bigtitle: z.boolean().optional(),
	}),
});

const presenters = defineCollection({
	loader: file('src/data/presenters.json'),
	schema: z.object({
		id: z.string(),
		count: z.union([z.number(), z.literal('Infinity')]).optional(),
		name: z.string(),
		avatar_url: z.string().url(),
		blog: z.string().url().optional(),
		github: z.string().optional(),
		twitter: z.string().optional(),
	}),
});

export const collections = {
	posts,
	presenters,
};
