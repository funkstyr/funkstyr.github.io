---
description: Find code, patterns, or implementations in the codebase
argument-hint: <what to find>
allowed-tools: Glob, Grep, Read, Task
---

# Code Discovery Command

You are searching for: **$ARGUMENTS**

## Context

This is an Astro-based resume/blog website. Key locations:

- `src/pages/` - Astro pages and routes
- `src/components/` - Astro and React components
- `src/layouts/` - Page layouts (BaseLayout, BlogPost)
- `src/content/post/` - Blog posts (MDX/Markdown)
- `src/data/` - Data files (resume.ts)
- `src/utils/` - Utility functions
- `src/styles/` - Global CSS and Tailwind

## Search Strategy

1. **Interpret the Query**
   - Understand what the user is looking for
   - Consider synonyms and related terms
   - Think about Astro file naming conventions

2. **Multi-Pronged Search**
   - File patterns (glob for likely locations)
   - Content search (grep for implementations)
   - Type definitions (interfaces, types)
   - Usage examples (imports, component usage)

3. **Rank Results**
   - Primary matches (direct hits)
   - Secondary matches (related code)
   - Examples and usage patterns

4. **Provide Context**
   - Show surrounding code
   - Explain what each match does
   - Link related findings

## Search Patterns

For this Astro project, search these patterns:

**Pages**: `src/pages/**/*.astro`
**Components**: `src/components/**/*.astro`
**Layouts**: `src/layouts/*.astro`
**Blog Posts**: `src/content/post/**/*.{md,mdx}`
**Utilities**: `src/utils/*.ts`
**Data**: `src/data/*.ts`
**Config**: `*.config.{ts,mjs}`, `src/site.config.ts`
**Types**: `src/types.ts`
**Styles**: `src/styles/*.css`

## Output Format

### Search Results

For each relevant result:

**File**: `path/to/file.ts:line`

```typescript
// Relevant code snippet
```

**Context**: Why this is relevant

### Summary

- Total matches found
- Most relevant locations
- Suggested next steps

### Related Searches

- Other queries that might help
- Related patterns to explore

## Begin Search

Search the codebase comprehensively for the requested information.
