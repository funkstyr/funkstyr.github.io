---
description: Generate code following repo patterns
argument-hint: <description of what to create>
allowed-tools: Glob, Grep, Read, Write, Edit, Bash
---

# Code Generation Command

You are creating: **$ARGUMENTS**

## Context

This Astro project follows specific patterns:

### Pages & Routing

- File-based routing in `src/pages/`
- Dynamic routes use `[param]` or `[...param]` syntax
- Blog posts: `/blog/[slug]` with pagination at `/blog/[...page]`
- Tags: `/tags/[tag]/[...page]`

### Components

- Astro components in `src/components/`
- Blog-specific components in `src/components/blog/`
- Layout components in `src/components/layout/`
- Use polymorphic pattern for flexible components

### Content

- Blog posts in `src/content/post/` as MDX or Markdown
- Content schema defined in `src/content/config.ts`
- Required frontmatter: `title`, `description`, `publishDate`
- Optional: `updatedDate`, `coverImage`, `tags`, `ogImage`, `draft`

### Styling

- Tailwind CSS v4 via Vite plugin
- CSS variables in `src/styles/global.css`
- Use `cn()` from `src/utils/tailwind.ts` for class merging
- Theme uses `data-theme` attribute for dark mode

## Generation Process

1. **Understand Requirements**
   - Parse what needs to be created
   - Identify the type (page, component, post, utility)
   - Determine which patterns apply

2. **Find Patterns**
   - Search for similar existing code
   - Extract patterns to follow
   - Note naming conventions

3. **Plan Structure**
   - Determine file locations
   - Plan imports and exports
   - Consider dependencies

4. **Generate Code**
   - Follow existing patterns exactly
   - Include proper TypeScript types
   - Add necessary imports

5. **Verify**
   - Run type checking: `bun run type-check`
   - Run linting: `bun run lint`

## Code Patterns

### Astro Page

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import { siteConfig } from "@/site.config";

const meta = {
  title: "Page Title",
  description: "Page description",
};
---

<BaseLayout meta={meta}>
  <main id="content">
    <!-- Page content -->
  </main>
</BaseLayout>
```

### Astro Component

```astro
---
import type { HTMLAttributes } from "astro/types";
import { cn } from "@/utils/tailwind";

interface Props extends HTMLAttributes<"div"> {
  title: string;
  class?: string;
}

const { title, class: className, ...rest } = Astro.props;
---

<div class={cn("base-styles", className)} {...rest}>
  <h2>{title}</h2>
  <slot />
</div>
```

### Polymorphic Component

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

### Blog Post (MDX)

```mdx
---
title: "Post Title"
description: "A brief description of the post"
publishDate: "2025-01-15"
tags: ["tag1", "tag2"]
---

Post content here...
```

### Utility Function

```typescript
export function myUtility(input: string): string {
  // Implementation
  return result;
}
```

## File Locations

- Pages: `src/pages/`
- Components: `src/components/`
- Layouts: `src/layouts/`
- Blog Posts: `src/content/post/`
- Utilities: `src/utils/`
- Data: `src/data/`
- Types: `src/types.ts`

## Output

1. Show the generated code
2. Explain key decisions
3. List files created/modified
4. Provide next steps (run commands, update config, etc.)

## Begin Generation

Analyze the request, find relevant patterns, and generate production-quality code.
