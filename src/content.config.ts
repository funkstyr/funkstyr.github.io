import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

function removeDupesAndLowerCase(array: string[]) {
  if (!array.length) return array;
  const lowercaseItems = array.map((str) => str.toLowerCase());
  const distinctItems = new Set(lowercaseItems);
  return Array.from(distinctItems);
}

const post = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/post" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(60),
      description: z.string().min(10).max(160),
      // Optional subtitle for series posts (e.g., "Claude Code Series · Part 1")
      subtitle: z.string().max(60).optional(),
      publishDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      coverImage: z
        .object({
          src: image(),
          alt: z.string(),
        })
        .optional(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]).transform(removeDupesAndLowerCase),
      ogImage: z.string().optional(),
      // Optional sort order for posts on the same day (higher = appears first)
      order: z.number().default(0),
    }),
});

export const collections = { post };
