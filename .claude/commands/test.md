---
description: Create, run, or improve tests
argument-hint: <file, function, or component to test>
allowed-tools: Glob, Grep, Read, Write, Edit, Bash
---

# Testing Workflow Command

You are testing: **$ARGUMENTS**

## Context

This Astro project currently has:

- **Type Checking**: `bun run type-check` (TypeScript)
- **Linting**: `bun run lint` (Biome)
- **Build Verification**: `bun run build`

No test framework is currently configured. If tests are needed, consider adding Vitest.

## Verification Process

1. **Analyze Target**
   - Read the code to be verified
   - Identify functions, components, or behaviors
   - Understand dependencies

2. **Run Available Checks**
   - Type check: `bun run type-check`
   - Lint: `bun run lint`
   - Build: `bun run build`

3. **Manual Verification**
   - Start dev server: `bun run dev`
   - Check the page/component visually
   - Test interactions in browser

4. **Content Verification (for blog posts)**
   - Verify frontmatter is valid
   - Check that images load correctly
   - Verify links work
   - Check RSS feed includes post

## Adding Tests (If Needed)

To add Vitest to this project:

```bash
bun add -d vitest @testing-library/dom happy-dom
```

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
  },
})
```

Add to `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

## Test Patterns (for future)

### Utility Function Test

```typescript
import { describe, it, expect } from 'vitest'
import { getFormattedDate } from '../src/utils/date'

describe('getFormattedDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2025-01-15')
    expect(getFormattedDate(date)).toBe('Jan 15, 2025')
  })
})
```

### Component Test (if needed)

```typescript
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/dom'

describe('Component', () => {
  it('renders correctly', () => {
    // Astro components require special handling
    // Consider testing utilities and logic separately
  })
})
```

## Current Commands

```bash
# Type checking
bun run type-check

# Linting
bun run lint

# Fix lint issues
bun run lint:fix

# Build (catches many issues)
bun run build

# Preview production build
bun run preview
```

## Output

After running verification:

1. Show results of each check
2. Report any errors or warnings
3. Suggest fixes for issues found
4. Recommend additional verification steps

## Begin Verification

Run available checks on the target code and report results.
