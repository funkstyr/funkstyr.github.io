# Code Understanding Skill

This skill activates automatically when the conversation involves understanding existing code, explaining patterns, or debugging behavior.

## Activation Triggers

Engage this skill when:

- User asks "what does this do"
- User asks "how does X work"
- User is debugging unexpected behavior
- User wants to understand a pattern
- User references specific files or functions
- User asks about data flow or architecture

## Behavior

When activated, I will:

1. **Read and Analyze**
   - Thoroughly read the relevant code
   - Follow imports and dependencies
   - Trace data flow through the system

2. **Identify Patterns**
   - Recognize Astro-specific patterns
   - Identify component composition
   - Note content collection usage
   - Understand slot and prop patterns

3. **Explain Clearly**
   - Start with high-level overview
   - Drill into specifics as needed
   - Use code examples to illustrate
   - Create mental models for complex flows

4. **Connect the Dots**
   - Show relationships between components
   - Explain how pieces fit together
   - Reference related code in the codebase

## Pattern Recognition

I'm familiar with these project patterns:

**Astro Patterns**

- Content collections for blog posts
- File-based routing in `src/pages/`
- Layouts with slots
- Component composition

**Component Patterns**

- Polymorphic components (Card, Button)
- Spread props pattern
- Named slots for flexibility
- Class merging with `cn()`

**Content Patterns**

- MDX with frontmatter
- Dynamic image imports
- Reading time calculation
- Tag filtering and pagination

**Data Flow**

- Resume data from `src/data/resume.ts`
- Content collection queries
- Props passing through layouts

## Output Style

When this skill is active, I provide:

- Clear explanations at appropriate depth
- Visual diagrams for complex flows
- Code snippets with annotations
- Links to related code
- Practical examples of usage
