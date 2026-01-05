# AGENTS.md

## Project Overview

This is a multilingual blog/CMS starter built with Astro v5 that supports internationalization (i18n) with English and Spanish languages. The project uses:

- **Framework**: Astro 5.15.3 with static site generation
- **Styling**: TailwindCSS 4.1.16
- **Content**: MDX for blog posts with frontmatter
- **CMS**: Sveltia CMS (Netlify CMS fork) for content management at `/admin`
- **i18n**: Built-in Astro i18n routing with subdirectory format (`/en/`, `/es/`)
- **Type Safety**: TypeScript with strict mode
- **Code Quality**: Biome for formatting and linting
- **Testing**: Vitest for unit tests

Default locale is Spanish (`es`). The site supports blog posts, authors, categories, tags, and projects, all managed in multiple languages.

## Dev Environment Tips

- **Node version**: Requires Node.js >= 20 (check `package.json` engines field)
- **Package manager**: Uses `npm` (standard Node package manager)
- **Content location**: All content is in `src/data/` organized by type and locale
- **Blog posts**: Located in `src/data/blog/{locale}/` as MDX files
- **Assets**: Images and media in `src/assets/`
- **i18n config**: Check `src/i18n/locales.ts` for language settings
- **Site config**: Main configuration in `astro.config.mjs`

## Setup Commands

```bash
# Install dependencies
npm install

# Start dev server (opens browser automatically)
npm start

# Start dev server (without opening browser)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run all checks (Astro check + Biome)
npm run check

# Format code
npm run format

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Build Instructions

1. **Before building**: Ensure all TypeScript and linting errors are resolved
2. **Build command**: `npm run build` - This runs Astro check first, then builds
3. **Build output**: Generated in `dist/` directory
4. **Docker**: Dockerfile available for containerized deployment with nginx

## Testing Instructions

- Tests are located in `__tests__/` directories within respective folders
- Primary test: `src/i18n/__tests__/i18n.test.ts` for i18n functionality
- Run `npm test` before committing changes
- Add tests for new i18n utilities or translation functions
- Use Vitest's `describe` and `it`/`test` blocks for organization

## Code Style Guidelines

### TypeScript
- Use TypeScript for all `.ts` files
- Define types in separate files or inline as needed
- Prefer interfaces for object shapes, types for unions/intersections
- Import types with `import type` when possible
- Check `tsconfig.json` for compiler options

### Astro Components
- Use `.astro` extension for Astro components
- Follow component structure: imports → component script → HTML template
- Props should be typed with TypeScript interfaces
- Use `---` fences for component scripts

### Styling
- TailwindCSS utility classes preferred
- Global styles in `src/styles/global.css`
- Use CSS variables for theming when needed
- Follow Tailwind v4 conventions (using Vite plugin)

### Formatting
- Use Biome for formatting and linting (configured in `biome.json`)
- Run `npm run format` to auto-format code
- Run `npm run check` before committing
- No need for Prettier or ESLint - Biome handles both

### File Naming
- Components: PascalCase (e.g., `Header.astro`, `OptimizedPicture.astro`)
- Utilities/Config: camelCase (e.g., `consts.ts`, `locales.ts`)
- Content files: kebab-case (e.g., `ddns-bash-cloudflare.mdx`)
- Dynamic routes: Use brackets (e.g., `[lang]/`, `[...id].astro`)

## i18n Architecture

### Language Configuration
- Default locale: `es` (Spanish)
- Supported locales: `en` (English), `es` (Spanish)
- Configured in `src/i18n/locales.ts`
- Astro i18n config in `astro.config.mjs`

### Content Organization
All content follows the pattern: `src/data/{type}/{locale}/`
- Blog posts: `src/data/blog/{locale}/*.mdx`
- Authors: `src/data/authors/{locale}/*.json`
- Categories: `src/data/categories/{locale}/*.md`
- Tags: `src/data/tags/{locale}/*.md`
- Projects: `src/data/projects/{locale}/*.json`

### Translation Files
- UI translations in `src/i18n/translations/`
- Organized by feature: `common.ts`, `about.ts`, `error.ts`, `theme.ts`
- Exported through `src/i18n/translations/index.ts`
- Use `Multilingual` type from `src/i18n/types.ts`

### i18n Utilities
- Main utilities in `src/i18n/i18n.ts`
- Type definitions in `src/i18n/types.ts`
- Export through `src/i18n/index.ts`

### URL Structure
- Prefix default locale: `true` (all URLs include language prefix)
- Format: `/{locale}/{path}` (e.g., `/en/blog`, `/es/acerca`)
- Root redirects to default locale

## Content Management (CMS)

### Sveltia CMS Admin
- Access at `/admin` route (defined in `src/pages/admin.astro`)
- Config: `public/admin/config.yml`
- Backend: GitHub with custom auth worker
- Editorial workflow enabled for content approval
- Local backend available for local development

### Adding Content
1. **Via CMS**: Navigate to `/admin`, authenticate, and create content
2. **Manually**: Add MDX/JSON files in `src/data/{type}/{locale}/`
3. **Assets**: Place images in `src/assets/images/` (auto-configured in CMS)

### Content Types
All content types support i18n with `multiple_folders` structure:
- **Posts**: Blog articles with title, description, date, author, tags, etc.
- **Authors**: JSON files with name, avatar, bio
- **Categories**: Markdown files with title, description
- **Tags**: Markdown files with title, description
- **Projects**: JSON files with project metadata

## Component Architecture

### Key Components
- `Header.astro`: Site header with navigation
- `Footer.astro`: Site footer
- `OptimizedPicture.astro`: Responsive image component
- `PageHeadline.astro`: Page title component
- i18n components in `src/components/i18n/`:
  - `LocaleHtmlHead.astro`: HTML head with locale meta
  - `LocaleSelect.astro`: Language switcher
  - `LocaleSuggest.astro`: Suggest translation component
  - `NotTranslateCaution.astro`: Warning for untranslated content

### Layouts
- `Base.astro`: Base layout with HTML structure
- `Article.astro`: Layout for blog posts and articles

### Pages Structure
- Static pages in `src/pages/{locale}/`
- Dynamic routes in `src/pages/[lang]/`
- 404 pages: Root `404.astro` and localized `[lang]/404.astro`
- RSS feeds: `[lang]/rss.xml.js` per locale
- Admin panel: `admin.astro`

## Environment Variables

- `PUBLIC_SITE_URL`: Production site URL (optional, defaults to `https://astro-cms.pages.dev`)
- Local dev uses `http://localhost:4321`
- Defined in `src/consts.ts` as `BASE_URL`

## Deployment

### Docker Deployment
1. Build image: `docker build -t astro-cms .`
2. Runs production build
3. Serves with nginx (config in `nginx.conf`)
4. Exposes port 80

### Static Deployment
- Build artifacts in `dist/` directory
- Deploy to any static host (Netlify, Vercel, Cloudflare Pages, etc.)
- Ensure proper redirects for i18n routing
- Configure `site` URL in `astro.config.mjs`

## Git Workflow

- **Dependency updates**: Renovate configured (see `renovate.json`)
- **Security**: Check `SECURITY.md` for vulnerability reporting
- Commit changes after running `npm run check`
- Ensure tests pass with `npm test`

## Common Tasks

### Adding a New Language
1. Update `LOCALES_SETTING` in `src/i18n/locales.ts`
2. Add locale to `public/admin/config.yml` i18n.locales
3. Update Astro config `locales` in `astro.config.mjs`
4. Create content folders: `src/data/{type}/{new-locale}/`
5. Add translations to `src/i18n/translations/`

### Creating a New Blog Post
1. Via CMS: Go to `/admin` → Collections → Posts → New Post
2. Manually: Create `{slug}.mdx` in `src/data/blog/{locale}/`
3. Include frontmatter: title, description, date, author, tags, category, heroImage, etc.
4. Create assets folder if needed: `src/data/blog/{slug}/`

### Adding a Translation
1. Identify the content file to translate
2. Create corresponding file in target locale folder
3. Keep filename consistent across locales
4. Update CMS if adding new fields

### Modifying Site Configuration
- **Branding**: Edit `src/consts.ts` (BRAND_NAME, SITE_TITLE, SITE_DESCRIPTION)
- **i18n**: Edit `src/i18n/locales.ts`
- **Astro**: Edit `astro.config.mjs`
- **Styling**: Edit TailwindCSS in global.css or components

## Troubleshooting

### TypeScript Errors
- Run `astro check` to see all type errors
- Check imports use correct paths (use `@/` alias)
- Ensure types are properly defined in `env.d.ts` or component files

### Build Failures
- Clear cache: Delete `node_modules/.astro/` and `.astro/` directories
- Reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check Node version: `node --version` (must be >= 20)

### i18n Issues
- Verify locale exists in `LOCALES_SETTING`
- Check content exists for the locale
- Ensure URL format matches configuration
- Review `astro.config.mjs` i18n settings

### CMS Issues
- Check `public/admin/config.yml` configuration
- Verify GitHub repo and branch settings
- Ensure authentication worker is properly configured
- For local testing, enable `local_backend: true`

## Additional Notes

- **Performance**: Site scores 100 on all Lighthouse metrics
- **SEO**: Includes sitemap, RSS feeds, and proper meta tags
- **RSS**: Generated per locale at `/{locale}/rss.xml`
- **Robots.txt**: Dynamic generation in `src/pages/robots.txt.ts`
- **Content Config**: Schema defined in `src/content.config.ts`
- **Monorepo**: Not a monorepo, single Astro project
- **CSS Framework**: TailwindCSS v4 with Vite plugin (modern approach)
- **Font**: Uses Figtree variable font from Fontsource
