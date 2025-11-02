import {
	type SchemaContext,
	defineCollection,
	reference,
	z,
} from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/data/blog" }),
	schema: ({ image }: SchemaContext) =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			lastModified: z.coerce
				.date()
				.optional()
				.default(() => new Date()),
			cover: image().optional(),
			author: reference("authors"),
			tags: z.array(reference("tags")),
			category: reference("categories"),
			draft: z.boolean().optional().default(false),
		}),
});

const tags = defineCollection({
	loader: glob({ pattern: "**/[^_]*.md", base: "./src/data/tags" }),
	schema: z.object({
		title: z.string(),
	}),
});

const categories = defineCollection({
	loader: glob({ pattern: "**/[^_]*.md", base: "./src/data/categories" }),
	schema: z.object({
		title: z.string(),
		order: z.number().optional(),
	}),
});

const authors = defineCollection({
	loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/authors" }),
	schema: z.object({
		name: z.string(),
		email: z.string(),
		avatar: z.string(),
		bio: z.string(),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/projects" }),
	schema: ({ image }: SchemaContext) =>
		z.object({
			title: z.string(),
			slug: z.string(),
			description: z.string(),
			cover: z.union([image(), z.string()]).optional(),
			technologies: z.array(z.string()).optional(),
			github: z.string().url().optional().or(z.literal("")),
			demo: z.string().url().optional().or(z.literal("")),
			featured: z.boolean().optional().default(false),
			order: z.number().optional().default(0),
			date: z.coerce.date(),
		}),
});

export const collections = { blog, tags, categories, authors, projects };
