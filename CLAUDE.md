# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based personal resume/blog website. It features a resume page, blog with markdown/MDX support, tag-based filtering, RSS feeds, and sitemap generation. The site uses Tailwind CSS for styling and Biome for linting.

## Development Commands

```bash
# Development
bun run dev              # Start dev server at localhost:4321
bun run build            # Build production site to ./dist/
bun run preview          # Preview production build locally

# Code Quality
bun run lint             # Run Biome linter
bun run lint:fix         # Auto-fix linting issues
bun run type-check       # Run TypeScript type checking (tsc --noEmit)

# Maintenance
bun run up-deps          # Update minor dependencies
bun run up-deps:major    # Update major dependencies
bun run clean            # Clean node_modules
```

## Architecture

### Content Management

- **Content Collections**: Blog posts are managed via Astro's content collections in `src/content/post/`
- Posts support both `.md` and `.mdx` formats with frontmatter validation defined in `src/content/config.ts`
- Draft posts are filtered out in production via `getAllPosts()` in `src/utils/post.ts`
- Required frontmatter: `title`, `description`, `publishDate`
- Optional frontmatter: `updatedDate`, `coverImage`, `tags`, `ogImage`, `draft`

### Key Configuration Files

- `src/site.config.ts`: Central configuration for site metadata, menu links, and Expressive Code theme settings
- `astro.config.mjs`: Astro configuration including integrations (MDX, sitemap, expressive-code, icon)
- The site URL is loaded from `.env` via `SITE_URL` environment variable (see `.env.sample`)

### Custom Remark Plugin

- `src/utils/remarkReadingTime.ts`: Automatically calculates reading time for blog posts and injects `minutesRead` into frontmatter

### Path Aliases

- `@/*` maps to `./src/*` (configured in tsconfig.json)

### Styling

- Uses Tailwind CSS v4 via Vite plugin
- Biome is configured to sort Tailwind classes using `useSortedClasses` rule
- Utility function `cn()` in `src/utils/tailwind.ts` for conditional class merging

### Code Quality

- Biome excludes `.astro` files from linting (configured in biome.json line 22)
- TypeScript uses strict mode with strict null checks
- Biome enforces: unused imports/variables/params as errors, import type usage, sorted classes

### Layout Structure

- `BaseLayout.astro`: Main layout wrapper with header/footer
- `BlogPost.astro`: Specialized layout for individual blog posts with TOC support
- Components are organized in `src/components/` with blog-specific components in `src/components/blog/`

### Routing

- File-based routing in `src/pages/`
- Blog posts: `/blog/[slug]` with pagination at `/blog/[...page]`
- Tags: `/tags/` index and `/tags/[tag]/[...page]` for filtered views
- RSS feed: `/rss.xml`

### Markdown Processing

- External links automatically open in new tab with `nofollow, noopener, noreferrer` (rehype-external-links)
- Code blocks styled with Expressive Code using dracula (dark) and github-light (light) themes
- Theme switching controlled via `[data-theme]` attribute

## Important Notes

- When adding new blog posts, create them in `src/content/post/` with proper frontmatter
- Tags are automatically lowercased and deduplicated via the schema transform
- The `getAllPosts()` function must be used to properly filter drafts in production
