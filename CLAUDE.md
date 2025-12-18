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

- **Content Layer API**: Blog posts use Astro's Content Layer API with `glob()` loader in `src/content.config.ts`
- Posts are stored in `src/content/post/` and support both `.md` and `.mdx` formats
- Draft posts are filtered out in production via `getAllPosts()` in `src/utils/post.ts`
- Required frontmatter: `title` (max 60 chars), `description` (10-160 chars), `publishDate`
- Optional frontmatter: `updatedDate`, `coverImage`, `tags`, `ogImage`, `draft`, `order`
- `order` field (number, default 0): Controls display order for posts on the same day - higher values appear first
- **Post identifier**: Use `post.id` (not `post.slug`) to reference post identifiers
- **Rendering content**: Use `render(entry)` from `astro:content`, not `entry.render()`:
```typescript
import { render } from "astro:content";
const { Content, headings, remarkPluginFrontmatter } = await render(entry);
```

### Key Configuration Files

- `src/content.config.ts`: Content Layer API configuration with `glob()` loader and Zod schema
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
- Resume: `/resume` (web version) and `/resume/print` (PDF-optimized version)

### Resume System

The resume uses a centralized data architecture with a single source of truth:

**Data File:** `src/data/resume.ts`
- Contains all resume content: contact info, experience, education, projects, skills, and summary
- Both `/resume` and `/resume/print` pages import from this file
- Update content once, changes reflect on both pages automatically

**Data Types:**
- `ContactInfo` - name, email, LinkedIn, location, current company
- `Experience[]` - job positions with company, title, dates, achievements, skills
- `Education[]` - degrees and institutions with optional logo
- `Project[]` - personal projects with optional image
- `SkillCategory[]` - skills grouped by category (Languages, Frontend, Backend, DevOps)
- `ResumeSummary` - short version (web About section) and detailed version (print Professional Summary)

**Helper Functions:**
- `getPrintExperience()` - filters experiences, excluding those with `excludeFromPrint: true`
- `getSkillsByCategory(title)` - retrieves skills for a specific category

**Print/PDF Version (`/resume/print`):**
- ATS-friendly format: single-column, no graphics, standard fonts (Arial)
- Excludes: About section, Projects section, experiences marked `excludeFromPrint`
- Uses `<style is:global>` to ensure styles apply to html/body elements
- Optimized for single-page output with 36px padding

**To exclude an experience from PDF:** Add `excludeFromPrint: true` to the experience object in `src/data/resume.ts`

**To add a new experience:**
```typescript
// In src/data/resume.ts, add to the experience array:
{
  company: "Company Name",
  position: "Job Title",
  startDate: "Month Year",
  endDate: "Current", // or "Month Year"
  location: "City, State",
  website: "https://company.com/",
  achievements: [
    "Achievement 1 with quantified impact",
    "Achievement 2 with metrics",
  ],
  skills: ["Skill1", "Skill2", "Skill3"],
  excludeFromPrint: false, // optional, defaults to showing in print
}
```

### Markdown Processing

- External links automatically open in new tab with `nofollow, noopener, noreferrer` (rehype-external-links)
- Code blocks styled with Expressive Code using dracula (dark) and github-light (light) themes
- Theme switching controlled via `[data-theme]` attribute

### Component Patterns

**Polymorphic Components:** Several components use Astro's `Polymorphic` type to allow dynamic HTML tag selection:
```astro
// Card.astro, Button.astro, ProjectCard.astro
const { as: Tag = "div", ...props } = Astro.props;
<Tag {...props}>...</Tag>
```
Usage: `<Card as='a' href={...} />` renders as anchor, `<Card />` renders as div.

**Spread Props Pattern:** Components extract known props and spread the rest for HTML attributes:
```astro
const { class: className, title, ...rest } = Astro.props;
<Tag class={className} {...rest}>
```

**Named Slots:** Components support optional icon slots (`icon`, `icon-before`, `icon-after`) for flexible composition.

**Recursive Components:** Use `<Astro.self>` for recursive rendering (see `TOCHeading.astro` for hierarchical headings):
```astro
{subheadings.map((subheading) => <Astro.self heading={subheading} />)}
```

### Image Handling

**Dynamic Image Imports:** Card and ProjectCard components use `import.meta.glob` for runtime image validation:
```typescript
const images = import.meta.glob<{ default: ImageMetadata }>("/src/assets/*.{jpeg,jpg,png,gif}");
```
- Throws build-time error if image path doesn't exist
- Used for company logos, project images, education logos

**Image Loading Priority:**
- `loading='eager'` + `fetchpriority='high'` for above-fold images (avatar, blog hero)
- Default lazy loading for below-fold content

### Icon Usage

**Astro Icon Component:** Uses `@iconify-json/tabler` icons:
```astro
import { Icon } from "astro-icon/components";
<Icon size='24' name='tabler:brand-linkedin' aria-hidden='true' />
```
- Always pair decorative icons with `aria-hidden='true'`
- Use `sr-only` span for screen reader text on icon-only buttons

**Inline SVGs:** Used for custom icons, support `currentColor` for theme-aware coloring.

### Theme / Dark Mode

**Implementation:** `ThemeProvider.astro` handles theme with inline script (no hydration):
- Reads from `localStorage` key `theme` and system `prefers-color-scheme`
- Sets `dark` class on document root
- Custom event `theme-change` for cross-component communication
- Handles View Transitions with `astro:after-swap` hook

**CSS Variables:** Defined in `global.css` using HSL format:
- Light mode in `:root`, dark mode overrides in `.dark`
- Variables: `--background`, `--foreground`, `--primary`, `--muted`, `--border`, etc.

**Expressive Code:** Uses `[data-theme='dark']` selector (not class) for code block theming.

### SEO Patterns

**BaseHead.astro** handles all meta tags:
- Canonical URL from `Astro.url.pathname` + `Astro.site`
- OpenGraph image fallback: `/social_card.jpg`
- Conditional article metadata when `articleDate` prop exists
- Title format: `Page Title • Site Title`

**JSON-LD Schemas:**
- `JsonLd.astro` - Person schema with skills, job title, social profiles
- `BlogPostSchema.astro` - BlogPosting schema with keywords from tags
- `ResumeSchema.astro` - Person schema with experience as OrganizationRole, education as alumniOf
- `BreadcrumbSchema.astro` - Generic breadcrumb builder (takes array of `{name, url}`)

All schemas use `set:html` with `JSON.stringify()`. Multiple schema scripts can exist on the same page.

**Pagefind Search:** Blog content uses `data-pagefind-body` and `data-pagefind-filter='tag'` attributes.

### Utility Functions

**`src/utils/tailwind.ts`** - Class merging:
```typescript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**`src/utils/date.ts`** - Date formatting using `Intl.DateTimeFormat` with config from `site.config.ts`.

**`src/utils/domElement.ts`** - DOM helpers:
- `toggleClass()`, `elementHasClass()`
- `rootInDarkMode()` - checks `data-theme` attribute (not class)

**`src/utils/generateToc.ts`** - Generates hierarchical table of contents from markdown headings. Uses `<Astro.self>` for recursive rendering in `TOCHeading.astro`.

**`src/utils/post.ts`** - Post collection management:
- `getAllPosts()` - Fetches posts, filters drafts in production
- `sortMDByDate()` - Sorts by date (uses `updatedDate` if available), then by `order` field for same-day posts
- `getUniqueTags()` / `getUniqueTagsWithCount()` - Tag extraction utilities
- `getPostNavigation()` - Gets prev/next posts for navigation

**`src/utils/analytics.ts`** - PostHog tracking utilities:
- All functions check `typeof window !== "undefined"` before calling PostHog
- Event properties use snake_case convention
- Organized by feature: `trackBlogScrollDepth()`, `trackBlogPostCompleted()`, `trackExternalLinkClick()`, etc.

### Accessibility Patterns

**Skip Links:** Present in Header and Resume pages:
```astro
<a href='#content' class='sr-only focus:not-sr-only focus:block focus:static focus:z-50 focus:p-4'>
  Skip to content
</a>
```

**Screen Reader Text:** Use `<span class='sr-only'>(opens in new tab)</span>` for external links.

**ARIA:** `aria-label` on interactive elements, `aria-hidden='true'` on decorative elements.

### Analytics

**PostHog:** Configured in `PostHog.astro` with `VITE_POSTHOG_KEY` environment variable.
- Respects Do Not Track (DNT) browser setting
- Uses `person_profiles: "identified_only"` for cost efficiency
- Session recording enabled with privacy controls (`maskAllInputs`, `maskTextSelector`)

**Blog Analytics (in `BlogPost.astro`):**
- Scroll depth tracking at 25%, 50%, 75%, 100% milestones with time-to-reach
- Post completion tracking when comments section enters viewport
- External link click tracking with platform detection
- TOC link click tracking
- Print intent tracking

**Giscus Comments:** GitHub Discussions-based comments in `Comments.astro`, repo: `funkstyr/funkstyr.github.io`.

## Claude Commands & Skills

This project includes custom Claude Code slash commands and skills in `.claude/`.

### Available Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `/find <query>` | Search for code, patterns, or implementations | `/find polymorphic component` |
| `/research <topic>` | Research and plan a feature or solution | `/research add search functionality` |
| `/review <target>` | Review code with PR-quality feedback | `/review staged` or `/review src/components/Card.astro` |
| `/test <target>` | Run verification checks (lint, type-check, build) | `/test src/utils/date.ts` |
| `/understand <code>` | Deep explanation of code or patterns | `/understand content collections` |
| `/write <description>` | Generate code following repo patterns | `/write new blog post component` |

### Available Skills

Skills activate automatically based on conversation context:

| Skill | Activates When |
|-------|----------------|
| `content` | Working with blog posts, MDX, frontmatter, tags |
| `find` | Searching for code ("where is...", "find the...") |
| `research` | Planning features, discussing architecture |
| `review` | Reviewing code, checking quality |
| `test` | Testing, verification, build issues |
| `type-safety` | Type errors, TypeScript patterns |
| `understand` | Explaining code ("what does this do", "how does X work") |
| `write` | Creating new code, components, pages |

### Adding New Blog Posts

Use the `/write` command or follow this pattern:

1. Create file in `src/content/post/` with naming: `YYYY_MM_DD_post-slug.mdx`
2. Include required frontmatter:
```yaml
---
title: "Post Title"
description: "Brief description for SEO"
publishDate: "2025-01-15"
tags: ["tag1", "tag2"]
---
```
3. Run `bun run build` to verify content schema validation

### Pagination Patterns

**Blog Archive** (`src/pages/blog/[...page].astro`):
```typescript
export const getStaticPaths = (async ({ paginate }) => {
  const allPosts = await getAllPosts();
  const allPostsByDate = sortMDByDate(allPosts);
  return paginate(allPostsByDate, { pageSize: 10, props: { uniqueTags } });
}) satisfies GetStaticPaths;
```

**Tag Pagination** (`src/pages/tags/[tag]/[...page].astro`):
- Creates paginated routes for each unique tag
- Uses `flatMap` to generate all tag + page combinations

**PaginationLink Type:**
```typescript
type PaginationLink = {
  url: string;
  text?: string;    // Display text
  srLabel?: string; // Screen reader label
};
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `PostPreview.astro` |
| Utilities | camelCase | `getFormattedDate()` |
| CSS classes | kebab-case | `sr-only`, `data-theme` |
| Analytics events | snake_case | `blog_scroll_depth` |
| Data attributes | kebab-case | `data-astro-prefetch` |
| Blog post files | `YYYY_MM_DD_slug.mdx` | `2025_01_15_my-post.mdx` |

## Important Notes

- When adding new blog posts, create them in `src/content/post/` with proper frontmatter
- Tags are automatically lowercased and deduplicated via the schema transform
- The `getAllPosts()` function must be used to properly filter drafts in production
- Use `post.id` (not `post.slug`) when referencing post identifiers in URLs and navigation
- Content config is at `src/content.config.ts` (not in `src/content/` directory)
- Use `render(entry)` from `astro:content` to render content entries
- Use `data-astro-prefetch` attribute on navigation links for prefetching
- Print/PDF pages must use `<style is:global>` to style html/body elements
- Use `cn()` for all dynamic class composition to handle Tailwind conflicts
- Always check `typeof window !== "undefined"` before using browser APIs in scripts
