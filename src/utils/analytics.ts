/**
 * PostHog Analytics Utilities
 * Type-safe wrappers for common tracking events
 *
 * Usage:
 * - Import individual tracking functions where needed
 * - All functions are safe to call even if PostHog is not loaded (no-op)
 */

// Extend Window interface to include posthog
declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
      identify: (
        distinctId: string,
        properties?: Record<string, unknown>,
      ) => void;
      isFeatureEnabled: (key: string) => boolean | undefined;
    };
  }
}

/**
 * Safely capture events (no-op if PostHog not loaded)
 */
export function trackEvent(
  event: string,
  properties?: Record<string, unknown>,
): void {
  if (typeof window !== "undefined" && window.posthog) {
    window.posthog.capture(event, properties);
  }
}

// ============================================
// Resume Page Events
// ============================================

/**
 * Track when someone views the resume page
 */
export function trackResumeView(source?: string): void {
  trackEvent("resume_viewed", {
    source:
      source || (typeof document !== "undefined" ? document.referrer : ""),
  });
}

/**
 * Track when someone initiates printing the resume
 */
export function trackResumePrint(): void {
  trackEvent("resume_print_initiated");
}

/**
 * Track when a specific resume section becomes visible
 */
export function trackResumeSectionView(
  section: string,
  timeToView: number,
): void {
  trackEvent("resume_section_viewed", {
    section,
    time_to_view: timeToView,
  });
}

// ============================================
// Blog Post Events
// ============================================

/**
 * Track when a blog post is viewed
 */
export function trackBlogPostView(
  title: string,
  slug: string,
  tags: string[],
  readingTime: number,
): void {
  trackEvent("blog_post_viewed", {
    title,
    slug,
    tags,
    reading_time: readingTime,
  });
}

/**
 * Track scroll depth milestones (25%, 50%, 75%, 100%)
 */
export function trackBlogScrollDepth(
  depth: 25 | 50 | 75 | 100,
  slug: string,
  timeToReach: number,
): void {
  trackEvent("blog_scroll_depth_reached", {
    depth,
    post_slug: slug,
    time_to_reach: timeToReach,
  });
}

/**
 * Track when a blog post is read to completion
 */
export function trackBlogPostCompleted(
  title: string,
  slug: string,
  timeToComplete: number,
): void {
  trackEvent("blog_post_completed", {
    title,
    slug,
    time_to_complete: timeToComplete,
  });
}

// ============================================
// External Link Events
// ============================================

export type ExternalPlatform =
  | "linkedin"
  | "github"
  | "twitter"
  | "bluesky"
  | "other";

/**
 * Track clicks specifically to professional profiles from resume
 */
export function trackExternalProfileClick(
  platform: "linkedin" | "github",
  url: string,
): void {
  trackEvent("external_profile_clicked", {
    platform,
    url,
  });
}

// ============================================
// Navigation Events
// ============================================

/**
 * Track clicks on the resume link in the header
 */
export function trackResumeNavClick(fromPage: string): void {
  trackEvent("resume_link_clicked", {
    source: "header",
    page: fromPage,
    referrer: typeof document !== "undefined" ? document.referrer : "",
  });
}

/**
 * Track clicks on the print resume link
 */
export function trackResumePrintLinkClick(): void {
  trackEvent("resume_print_link_clicked", {
    source: "profile_header",
    page: typeof window !== "undefined" ? window.location.pathname : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
  });
}

/**
 * Track clicks on header navigation links
 */
export function trackHeaderNavClick(destination: string): void {
  trackEvent("nav_link_clicked", {
    destination,
    page: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/**
 * Track clicks on footer social links
 */
export function trackFooterSocialClick(platform: "linkedin" | "github" | "twitter" | "instagram"): void {
  trackEvent("footer_social_clicked", {
    platform,
    page: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/**
 * Track clicks on blog post navigation (prev/next)
 */
export function trackBlogNavClick(
  direction: "previous" | "next",
  fromSlug: string,
  toSlug: string,
): void {
  trackEvent("blog_nav_clicked", {
    direction,
    from_slug: fromSlug,
    to_slug: toSlug,
  });
}

/**
 * Track clicks on tools page
 */
export function trackToolClick(toolName: string, category: string): void {
  trackEvent("tool_clicked", {
    tool_name: toolName,
    category,
  });
}

// ============================================
// Utility Functions
// ============================================

/**
 * Get the current scroll percentage of the page
 */
export function getScrollPercent(): number {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return 0;
  }
  const h = document.documentElement;
  const b = document.body;
  const scrollTop = h.scrollTop || b.scrollTop;
  const scrollHeight = h.scrollHeight || b.scrollHeight;
  const clientHeight = h.clientHeight;
  return (scrollTop / (scrollHeight - clientHeight)) * 100;
}

/**
 * Detect platform from URL
 */
export function detectPlatformFromUrl(url: string): ExternalPlatform {
  if (url.includes("linkedin.com")) return "linkedin";
  if (url.includes("github.com")) return "github";
  if (url.includes("twitter.com") || url.includes("x.com")) return "twitter";
  if (url.includes("bsky.app") || url.includes("bluesky")) return "bluesky";
  return "other";
}
