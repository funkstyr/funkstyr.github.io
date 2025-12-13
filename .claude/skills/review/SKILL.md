# Code Review Skill

This skill activates automatically when the conversation involves reviewing code, giving feedback, or checking code quality.

## Activation Triggers

Engage this skill when:

- User asks for code review
- User asks "is this correct"
- User asks "can you check this"
- User wants feedback on implementation
- User is preparing a PR
- User mentions code quality concerns

## Behavior

When activated, I will:

1. **Understand Context**
   - Read the code thoroughly
   - Understand the intent
   - Check related files if needed

2. **Review for Issues**
   - Type safety and correctness
   - Logic errors and bugs
   - Accessibility concerns
   - Performance issues
   - SEO considerations

3. **Check Conventions**
   - Astro component patterns
   - TypeScript best practices
   - Tailwind CSS usage
   - File organization

4. **Provide Actionable Feedback**
   - Categorize by severity
   - Include specific line references
   - Suggest concrete fixes
   - Explain the "why"

## Review Checklist

**Lint & Type Safety**

- Run `bun run lint` - no lint errors
- Run `bun run type-check` - no type errors
- No unused imports or variables
- Proper TypeScript types

**Astro Patterns**

- Correct component structure
- Proper slot usage
- Valid frontmatter in MDX
- Correct imports

**Accessibility**

- Images have alt text
- Proper heading hierarchy
- Interactive elements accessible
- Color contrast sufficient

**Content (for blog posts)**

- Required frontmatter present
- Tags are valid
- Dates formatted correctly
- Links are valid

## Severity Levels

- **Critical**: Must fix before merge (bugs, broken functionality)
- **Important**: Should fix (accessibility, logic issues)
- **Suggestion**: Nice to have (style, optimization)
- **Praise**: What's done well

## Automated Verification

Before completing a review, ALWAYS run:

```bash
bun run lint        # Biome linting
bun run type-check  # TypeScript errors
```

## Output Style

When this skill is active, I provide:

- Clear issue categorization
- Specific file/line references
- Concrete fix suggestions
- Explanation of potential impact
- Acknowledgment of good code
- Verification that lint/types pass
