# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an Astro-based personal resume and blog site. It uses:
- **Astro 5** for static site generation
- **TailwindCSS 4** for styling
- **Biome** for linting and formatting
- **TypeScript** with strict mode
- **Bun** as the package manager (GitHub Actions) and runtime
- **MDX** for blog posts with reading time calculation

The site is deployed to GitHub Pages via GitHub Actions.

## Commands

### Development
```powershell
bun run dev              # Start dev server at localhost:4321
bun run preview          # Preview production build locally
bun run build            # Build site to ./dist/
bun run astro sync       # Sync content collections types
```

### Code Quality
```powershell
bun run lint             # Run Biome linter/formatter checks
bun run lint:fix         # Auto-fix linting issues
bun run type-check       # Run TypeScript type checking
```

**Important:** Always run `bun run lint` and `bun run type-check` after making code changes.

### Dependency Management
```powershell
bun install              # Install dependencies
bun run up-deps          # Update minor dependencies
bun run up-deps:major    # Update major dependencies
bun run clean            # Clean node_modules
```

## Architecture

### Content Management
- **Content Collections**: Blog posts live in `src/content/post/` as `.md` or `.mdx` files
- **Schema**: Defined in `src/content/config.ts` with Zod validation
- **Frontmatter Fields**: `title`, `description`, `publishDate`, `updatedDate`, `coverImage`, `draft`, `tags`, `ogImage`
- **Draft Posts**: Filtered out in production via `getAllPosts()` utility (see `src/utils/post.ts`)
- **Reading Time**: Automatically calculated via custom remark plugin (`src/utils/remarkReadingTime.ts`)

### Configuration
- **Site Config**: `src/site.config.ts` contains site metadata, menu links, and Expressive Code theme settings
- **Path Aliases**: `@/*` maps to `src/*` (defined in `tsconfig.json`)
- **Environment Variables**: Loaded via dotenv, see `.env.sample`. Required for build: `SITE_URL`, `VITE_POSTHOG_KEY`

### Page Structure
- **Pages**: File-based routing in `src/pages/`
  - `/` - Resume/home page
  - `/blog/` - Paginated blog listing
  - `/blog/[slug]` - Individual blog posts
  - `/tags/` - Tag listing and filtered views
  - `/tools/` - Tools page
- **Layouts**: `BaseLayout.astro` (site wrapper), `BlogPost.astro` (post template)
- **Components**: Organized in `src/components/` with specialized `blog/` and `layout/` subdirectories

### Styling
- **TailwindCSS 4**: Via Vite plugin (`@tailwindcss/vite`)
- **Config**: `tailwind.config.ts`
- **Utility Helper**: `cn()` function in `src/utils/tailwind.ts` for conditional class merging
- **Biome**: Configured to sort Tailwind classes via `useSortedClasses` rule for `clsx`, `cva`, `cn` functions

### Markdown/MDX Pipeline
- **Remark Plugins**: 
  - `remarkReadingTime` - Adds `minutesRead` to frontmatter
- **Rehype Plugins**:
  - `rehypeExternalLinks` - Opens external links in new tab with security attributes
- **Code Highlighting**: Astro Expressive Code with dual themes (dracula/github-light)

## Development Guidelines

### Code Style
- **Quotes**: Double quotes for JavaScript/TypeScript
- **Semicolons**: Always required
- **Trailing Commas**: Required
- **Import Organization**: Auto-organized via Biome
- **Import Types**: Use `import type` for type-only imports (enforced)
- **Unused Code**: No unused variables, imports, or function parameters (error level)

### Content Collection Workflow
When adding/modifying blog posts:
1. Create/edit `.md` or `.mdx` file in `src/content/post/`
2. Ensure frontmatter matches schema in `src/content/config.ts`
3. Use `draft: true` for unpublished posts
4. Tags are automatically lowercased and de-duplicated
5. Run `bun run astro sync` to regenerate types if schema changes

### Utilities
Key utilities in `src/utils/`:
- **post.ts**: `getAllPosts()`, `sortMDByDate()`, `getUniqueTags()`, `getUniqueTagsWithCount()`
- **date.ts**: Date formatting helpers
- **generateToc.ts**: Table of contents generation for blog posts
- **tailwind.ts**: Class name merging utilities

### Deployment
- Automated via GitHub Actions on push to `main` branch
- Requires repository secrets: `SITE_URL`, `VITE_POSTHOG_KEY`
- Build uses Bun, targets GitHub Pages
- Output directory: `dist/`

## File Exclusions
Biome ignores: `.astro` files, `.next`, `dist`, `.turbo`, `dev-dist`, `.zed`, `.vscode`, `.nuxt`
