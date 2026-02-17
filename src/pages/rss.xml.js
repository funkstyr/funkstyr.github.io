import rss from "@astrojs/rss";
import { resumeData } from "../data/resume";
import { siteConfig } from "../site.config";
import { getAllPosts } from "../utils";

export const GET = async () => {
  const posts = await getAllPosts();
  const site = import.meta.env.SITE;
  const siteUrl = site.endsWith("/") ? site : `${site}/`;
  const { contact } = resumeData;
  const currentYear = new Date().getFullYear();

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
    customData: `
      <language>${siteConfig.lang}</language>
      <copyright>Copyright ${currentYear} ${contact.name}</copyright>
      <managingEditor>${contact.email} (${contact.name})</managingEditor>
      <webMaster>${contact.email} (${contact.name})</webMaster>
      <atom:link href="${siteUrl}rss.xml" rel="self" type="application/rss+xml" />
      <image>
        <url>${siteUrl}avatar.jpg</url>
        <title>${siteConfig.title}</title>
        <link>${siteUrl}</link>
      </image>
    `.trim(),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/blog/${post.id}`,
      categories: post.data.tags,
      author: `${contact.email} (${contact.name})`,
    })),
  });
};
