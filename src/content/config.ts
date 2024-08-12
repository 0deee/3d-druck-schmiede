import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		author: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		heroImage: z.string().optional(),
		category: z.string(),
		readingTime: z.number().int().min(1).optional(),
		
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

//lesezeit
