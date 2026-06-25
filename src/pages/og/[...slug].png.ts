import type { APIRoute, GetStaticPaths } from "astro";

import { resumeData } from "../../data/resume";
import { getAllPosts, getFormattedDate } from "../../utils";
import { renderOgImage } from "../../utils/og";

export const prerender = true;

const NAME = resumeData.contact.name;
const DOMAIN = new URL(import.meta.env.SITE ?? "https://funkstyr.me").host;

type OgProps = {
  title: string;
  eyebrow?: string;
  footer?: string;
};

export const getStaticPaths = (async () => {
  const posts = await getAllPosts();

  const postPaths = posts.map((post) => ({
    params: { slug: `post/${post.id}` },
    props: {
      title: post.data.title,
      eyebrow: "Blog",
      footer: getFormattedDate(post.data.publishDate),
    } satisfies OgProps,
  }));

  const pagePaths: Array<{ params: { slug: string }; props: OgProps }> = [
    {
      params: { slug: "default" },
      props: {
        title: `${NAME} — Senior Software Engineer`,
        footer: "React · TypeScript · full-stack",
      },
    },
    {
      params: { slug: "resume" },
      props: {
        title: NAME,
        eyebrow: "Resume",
        footer: "Senior Software Engineer",
      },
    },
    {
      params: { slug: "contracting" },
      props: {
        title: "Available for contract work",
        eyebrow: "Contracting",
        footer: "TypeScript · React · .NET · Node · Claude",
      },
    },
  ];

  return [...postPaths, ...pagePaths];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { title, eyebrow, footer } = props as OgProps;

  const png = await renderOgImage({
    title,
    eyebrow,
    footer,
    name: NAME,
    domain: DOMAIN,
  });

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
