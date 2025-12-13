# Content & Blog Skill

This skill activates when working with blog posts, content collections, or MDX content.

## Activation Triggers

Engage this skill when:

- User wants to create a new blog post
- User asks about content collections
- User mentions MDX or frontmatter
- User wants to add/edit tags
- User asks about RSS feed
- User mentions blog formatting or styling

## Behavior

When activated, I will:

1. **Understand Content Requirements**
   - Determine if it's a new post or edit
   - Identify required frontmatter fields
   - Consider tags and categorization

2. **Follow Content Patterns**
   - Use correct file naming convention
   - Include all required frontmatter
   - Apply consistent formatting

3. **Validate Content**
   - Check frontmatter completeness
   - Verify tag consistency
   - Ensure images are properly referenced

## Content Collection Schema

Blog posts are in `src/content/post/` and require this frontmatter:

```yaml
---
title: "Post Title"           # Required
description: "Brief summary"  # Required
publishDate: "2025-01-15"     # Required (YYYY-MM-DD)
updatedDate: "2025-01-16"     # Optional
tags: ["tag1", "tag2"]        # Optional
coverImage:                   # Optional
  src: "./cover.png"
  alt: "Cover image alt text"
ogImage: "/og-image.png"      # Optional (for social sharing)
draft: true                   # Optional (hides from production)
---
```

## File Naming Convention

Posts follow this naming pattern:
```
YYYY_MM_DD_post-slug.mdx
```

Examples:
- `2025_01_15_my-new-post.mdx`
- `2025_12_07_plan-based-dev-commands.mdx`

## Post Structure

```mdx
---
title: "Post Title"
description: "A brief description for SEO and previews"
publishDate: "2025-01-15"
tags: ["astro", "tutorial"]
---

Introduction paragraph...

## First Section

Content with **bold** and *italic* text.

### Subsection

More content...

## Code Examples

\`\`\`typescript
// Code block with syntax highlighting
const example = "hello";
\`\`\`

## Conclusion

Final thoughts...
```

## Images in Posts

For cover images or inline images:

```mdx
---
coverImage:
  src: "./cover.png"  # Relative to post file
  alt: "Descriptive alt text"
---

<!-- Inline image -->
![Alt text](./image.png)
```

Images should be placed:
- In the same directory as the post (for post-specific images)
- In `src/assets/` (for shared images)

## Existing Tags

Check existing posts for consistent tag usage. Common tags include:
- Technology names (astro, typescript, react)
- Content types (tutorial, guide, announcement)
- Series names (plan-based-dev)

## Draft Posts

Set `draft: true` in frontmatter to hide a post from production:

```yaml
---
title: "Work in Progress"
draft: true
---
```

Draft posts are filtered out by `getAllPosts()` in `src/utils/post.ts`.

## Key Files

- `src/content/config.ts` - Content collection schema
- `src/utils/post.ts` - Post utilities (getAllPosts, sorting)
- `src/pages/blog/[slug].astro` - Individual post page
- `src/pages/blog/[...page].astro` - Blog listing with pagination
- `src/pages/rss.xml.js` - RSS feed generation

## Output Style

When this skill is active, I:

- Generate properly formatted frontmatter
- Follow file naming conventions
- Use consistent tags
- Include proper image handling
- Validate against the content schema
