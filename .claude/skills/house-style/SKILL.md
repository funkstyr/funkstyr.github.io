---
name: house-style
description: Code conventions for this Astro site — component patterns (polymorphic, spread props, named slots), strict TypeScript, Tailwind v4 with cn(), file-based routing, image globs, content collections. Use when writing or refactoring code in this repo, adding components/pages/posts, or whenever code structure decisions come up.
---

# funkstyr.github.io house style

This is an Astro 5 personal site with a resume page, blog (Markdown/MDX via the Content Layer API), Tailwind v4, and Biome for lint/format. The repo enforces formatting, lint, and types automatically — see [automation](#automation). This skill documents what mechanical tools **don't** check: structure, sizing, component design, content conventions.

The authoritative project doc is `CLAUDE.md` at the repo root — this skill is a quick-reference distillation, not a replacement.

## Structure: file-based, co-located

Astro is file-routed. URL = path under `src/pages/`. The directory layout:

```
src/
├── pages/                # routes (file-based)
│   ├── blog/[...page].astro
│   ├── blog/[...slug].astro
│   ├── tags/[tag]/[...page].astro
│   ├── resume.astro
│   └── resume/print.astro
├── layouts/              # page wrappers (BaseLayout, BlogPost)
├── components/
│   ├── blog/             # blog-specific (PostPreview, TOC, …)
│   ├── layout/           # header/footer/nav
│   └── *.astro           # generic UI (Card, Button, ProjectCard)
├── content/post/         # blog posts (.md + .mdx)
├── content.config.ts     # Content Layer schema (Zod) — NOT inside content/
├── data/resume.ts        # single source of truth for resume data
├── utils/                # pure helpers (date, post, tailwind, generateToc, analytics)
├── assets/               # images for components (resolved via import.meta.glob)
└── site.config.ts        # site-wide metadata, menu, ec themes
```

**One concern per file.** A `.astro` file is one component + its tightly-coupled markup/script. Hooks, helpers, or generic utilities belong in `src/utils/` — not inline in a component.

**Co-locate by feature, not type.** Blog-only components live in `components/blog/`. Layout chrome lives in `components/layout/`. Don't fan out generic components into per-page folders.

**Path alias:** `@/*` resolves to `./src/*`. Use it for cross-directory imports (`@/utils/post`, `@/layouts/BaseLayout.astro`). Use relative paths only for siblings.

## Component patterns

These three patterns recur across the codebase. Match them when adding new components.

### Polymorphic components

When a component might render as different HTML tags (`<div>` vs `<a>` vs `<button>`), use Astro's `Polymorphic` type:

```astro
---
import type { HTMLTag, Polymorphic } from "astro/types";
import { cn } from "@/utils/tailwind";

type Props<Tag extends HTMLTag> = Polymorphic<{ as: Tag }> & {
  class?: string;
};

const { as: Tag = "div", class: className, ...rest } = Astro.props;
---

<Tag class={cn("base-styles", className)} {...rest}>
  <slot />
</Tag>
```

Used by `Card.astro`, `Button.astro`, `ProjectCard.astro`. Callers: `<Card as="a" href={…}>` or `<Card>` (defaults to `div`).

### Spread props

Extract known props, spread the rest as HTML attributes — gives consumers the full underlying-element attribute surface for free:

```astro
---
const { class: className, title, ...rest } = Astro.props;
---

<div class={className} {...rest}>
  <h2>{title}</h2>
  <slot />
</div>
```

### Named slots

Use named slots for optional composition points (icons, headers, footers):

```astro
<button>
  <slot name="icon-before" />
  <slot />
  <slot name="icon-after" />
</button>
```

Caller: `<Button><Fragment slot="icon-before"><Icon …/></Fragment>Click</Button>`.

### Recursive components

For hierarchical content like nested headings, use `<Astro.self>` (see `TOCHeading.astro`):

```astro
{subheadings.map((s) => <Astro.self heading={s} />)}
```

### Class composition

**Always use `cn()` from `@/utils/tailwind`** for any class that mixes static classes with caller-provided `class` or conditional logic. It wraps `clsx` + `tailwind-merge` so Tailwind conflicts resolve correctly.

```ts
class={cn("rounded-lg p-4", isActive && "bg-primary", className)}
```

Biome sorts Tailwind classes automatically (`useSortedClasses`). Don't hand-order them.

## Style: blank-line groups

Separate logical groups within a file with a single blank line. Read top-to-bottom, each chunk is a "paragraph":

```ts
const POSTS_PER_PAGE = 10;
const TAGS_PER_PAGE = 20;

export type PaginationLink = {
  url: string;
  text?: string;
  srLabel?: string;
};

export function getAllPosts(): Promise<Post[]> {
  // …
}
```

**Default to a blank line between top-level statements; pack only the explicit exceptions.** Rules:

- A `const` and the guard that immediately validates it stay together.
- Consecutive guard returns of the same flavor stay packed.
- Parallel facts of the same shape stay packed.
- A new `const`/`let` that begins a different computation gets a blank line above it.
- After a multi-line statement (object/array literal, multi-line function call, block `if`/`for`), insert a blank before the next statement.

### Inside `.astro` frontmatter

The script block at the top of an `.astro` file follows the same rules. Group: imports → prop extraction → derived data → side-effect-free computation.

```astro
---
import type { CollectionEntry } from "astro:content";
import { render } from "astro:content";
import BaseLayout from "@/layouts/BaseLayout.astro";
import { getPostNavigation } from "@/utils/post";

type Props = { entry: CollectionEntry<"post"> };

const { entry } = Astro.props;

const { Content, headings, remarkPluginFrontmatter } = await render(entry);
const { prev, next } = await getPostNavigation(entry.id);
---
```

### Inside JSX/Astro markup

Distinct sibling elements get a blank line between them. Pack only:

- Repeated identical siblings produced by `.map()` (algorithmic list).
- List-shaped same-tag siblings of a collection container.
- Label + value composing one visual line.

## TypeScript

`tsconfig.json` extends `astro/tsconfigs/strict`. Conventions:

- **`type` over `interface`** unless declaration merging is needed.
- **`import type`** for type-only imports — Biome enforces this (`useImportType`).
- **No `any`.** Reach for `unknown` and narrow, or fix the type at the boundary.
- **Trust internal code.** Validate at boundaries (Content Layer schema, env vars, user input). Don't re-validate values that already passed the type-checker.
- **`Astro.props` typing**: use `type Props = …` in the script block; Astro picks it up.
- **HTML attribute typing**: `import type { HTMLAttributes } from "astro/types"` and extend `HTMLAttributes<"div">` for components that pass through DOM attributes.

## Content (blog posts)

Posts live in `src/content/post/` as `.md` or `.mdx`. File naming: `YYYY_MM_DD_slug.mdx`.

Required frontmatter (validated by the Zod schema in `src/content.config.ts`):

```yaml
---
title: "Post Title" # max 60 chars
description: "Brief SEO description" # 10–160 chars
publishDate: "2026-05-20"
tags: ["astro", "performance"] # lowercased + deduped via schema transform
---
```

Optional: `updatedDate`, `coverImage`, `ogImage`, `draft`, `order` (number; higher = first within a day).

**Always use `getAllPosts()` from `@/utils/post`** to read posts — it filters drafts in production. Don't call `getCollection("post")` directly from pages.

**Reference posts by `post.id`, not `post.slug`.** Astro 5's Content Layer API uses `id`.

**Render with `render(entry)` from `astro:content`** — not `entry.render()`:

```ts
import { render } from "astro:content";
const { Content, headings, remarkPluginFrontmatter } = await render(entry);
```

## Resume system

Single source of truth: `src/data/resume.ts`. Both `/resume` (web) and `/resume/print` (PDF/ATS) import from it.

- `getPrintExperience()` filters out entries with `excludeFromPrint: true`.
- `getSkillsByCategory(title)` retrieves skills for a category.
- Print page uses `<style is:global>` (needed to reach `html`/`body`).
- Print page is ATS-friendly: single column, no graphics, Arial, single page.

## Image handling

Use `import.meta.glob` with `ImageMetadata` typing for runtime image validation (build-fails if path is wrong):

```ts
const images = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/*.{jpeg,jpg,png,gif}",
);
```

**Loading priority:**

- Above-fold (avatar, blog hero): `loading="eager"` + `fetchpriority="high"`.
- Below-fold: default lazy loading.

## Icons

`astro-icon` + `@iconify-json/tabler`:

```astro
import { Icon } from "astro-icon/components";
<Icon size="24" name="tabler:brand-linkedin" aria-hidden="true" />
```

Pair decorative icons with `aria-hidden="true"`. For icon-only buttons, add an `sr-only` span with descriptive text.

## Theme / dark mode

`ThemeProvider.astro` uses an inline script (no hydration). It reads `localStorage.theme` + `prefers-color-scheme`, sets the `dark` class on `<html>`, and emits a `theme-change` event. Handles View Transitions via `astro:after-swap`.

CSS variables in `src/styles/global.css` (HSL). Light in `:root`, dark in `.dark`. Expressive Code uses `[data-theme="dark"]` (attribute, not class) for code block theming.

## SEO and schema

`BaseHead.astro` handles meta tags, canonical URL (`Astro.url.pathname` + `Astro.site`), OG image fallback (`/social_card.jpg`), and conditional article metadata.

JSON-LD schemas live in dedicated components: `JsonLd.astro`, `BlogPostSchema.astro`, `ResumeSchema.astro`, `BreadcrumbSchema.astro`. All use `set:html` with `JSON.stringify()`. Multiple schemas per page is fine.

## Naming conventions

| Type             | Convention             | Example                        |
| ---------------- | ---------------------- | ------------------------------ |
| Components       | PascalCase             | `PostPreview.astro`            |
| Utilities        | camelCase              | `getFormattedDate()`           |
| CSS classes      | kebab-case             | `sr-only`                      |
| Analytics events | snake_case             | `blog_scroll_depth`            |
| Data attributes  | kebab-case             | `data-astro-prefetch`          |
| Post files       | `YYYY_MM_DD_slug.mdx`  | `2026_05_20_my-post.mdx`       |

## Accessibility

- Skip links on Header and Resume pages (`focus:not-sr-only`).
- External links get `rel="nofollow noopener noreferrer"` automatically via `rehype-external-links`. Add `<span class="sr-only">(opens in new tab)</span>` next to the link text.
- `aria-label` on interactive elements without visible text. `aria-hidden="true"` on decorative icons.

## Analytics

PostHog config in `PostHog.astro`. All analytics utilities in `src/utils/analytics.ts`:

- Check `typeof window !== "undefined"` before calling browser APIs.
- Event names are `snake_case`.
- Identified-only person profiles (cost). DNT respected.

## Automation

A Stop hook (`.claude/hooks/stop-fix-and-check.sh`, wired in `.claude/settings.local.json`) runs **automatically** when the assistant finishes a turn:

1. `bun run lint:fix` — applies Biome auto-fixes.
2. `bun run type-check` — runs `tsc --noEmit`.

If either fails the hook exits 2 and surfaces the error so the assistant must address it before stopping.

**Before declaring a task done**, also run `bun run build` — content schema validation and route generation only fail at build time.

**Fix pre-existing issues you surface, don't just dodge them.** If lint/type-check turns up a problem you didn't introduce, fix it in the same branch as a small `chore:` commit. Exceptions: deep unrelated refactors or a real bug — flag those to the user instead of silently rewriting.

## Quick file-location reference

| What            | Where                                                          |
| --------------- | -------------------------------------------------------------- |
| New page        | `src/pages/<route>.astro`                                      |
| New component   | `src/components/` (or `blog/`, `layout/`)                      |
| New layout      | `src/layouts/`                                                 |
| Blog post       | `src/content/post/YYYY_MM_DD_slug.mdx`                         |
| Resume content  | `src/data/resume.ts` (edit, don't add new files)               |
| Utility         | `src/utils/`                                                   |
| Image asset     | `src/assets/`                                                  |
| Icon            | `astro-icon` + `tabler` (no new files needed)                  |
| Schema/SEO      | `src/components/` (e.g. `MyThingSchema.astro`)                 |
| Site config     | `src/site.config.ts`                                           |
| Content schema  | `src/content.config.ts`                                        |
