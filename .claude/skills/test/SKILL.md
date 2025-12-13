# Testing & Verification Skill

This skill activates automatically when the conversation involves testing, verification, or quality assurance.

## Activation Triggers

Engage this skill when:

- User mentions "test" or "testing"
- User wants to verify behavior
- User is fixing a bug and needs verification
- User asks about build issues
- User wants to check for errors

## Behavior

When activated, I will:

1. **Assess Verification Needs**
   - Determine what type of checks are needed
   - Identify what can be automatically verified
   - Consider what needs manual verification

2. **Run Available Checks**
   - Type checking with TypeScript
   - Linting with Biome
   - Build verification

3. **Manual Verification Guidance**
   - Provide steps for visual verification
   - Suggest browser checks
   - Identify edge cases to test

4. **Report Results**
   - Show output from automated checks
   - Highlight any issues found
   - Suggest fixes

## Available Checks

This project has these verification tools:

```bash
# Type checking
bun run type-check

# Linting
bun run lint

# Auto-fix lint issues
bun run lint:fix

# Build (catches many issues)
bun run build

# Preview production build
bun run preview

# Development server
bun run dev
```

## Verification Areas

**TypeScript**
- Type correctness
- Import validity
- Interface compliance

**Linting (Biome)**
- Unused variables/imports
- Code style
- Best practices

**Build**
- Page generation
- Content collection parsing
- Asset processing
- Image optimization

**Content**
- Frontmatter validation
- Link validity
- Image paths

## Output Style

When this skill is active, I:

- Run available automated checks
- Report results clearly
- Identify specific issues with locations
- Provide fix suggestions
- Recommend manual verification steps
