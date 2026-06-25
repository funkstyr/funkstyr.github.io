import type { CollectionEntry } from "astro:content";
import { getCollection, getEntry } from "astro:content";

export type SeriesContext = {
  /** Short inline label, e.g. "Claude Code Series". */
  label: string;
  /** Display heading for the series. */
  heading: string;
  /** 1-indexed position of the current post within the series. */
  part: number;
  /** Total number of parts in the series. */
  total: number;
  prev: CollectionEntry<"post"> | null;
  next: CollectionEntry<"post"> | null;
  parts: Array<CollectionEntry<"post">>;
};

/** Note: this function filters out draft posts based on the environment */
export async function getAllPosts() {
  return await getCollection("post", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
}

export function sortMDByDate(posts: Array<CollectionEntry<"post">>) {
  return posts.sort((a, b) => {
    const aDate = new Date(a.data.updatedDate ?? a.data.publishDate).valueOf();
    const bDate = new Date(b.data.updatedDate ?? b.data.publishDate).valueOf();
    // If same date, use order field descending (higher order = appears first in the list)
    // This way Part 13 (order:13) appears before Part 12 (order:12) on same day
    if (bDate === aDate) {
      return (b.data.order ?? 0) - (a.data.order ?? 0);
    }
    return bDate - aDate;
  });
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getAllTags(posts: Array<CollectionEntry<"post">>) {
  return posts.flatMap((post) => [...post.data.tags]);
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getUniqueTags(posts: Array<CollectionEntry<"post">>) {
  return [...new Set(getAllTags(posts))];
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getUniqueTagsWithCount(
  posts: Array<CollectionEntry<"post">>,
): Array<[string, number]> {
  return [
    ...getAllTags(posts).reduce(
      (acc, t) => acc.set(t, (acc.get(t) || 0) + 1),
      new Map<string, number>(),
    ),
  ].sort((a, b) => b[1] - a[1]);
}

/** All posts belonging to a series, ordered by part number (the `order` field). */
export function getSeriesPosts(
  posts: Array<CollectionEntry<"post">>,
  seriesId: string,
) {
  return posts
    .filter((p) => p.data.series?.id === seriesId)
    .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}

/**
 * Series context for a post: its part number, siblings, and within-series
 * prev/next. Returns null when the post isn't part of a series.
 */
export async function getSeriesContext(
  posts: Array<CollectionEntry<"post">>,
  post: CollectionEntry<"post">,
): Promise<SeriesContext | null> {
  const ref = post.data.series;
  if (!ref) return null;

  const seriesEntry = await getEntry(ref);
  if (!seriesEntry) return null;

  const parts = getSeriesPosts(posts, ref.id);
  const index = parts.findIndex((p) => p.id === post.id);
  if (index === -1) return null;

  return {
    label: seriesEntry.data.title,
    heading: seriesEntry.data.heading,
    part: index + 1,
    total: parts.length,
    prev: index > 0 ? parts[index - 1] : null,
    next: index < parts.length - 1 ? parts[index + 1] : null,
    parts,
  };
}

/**
 * Posts most related to `post`, scored by shared tags. Excludes the post
 * itself and its series siblings (the series nav already links those), then
 * ranks by shared-tag count, breaking ties by recency.
 */
export function getRelatedPosts(
  posts: Array<CollectionEntry<"post">>,
  post: CollectionEntry<"post">,
  limit = 3,
) {
  const ownTags = new Set(post.data.tags);
  const seriesId = post.data.series?.id;

  const scored = posts
    .filter((p) => p.id !== post.id && p.data.series?.id !== (seriesId ?? null))
    .map((p) => ({
      post: p,
      shared: p.data.tags.filter((tag) => ownTags.has(tag)).length,
      date: new Date(p.data.updatedDate ?? p.data.publishDate).valueOf(),
    }))
    .filter((entry) => entry.shared > 0);

  scored.sort((a, b) => b.shared - a.shared || b.date - a.date);

  return scored.slice(0, limit).map((entry) => entry.post);
}

/** Get the previous and next posts for navigation */
export function getPostNavigation(
  posts: Array<CollectionEntry<"post">>,
  currentId: string,
) {
  const sortedPosts = sortMDByDate([...posts]);
  const currentIndex = sortedPosts.findIndex((p) => p.id === currentId);

  return {
    prev:
      currentIndex < sortedPosts.length - 1
        ? sortedPosts[currentIndex + 1]
        : null,
    next: currentIndex > 0 ? sortedPosts[currentIndex - 1] : null,
  };
}
