import { describe, expect, test } from "vitest";
import {
	buildBlogPostingSchema,
	buildBreadcrumbSchema,
	serializeJsonLd,
} from "../structured-data";

describe("buildBlogPostingSchema", () => {
	const baseInput = {
		title: "Hello World",
		description: "A post about hello.",
		datePublished: new Date("2026-01-15T10:00:00Z"),
		authorName: "Jorge Blanco",
		url: "https://www.jorblams.com/en/blog/hello/",
		inLanguage: "en",
	};

	test("returns a BlogPosting JSON-LD object with required fields", () => {
		const schema = buildBlogPostingSchema(baseInput);

		expect(schema["@context"]).toBe("https://schema.org");
		expect(schema["@type"]).toBe("BlogPosting");
		expect(schema.headline).toBe("Hello World");
		expect(schema.description).toBe("A post about hello.");
		expect(schema.inLanguage).toBe("en");
	});

	test("serializes dates as ISO 8601 strings", () => {
		const schema = buildBlogPostingSchema({
			...baseInput,
			dateModified: new Date("2026-02-01T12:00:00Z"),
		});

		expect(schema.datePublished).toBe("2026-01-15T10:00:00.000Z");
		expect(schema.dateModified).toBe("2026-02-01T12:00:00.000Z");
	});

	test("falls back dateModified to datePublished when omitted", () => {
		const schema = buildBlogPostingSchema(baseInput);
		expect(schema.dateModified).toBe(schema.datePublished);
	});

	test("emits author as a Person with the given name", () => {
		const schema = buildBlogPostingSchema(baseInput);
		expect(schema.author).toEqual({
			"@type": "Person",
			name: "Jorge Blanco",
		});
	});

	test("sets mainEntityOfPage to the given canonical url", () => {
		const schema = buildBlogPostingSchema(baseInput);
		expect(schema.mainEntityOfPage).toEqual({
			"@type": "WebPage",
			"@id": "https://www.jorblams.com/en/blog/hello/",
		});
	});

	test("includes image when provided", () => {
		const schema = buildBlogPostingSchema({
			...baseInput,
			image: "https://www.jorblams.com/cover.png",
		});
		expect(schema.image).toBe("https://www.jorblams.com/cover.png");
	});

	test("omits image when not provided", () => {
		const schema = buildBlogPostingSchema(baseInput);
		expect(schema).not.toHaveProperty("image");
	});
});

describe("buildBreadcrumbSchema", () => {
	test("returns a BreadcrumbList with positioned items", () => {
		const schema = buildBreadcrumbSchema([
			{ name: "Home", url: "https://www.jorblams.com/en/" },
			{ name: "Blog", url: "https://www.jorblams.com/en/blog/" },
			{ name: "Hello World", url: "https://www.jorblams.com/en/blog/hello/" },
		]);

		expect(schema["@context"]).toBe("https://schema.org");
		expect(schema["@type"]).toBe("BreadcrumbList");
		expect(schema.itemListElement).toHaveLength(3);

		expect(schema.itemListElement[0]).toEqual({
			"@type": "ListItem",
			position: 1,
			name: "Home",
			item: "https://www.jorblams.com/en/",
		});

		expect(schema.itemListElement[2].position).toBe(3);
		expect(schema.itemListElement[2].name).toBe("Hello World");
	});
});

describe("serializeJsonLd", () => {
	test("produces a compact JSON string", () => {
		const out = serializeJsonLd({ a: 1, b: "x" });
		expect(out).toBe('{"a":1,"b":"x"}');
	});

	test("escapes '<' to prevent '</script>' breakouts", () => {
		const out = serializeJsonLd({ evil: "</script><img src=x>" });
		expect(out).not.toContain("</script>");
		expect(out).toContain("\\u003c/script\\u003e");
	});

	test("round-trips through JSON.parse after unescaping", () => {
		const input = { msg: "x < y </script> done" };
		const out = serializeJsonLd(input);
		expect(JSON.parse(out)).toEqual(input);
	});
});
