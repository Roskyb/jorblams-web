---
name: blog-post
description: >
  Creates bilingual blog posts (es/en) for the Jorblams Web site following the established content structure, style, and conventions.
  Trigger: When creating a blog post, writing an article, adding content to the blog, or user says "nuevo post", "new post", "escribir artículo".
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Creating a new blog post for the site
- Translating an existing post to the other language
- Adding tags or categories for new content

## Critical Patterns

### File Structure

Posts are `.mdx` files organized by language with identical filenames across translations:

```
src/data/blog/
├── en/{slug}.mdx          # English version
├── es/{slug}.mdx          # Spanish version
└── {slug}/                # Optional: post-specific assets (images)
```

### Frontmatter Schema

Every post MUST have this exact frontmatter:

```yaml
---
title: string              # Post title in the corresponding language
description: string        # Short description for SEO/cards
date: ISO datetime         # Publication date (e.g. 2026-04-01T10:00:00)
lastModified: ISO datetime # Same as date on creation
author: {lang}/john-doe    # Language-prefixed author reference
cover: path                # Cover image path (see Cover Images below)
tags:                      # Array of language-prefixed tag references
  - {lang}/tag-slug
category: {lang}/category  # Language-prefixed category reference
draft: boolean             # true while WIP, false to publish
---
```

### References Are Language-Prefixed

ALL references (author, tags, category) MUST use the language prefix:

| Language | Author | Tag example | Category example |
|----------|--------|-------------|------------------|
| Spanish | `es/john-doe` | `es/ai` | `es/desarrollo` |
| English | `en/john-doe` | `en/ai` | `en/desarrollo` |

### Cover Images

Cover images are mesh gradients stored in `src/assets/images/`. Before assigning one, check which are already in use by other posts:

```bash
rg "cover:" src/data/blog/es/ --no-heading
```

If all existing images are taken, the post can share one or a new gradient can be generated.

Post-specific images (screenshots, diagrams) go in `src/data/blog/{slug}/` and are referenced with relative paths: `../slug/image.webp`.

### Available Tags

Check existing tags before creating new ones:

```bash
ls src/data/tags/es/
```

If a tag doesn't exist, create it in BOTH languages:

```markdown
<!-- src/data/tags/es/{tag-slug}.md -->
---
title: Tag Name
---
```

```markdown
<!-- src/data/tags/en/{tag-slug}.md -->
---
title: Tag Name
---
```

### Available Categories

```bash
ls src/data/categories/es/
```

Same rule: if a category doesn't exist, create it in both languages with a `title` field.

## Workflow

### Step 1: Research existing content

Before writing, read 2-3 existing posts to match the tone and structure:

```bash
ls src/data/blog/es/
```

Read at least one full article to calibrate style.

### Step 2: Write the Spanish version first

- Filename: `src/data/blog/es/{slug}.mdx`
- Use neutral Spanish (castellano neutro — no regionalismos marcados)
- Set `draft: true` initially
- Tone: direct, educational, practical. No unnecessary formalities
- Structure: problem → solution → steps → conclusion
- Use `##` for main sections, `###` for subsections (no H1, the title handles that)
- Use `> blockquotes` for notes and emphasis
- Use code blocks with language identifiers
- End with a closing thought and 🚀

### Step 3: Get user approval

STOP and ask the user to review the Spanish version before translating. Do NOT proceed to English without explicit approval.

### Step 4: Create the English version

- Same filename: `src/data/blog/en/{slug}.mdx`
- Translate all content including frontmatter (title, description)
- Keep the same structure, code blocks, and images
- Update all references to use `en/` prefix
- Match the same tone — direct and educational, not formal

### Step 5: Create missing tags/categories

If the post needs tags or categories that don't exist yet, create them in both `es/` and `en/` directories.

### Step 6: Publish

Change `draft: false` in both versions when the user gives the OK.

## Content Style Guide

| Do | Don't |
|----|-------|
| Be direct and practical | Use overly formal or academic language |
| Explain the "why" before the "how" | Jump into code without context |
| Use real-world examples | Use abstract/contrived examples |
| Keep paragraphs short | Write walls of text |
| Use bold for key concepts | Overuse formatting |
| End sections with actionable takeaways | Leave sections without a clear point |
| Use code blocks with syntax highlighting | Show code without language identifiers |

## Commands

```bash
# Check existing posts
ls src/data/blog/es/

# Check available tags
ls src/data/tags/es/

# Check available categories
ls src/data/categories/es/

# Check which cover images are in use
rg "cover:" src/data/blog/es/ --no-heading

# Check available cover images
ls src/assets/images/
```
