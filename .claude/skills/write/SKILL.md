# Code Writing Skill

This skill activates automatically when the conversation involves generating new code, implementing features, or creating components.

## Activation Triggers

Engage this skill when:

- User asks to "create", "add", or "implement"
- User needs new functionality
- User describes a feature to build
- User asks for code generation
- User wants to add a new component/page/post

## Behavior

When activated, I will:

1. **Understand Requirements**
   - Clarify what needs to be built
   - Identify the type of code needed
   - Determine scope and boundaries

2. **Research Patterns**
   - Find similar code in the repo
   - Extract patterns to follow
   - Note naming conventions

3. **Plan Structure**
   - Determine file locations
   - Plan imports and exports
   - Consider dependencies

4. **Write Production Code**
   - Follow existing patterns exactly
   - Include proper TypeScript types
   - Handle edge cases appropriately
   - Add necessary imports

5. **Verify Quality**
   - Run `bun run lint` to catch lint errors
   - Run `bun run type-check` to verify TypeScript
   - Ensure it integrates properly

## Code Patterns

**Astro Page**

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";

const meta = {
  title: "Page Title",
  description: "Page description",
};
---

<BaseLayout meta={meta}>
  <main id="content">
    <!-- Content -->
  </main>
</BaseLayout>
```

**Astro Component**

```astro
---
import type { HTMLAttributes } from "astro/types";
import { cn } from "@/utils/tailwind";

interface Props extends HTMLAttributes<"div"> {
  title: string;
}

const { title, class: className, ...rest } = Astro.props;
---

<div class={cn("base-styles", className)} {...rest}>
  <h2>{title}</h2>
  <slot />
</div>
```

**Polymorphic Component**

```astro
---
import type { HTMLTag, Polymorphic } from "astro/types";
import { cn } from "@/utils/tailwind";

type Props<Tag extends HTMLTag> = Polymorphic<{ as: Tag }> & {
  class?: string;
};

const { as: Tag = "div", class: className, ...rest } = Astro.props;
---

<Tag class={cn("styles", className)} {...rest}>
  <slot />
</Tag>
```

**Blog Post (MDX)**

```mdx
---
title: "Post Title"
description: "Brief description"
publishDate: "2025-01-15"
tags: ["tag1", "tag2"]
---

Content here...
```

**Utility Function**

```typescript
export function myUtility(input: string): string {
  // Implementation
  return result;
}
```

## File Locations

- Pages: `src/pages/`
- Components: `src/components/`
- Blog components: `src/components/blog/`
- Layout components: `src/components/layout/`
- Layouts: `src/layouts/`
- Blog Posts: `src/content/post/`
- Utilities: `src/utils/`
- Data: `src/data/`
- Types: `src/types.ts`
- Assets: `src/assets/`
- Icons: `src/icons/`

## Post-Change Checklist

After writing code, ALWAYS:

1. Run `bun run lint` - catches unused vars/imports
2. Run `bun run type-check` - catches type errors
3. Fix any issues before considering the task complete

## Output Style

When this skill is active, I:

- Generate complete, working code
- Follow repo patterns exactly
- Include all necessary imports
- Handle edge cases appropriately
- Explain key decisions
- Run verification checks after changes
- Provide next steps
