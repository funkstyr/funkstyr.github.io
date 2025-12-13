# Type Safety Skill

This skill activates when reviewing code for type safety, fixing type errors, or implementing type-safe patterns.

## Activation Triggers

Engage this skill when:

- User asks about "type safety" or "type errors"
- User is dealing with type errors or type mismatches
- User asks about TypeScript patterns
- Code review involves type issues
- User asks about proper typing for Astro components

## Core Principles

1. **Use proper TypeScript types** - Avoid `any`
2. **Leverage Astro's type system** - Use provided types
3. **Type component props correctly** - Extend HTMLAttributes when needed
4. **Use strict mode** - Project has strict TypeScript enabled

## Astro Type Patterns

### Component Props

```typescript
---
import type { HTMLAttributes } from "astro/types";

interface Props extends HTMLAttributes<"div"> {
  title: string;
  description?: string;
}

const { title, description, ...rest } = Astro.props;
---
```

### Polymorphic Components

```typescript
---
import type { HTMLTag, Polymorphic } from "astro/types";

type Props<Tag extends HTMLTag> = Polymorphic<{ as: Tag }> & {
  title: string;
};

const { as: Tag = "div", title, ...rest } = Astro.props;
---
```

### Content Collection Types

```typescript
import type { CollectionEntry } from "astro:content";

interface Props {
  post: CollectionEntry<"post">;
}
```

### Image Types

```typescript
import type { ImageMetadata } from "astro";

interface Props {
  image: ImageMetadata;
}
```

## Anti-Patterns to Flag

### Using `any`

```typescript
// BAD
const data: any = fetchData();

// GOOD
interface Data { /* ... */ }
const data: Data = fetchData();
```

### Missing Props Types

```typescript
// BAD
const { title } = Astro.props;

// GOOD
interface Props {
  title: string;
}
const { title } = Astro.props;
```

### Ignoring Optional Properties

```typescript
// BAD - may be undefined
const { data } = Astro.props;
console.log(data.value);

// GOOD - handle undefined
const { data } = Astro.props;
if (data) {
  console.log(data.value);
}
```

## Type Checking

Run type checking with:

```bash
bun run type-check
```

This runs `tsc --noEmit` to check types without emitting files.

## Output Style

When this skill is active, I:

- Identify unsafe type patterns and explain why they're problematic
- Provide type-safe alternatives with complete examples
- Reference Astro's built-in types
- Explain the runtime behavior difference
