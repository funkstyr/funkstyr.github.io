import {
  detectPlatformFromUrl,
  trackBlogNavClick,
  trackBlogPostCompleted,
  trackBlogPostView,
  trackBlogScrollDepth,
  trackEvent,
} from "../analytics";
import { trackLinkClicks } from "./linkClicks";
import { observeScrollDepth } from "./scrollDepth";
import { observeVisibility } from "./visibility";

type PostMetadata = {
  title: string;
  slug: string;
  tags: string[];
  readingTime: number;
};

function readPostMetadata(): PostMetadata | null {
  const data = document.getElementById("post-data");
  if (!data) return null;
  let tags: string[] = [];
  try {
    tags = JSON.parse(data.dataset.tags ?? "[]");
  } catch {
    tags = [];
  }
  const readingTimeStr = data.dataset.readingTime ?? "0";
  const readingTime = parseInt(readingTimeStr.split(" ")[0] ?? "0", 10) || 0;
  return {
    title: data.dataset.title ?? "",
    slug: data.dataset.slug ?? "",
    tags,
    readingTime,
  };
}

export function bootBlogReading(): void {
  const post = readPostMetadata();
  if (!post) return;

  trackBlogPostView(post.title, post.slug, post.tags, post.readingTime);

  observeScrollDepth({
    onMilestone: (depth, elapsedMs) => {
      trackBlogScrollDepth(
        depth as 25 | 50 | 75 | 100,
        post.slug,
        Math.round(elapsedMs / 1000),
      );
    },
  });

  // Completion fires when the comments mount enters the viewport. Use the
  // mount div (always present) rather than `.giscus`, which only appears
  // after the deferred script injects the iframe.
  const comments = document.getElementById("giscus-mount");
  if (comments) {
    observeVisibility({
      target: comments,
      threshold: 0.1,
      once: true,
      onVisible: (elapsedMs) => {
        trackBlogPostCompleted(
          post.title,
          post.slug,
          Math.round(elapsedMs / 1000),
        );
      },
    });
  }

  const article = document.querySelector("article");
  if (article) {
    trackLinkClicks({
      root: article,
      filter: (href) =>
        href.startsWith("http") && !href.includes("funkstyr.me"),
      onClick: ({ href }) => {
        trackEvent("blog_external_link_clicked", {
          platform: detectPlatformFromUrl(href),
          url: href,
          post_slug: post.slug,
        });
      },
    });
  }

  const toc = document.querySelector<HTMLElement>(
    'nav[aria-label="Table of Contents"]',
  );
  if (toc) {
    trackLinkClicks({
      root: toc,
      onClick: ({ el }) => {
        trackEvent("toc_link_clicked", {
          heading: el.textContent,
          post_slug: post.slug,
        });
      },
    });
  }

  document
    .querySelectorAll<HTMLElement>("[data-track-blog-nav]")
    .forEach((link) => {
      link.addEventListener("click", () => {
        const direction = link.dataset.trackBlogNav as
          | "previous"
          | "next"
          | undefined;
        const toSlug = link.dataset.toSlug;
        if (direction && toSlug) {
          trackBlogNavClick(direction, post.slug, toSlug);
        }
      });
    });

  window.addEventListener("beforeprint", () => {
    trackEvent("blog_post_printed", { post_slug: post.slug });
  });
}
