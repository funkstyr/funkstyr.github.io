---
description: Research and plan a feature or solution
argument-hint: <feature or problem to research>
allowed-tools: Glob, Grep, Read, Task, WebSearch, WebFetch
---

# Research & Planning Command

You are researching and planning an implementation for: **$ARGUMENTS**

## Context

This is an Astro-based resume/blog website with:

- **Framework**: Astro 5 with MDX support
- **Styling**: Tailwind CSS v4
- **Content**: Content collections for blog posts
- **Routing**: File-based routing in `src/pages/`
- **Integrations**: sitemap, RSS, expressive-code, astro-icon

## Research Process

### 1. Understand the Request

- Parse the feature/problem description
- Identify key requirements and constraints
- Note any ambiguities to clarify

### 2. Audit What Already Exists

**CRITICAL**: Before designing new features, thoroughly audit existing code:

- Search for similar implementations in the codebase
- Check if infrastructure already exists
- Look for partial implementations or patterns to follow
- Review relevant component structures

### 3. Research External Solutions

For Astro-specific features:

- Check Astro documentation (https://docs.astro.build)
- Look for Astro integrations that solve the problem
- Review community patterns and best practices

### 4. Identify Approach

| Approach             | When to Use                           |
| -------------------- | ------------------------------------- |
| **Existing Pattern** | Similar code exists, extend it        |
| **Astro Feature**    | Built-in Astro capability handles it  |
| **Integration**      | Third-party integration available     |
| **Custom Build**     | Unique requirement, build from scratch|

### 5. Create Implementation Plan

- Break down into discrete tasks
- Order by dependencies
- Identify what already exists vs needs to be built

## Output Format

### Research Summary

Brief description of findings and recommended approach.

### Current State

| Component | Status | Location |
|-----------|--------|----------|
| ... | EXISTS / PARTIAL / MISSING | file path |

### Recommended Approach

Explain the chosen approach and why.

### Implementation Steps

1. Step with file path
2. Step with file path
3. ...

### Considerations

- Trade-offs of this approach
- Alternative approaches considered
- Potential issues to watch for

### Resources

- Relevant documentation links
- Example implementations
- Related Astro features

## Anti-Patterns to Avoid

- **Over-engineering**: Don't add complexity beyond what's needed
- **Ignoring existing code**: Always audit before designing
- **Reinventing the wheel**: Check for Astro integrations first

## Begin Research

1. First, **audit the codebase** for existing implementations
2. Research Astro documentation for built-in solutions
3. Define the approach that best fits the requirement
4. Create a clear implementation plan

Remember: **The simplest solution that works is usually the best.**
