import rss from "@astrojs/rss";

import { siteConfig } from "../site.config";
import { getAllPosts } from "../utils";

export const GET = async () => {
  const posts = await getAllPosts();

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/blog/${post.slug}`,
      categories: post.data.tags,
      author: "funk-michael@outlook.com (Michael Funk)",
    })),
  });
};
