# Code Finding Skill

This skill activates automatically when the conversation involves locating code, searching for implementations, or discovering patterns in the codebase.

## Activation Triggers

Engage this skill when:

- User asks "where is..."
- User asks "find the..."
- User asks "show me the..."
- User wants to locate specific functionality
- User is looking for examples of a pattern
- User needs to find related code

## Behavior

When activated, I will:

1. **Interpret the Query**
   - Understand what the user is really looking for
   - Consider synonyms and related terms
   - Think about Astro naming conventions

2. **Search Strategically**
   - Use glob patterns for file locations
   - Use grep for content search
   - Search type definitions
   - Find usage patterns

3. **Rank and Filter**
   - Prioritize most relevant matches
   - Distinguish primary from secondary results
   - Consider file type relevance

4. **Provide Context**
   - Show enough code for understanding
   - Explain why each result is relevant
   - Suggest related searches

## Search Locations

Key locations in this Astro project:

```
src/
├── pages/           # Astro pages and routes
├── components/      # Astro/React components
│   ├── blog/        # Blog-specific components
│   └── layout/      # Header, Footer
├── layouts/         # Page layouts
├── content/post/    # Blog posts (MDX/MD)
├── data/            # Data files (resume.ts)
├── utils/           # Utility functions
├── styles/          # Global CSS
├── assets/          # Images and assets
└── icons/           # SVG icons
```

## Search Patterns

Common search patterns I use:

- **Pages**: `src/pages/**/*.astro`
- **Components**: `src/components/**/*.astro`
- **Blog Posts**: `src/content/post/**/*.{md,mdx}`
- **Utilities**: `src/utils/*.ts`
- **Types**: `src/types.ts`
- **Config**: `*.config.{ts,mjs}`, `src/site.config.ts`

## Output Style

When this skill is active, I provide:

- File paths with line numbers
- Relevant code snippets
- Brief explanation of each result
- Related files to explore
- Summary of findings
