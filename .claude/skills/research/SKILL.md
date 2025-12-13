# Research & Planning Skill

This skill activates automatically when the conversation involves planning new features, discussing architecture, or exploring implementation approaches.

## Activation Triggers

Engage this skill when:

- User asks "how should we implement..."
- User discusses new feature requirements
- User asks about architecture decisions
- User wants to plan before coding
- User mentions "design", "plan", "approach", or "strategy"

## Behavior

When activated, I will:

1. **Gather Context**
   - Understand the full scope of the request
   - Identify related existing code patterns
   - Consider the Astro project architecture

2. **Research Existing Patterns**
   - Search for similar implementations
   - Review Astro component patterns
   - Check content collection patterns
   - Look at utility function patterns

3. **Analyze Trade-offs**
   - Consider multiple approaches
   - Evaluate complexity vs. maintainability
   - Think about performance implications
   - Consider SEO and accessibility

4. **Create Structured Plan**
   - Break into discrete tasks
   - Identify dependencies
   - Suggest implementation order
   - Note potential risks

## Project Context

- **Framework**: Astro 5 with MDX
- **Styling**: Tailwind CSS v4
- **Content**: Content collections for blog
- **Routing**: File-based in `src/pages/`
- **Components**: Astro components with polymorphic patterns
- **Data**: Resume data in `src/data/resume.ts`

## Output Style

When this skill is active, I provide:

- Clear problem analysis
- Multiple solution options when relevant
- Recommended approach with justification
- Step-by-step implementation plan
- File locations and impacts
