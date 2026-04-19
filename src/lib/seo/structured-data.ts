export interface BlogPostingInput {
	title: string;
	description: string;
	datePublished: Date;
	dateModified?: Date;
	authorName: string;
	image?: string;
	url: string;
	inLanguage: string;
}

export interface BlogPostingSchema {
	"@context": "https://schema.org";
	"@type": "BlogPosting";
	headline: string;
	description: string;
	datePublished: string;
	dateModified: string;
	author: { "@type": "Person"; name: string };
	image?: string;
	inLanguage: string;
	mainEntityOfPage: { "@type": "WebPage"; "@id": string };
}

export function buildBlogPostingSchema(
	input: BlogPostingInput,
): BlogPostingSchema {
	const datePublished = input.datePublished.toISOString();
	const dateModified = (
		input.dateModified ?? input.datePublished
	).toISOString();

	const schema: BlogPostingSchema = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: input.title,
		description: input.description,
		datePublished,
		dateModified,
		author: { "@type": "Person", name: input.authorName },
		inLanguage: input.inLanguage,
		mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
	};

	if (input.image) schema.image = input.image;

	return schema;
}

export interface BreadcrumbItem {
	name: string;
	url: string;
}

export interface BreadcrumbSchema {
	"@context": "https://schema.org";
	"@type": "BreadcrumbList";
	itemListElement: Array<{
		"@type": "ListItem";
		position: number;
		name: string;
		item: string;
	}>;
}

export function buildBreadcrumbSchema(
	items: BreadcrumbItem[],
): BreadcrumbSchema {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, idx) => ({
			"@type": "ListItem",
			position: idx + 1,
			name: item.name,
			item: item.url,
		})),
	};
}

// Escape '<' and '>' so a stray "</script>" inside a string value can't
// prematurely close the enclosing <script type="application/ld+json"> tag.
export function serializeJsonLd(value: unknown): string {
	return JSON.stringify(value)
		.replace(/</g, "\\u003c")
		.replace(/>/g, "\\u003e");
}
