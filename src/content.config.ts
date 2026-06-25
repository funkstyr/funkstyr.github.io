import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

function removeDupesAndLowerCase(array: string[]) {
  if (!array.length) return array;
  const lowercaseItems = array.map((str) => str.toLowerCase());
  const distinctItems = new Set(lowercaseItems);
  return Array.from(distinctItems);
}

// A named, multi-part blog series. Posts join a series via `series` +
// reuse their existing `order` field as the part number (1-indexed sequence).
const series = defineCollection({
  loader: glob({ pattern: "**/*.{md,json}", base: "./src/content/series" }),
  schema: z.object({
    // Short label used inline, e.g. "Claude Code Series" -> "… · Part 3".
    title: z.string(),
    // Display heading for the featured-series card.
    heading: z.string(),
    description: z.string(),
  }),
});

const post = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/post" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(60),
      description: z.string().min(10).max(160),
      // Optional free-form subtitle for one-off posts. Series posts derive
      // their "… · Part N" label from `series` + `order` instead.
      subtitle: z.string().max(60).optional(),
      // Series membership. The part number is the post's `order` field.
      series: reference("series").optional(),
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
      // Sort order for posts on the same day (higher = appears first).
      // For series posts this doubles as the part number (1-indexed).
      order: z.number().default(0),
    }),
});

export const collections = { post, series };
