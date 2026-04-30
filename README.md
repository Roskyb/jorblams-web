# Jorblams Web

Personal portfolio and blog built with Astro v5, with support for internationalization (i18n) in English and Spanish.

## Tech Stack

- **Framework**: Astro 6.x with static site generation
- **Styling**: TailwindCSS 4.x
- **Content**: MDX for blog posts with frontmatter
- **CMS**: Sveltia CMS (Netlify CMS fork) at `/admin`
- **i18n**: Astro built-in i18n routing with subdirectory format (`/en/`, `/es/`)
- **Type Safety**: TypeScript with strict mode
- **Code Quality**: Biome for formatting and linting
- **Testing**: Vitest

Default locale is Spanish (`es`).

## URL Structure

- `/es/` - Spanish (default)
- `/en/` - English

## Features

- [x] Multilingual blog with MDX content
- [x] Sveltia CMS admin panel for content management
- [x] SEO-friendly with sitemap and RSS feeds
- [x] Author, category, and tag organization
- [x] Responsive images with optimization
- [x] Lighthouse score: 100 on all metrics

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (opens browser)
npm start

# Start dev server (without opening browser)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run checks (TypeScript + Biome)
npm run check

# Format code
npm run format

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Content Management

Access the CMS admin panel at `/admin` to manage:
- Blog posts
- Authors
- Categories
- Tags
- Projects

## Documentation

This project is self-documented. Navigate to the deployed site to see all features in action.
