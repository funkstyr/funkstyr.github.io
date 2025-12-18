import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

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
