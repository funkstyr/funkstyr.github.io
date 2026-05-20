import type { APIRoute } from "astro";
import { getAllPosts, getUniqueTags } from "../utils/post";

export const prerender = true;

type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: ChangeFreq;
  priority?: number;
};

const PAGE_SIZE = 10;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function joinUrl(site: URL, path: string) {
  return new URL(path.replace(/^\//, ""), site).toString();
}

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    return new Response("Site URL not configured", { status: 500 });
  }

  const now = new Date().toISOString();
  const posts = await getAllPosts();
  const tags = getUniqueTags(posts);

  const entries: SitemapEntry[] = [
    {
      loc: joinUrl(site, "/"),
      lastmod: now,
      changefreq: "weekly",
      priority: 1.0,
    },
    {
      loc: joinUrl(site, "/blog/"),
      lastmod: now,
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      loc: joinUrl(site, "/tags/"),
      lastmod: now,
      changefreq: "weekly",
      priority: 0.6,
    },
    {
      loc: joinUrl(site, "/tools/"),
      lastmod: now,
      changefreq: "monthly",
      priority: 0.6,
    },
    {
      loc: joinUrl(site, "/resume/"),
      lastmod: now,
      changefreq: "monthly",
      priority: 0.8,
    },
  ];

  for (const post of posts) {
    const lastmod = new Date(
      post.data.updatedDate ?? post.data.publishDate,
    ).toISOString();
    entries.push({
      loc: joinUrl(site, `/blog/${post.id}/`),
      lastmod,
      changefreq: "monthly",
      priority: 0.7,
    });
  }

  const blogPages = Math.ceil(posts.length / PAGE_SIZE);
  for (let page = 2; page <= blogPages; page++) {
    entries.push({
      loc: joinUrl(site, `/blog/${page}/`),
      lastmod: now,
      changefreq: "weekly",
      priority: 0.5,
    });
  }

  for (const tag of tags) {
    const tagPosts = posts.filter((post) => post.data.tags.includes(tag));
    const tagPages = Math.ceil(tagPosts.length / PAGE_SIZE);
    entries.push({
      loc: joinUrl(site, `/tags/${tag}/`),
      lastmod: now,
      changefreq: "weekly",
      priority: 0.5,
    });
    for (let page = 2; page <= tagPages; page++) {
      entries.push({
        loc: joinUrl(site, `/tags/${tag}/${page}/`),
        lastmod: now,
        changefreq: "weekly",
        priority: 0.4,
      });
    }
  }

  const urlsXml = entries
    .map((entry) => {
      const parts = [`    <loc>${escapeXml(entry.loc)}</loc>`];
      if (entry.lastmod) parts.push(`    <lastmod>${entry.lastmod}</lastmod>`);
      if (entry.changefreq)
        parts.push(`    <changefreq>${entry.changefreq}</changefreq>`);
      if (entry.priority !== undefined)
        parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
      return `  <url>\n${parts.join("\n")}\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
