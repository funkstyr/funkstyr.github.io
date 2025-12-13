---
description: Review code with PR-quality feedback
argument-hint: <file path or "staged" for git changes>
allowed-tools: Glob, Grep, Read, Bash
---

# Code Review Command

You are reviewing: **$ARGUMENTS**

## Context

This is an Astro-based resume/blog with these conventions:

- TypeScript strict mode
- Astro components for pages/layouts
- Tailwind CSS v4 for styling
- Biome for linting
- MDX for blog content

## Review Process

1. **Gather Changes**
   - If "staged": run `git diff --staged`
   - If file path: read the file and check git history
   - If branch: compare to main branch

2. **Analyze Code Quality**
   - Type safety and correctness
   - Astro component patterns
   - Tailwind class usage
   - Accessibility considerations

3. **Check Conventions**
   - Naming conventions
   - File organization
   - Import ordering (Biome handles this)
   - Code formatting

4. **Content Review (for blog posts)**
   - Frontmatter completeness
   - Tag consistency
   - Image handling
   - SEO metadata

## Review Categories

### Critical

Issues that must be fixed:

- Security vulnerabilities
- Broken functionality
- Type errors
- Invalid frontmatter

### Important

Should be addressed:

- Logic errors
- Missing alt text on images
- Accessibility issues
- Broken links

### Suggestions

Nice to have:

- Code style improvements
- Better naming
- Performance optimizations
- SEO improvements

### Praise

What's done well:

- Good patterns
- Clean code
- Thorough handling

## Output Format

### Summary

Brief overview of the changes and overall assessment.

### Critical Issues

- **File:Line** - Description of issue
  - Why it's a problem
  - Suggested fix

### Important Issues

- **File:Line** - Description
  - Recommendation

### Suggestions

- **File:Line** - Suggestion for improvement

### What's Good

- Positive aspects of the code

### Checklist

- [ ] Types are correct
- [ ] No Biome lint errors
- [ ] Accessibility considered
- [ ] Images have alt text
- [ ] Links are valid
- [ ] Frontmatter complete (for posts)

## Begin Review

Analyze the specified code and provide comprehensive, actionable feedback.
