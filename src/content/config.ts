import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		author: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		heroImage: image().optional(),
		heroImageAlt: z.string().optional(),
		category: z.union([z.literal('Technik'), z.literal('Tipps & Tricks'),
		z.literal('Anwendungsgebiete'), z.literal('Material'), z.literal('Nachhaltigkeit')]),
		keywords: z.array(z.string()),
	}),
});

const wikiCollection = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		author: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		termType: z.string().optional(),
		keywords:z.array(z.string()),
	}),
});

export const collections = {
	'blog': blogCollection,
	'wiki': wikiCollection,
};