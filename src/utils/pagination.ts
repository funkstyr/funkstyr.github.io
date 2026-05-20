import type { Page } from "astro";
import type { PaginationLink } from "../types";

type PaginationLinks = {
  prevUrl?: PaginationLink;
  nextUrl?: PaginationLink;
};

/**
 * Build prev/next props for `Paginator.astro` from an Astro `Page`.
 *
 * `itemNoun` is the plural noun used in the link text, e.g. passing "Posts"
 * yields "← Previous Posts" and "Next Posts →".
 */
export function buildPaginationLinks<T>(
  page: Page<T>,
  itemNoun: string,
): PaginationLinks {
  return {
    ...(page.url.prev && {
      prevUrl: { text: `← Previous ${itemNoun}`, url: page.url.prev },
    }),
    ...(page.url.next && {
      nextUrl: { text: `Next ${itemNoun} →`, url: page.url.next },
    }),
  };
}
