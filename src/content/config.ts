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
	}),
});

const caseStudyCollection = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		caseStudyImage: image(),
		caseStudyImageAlt: z.string(),
		company: z.string(),
		startDate: z.coerce.date(),
		endDate: z.coerce.date(),
		materials: z.string(),
		printingTechnology: z.string(),
	}),
});

export const collections = {
	'blog': blogCollection,
	'wiki': wikiCollection,
	'case-studies': caseStudyCollection,
};