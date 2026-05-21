import type { APIRoute } from "astro";
import { contractingData } from "../data/contracting";
import { resumeData } from "../data/resume";
import { getAllPosts, sortMDByDate } from "../utils/post";

export const prerender = true;

function joinUrl(site: URL | undefined, path: string) {
  if (!site) return path;
  return new URL(path.replace(/^\//, ""), site).toString();
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export const GET: APIRoute = async ({ site }) => {
  const {
    contact,
    summary,
    aboutMe,
    whatIDo,
    experience,
    education,
    projects,
    skills,
  } = resumeData;

  const { intro: contractingIntro, services, stack, ctas } = contractingData;

  const posts = sortMDByDate(await getAllPosts());

  const markdown = `# ${contact.name}

> ${contact.title} — fullstack TypeScript/React with .NET and Node, LLM features against Claude, and the monorepo / DX work that keeps small teams shipping.

${site ? `Website: ${site}` : ""}
${site ? `Sitemap: ${joinUrl(site, "/sitemap.xml")}` : ""}
${site ? `RSS: ${joinUrl(site, "/rss.xml")}` : ""}

## About Me

${aboutMe.join("\n\n")}

## What I Do

${whatIDo.map((item) => `### ${item.title}\n${item.description}`).join("\n\n")}

## Available for Contract Work

${contractingIntro.join("\n\n")}

### Services

${services.map((service) => `#### ${service.title}\n${service.description}`).join("\n\n")}

### Stack

${stack.map((group) => `#### ${group.title}\n${group.items.join(", ")}`).join("\n\n")}

### Get in touch

${ctas.map((cta) => `- ${cta.label}: ${cta.href}${cta.hint ? ` (${cta.hint})` : ""}`).join("\n")}

## Professional Summary

${summary.detailed}

## Contact

- Name: ${contact.name}
- Email: ${contact.email}
- LinkedIn: ${contact.linkedInUrl}
- Location: ${contact.location}${contact.currentCompany ? `\n- Current Company: [${contact.currentCompany}](${contact.currentCompanyUrl})` : ""}

## Skills

${skills.map((category) => `### ${category.title}\n${category.skills.join(", ")}`).join("\n\n")}

## Experience

${experience
  .map(
    (exp) => `### ${exp.position} at ${exp.company}
${exp.startDate} - ${exp.endDate}${exp.location ? ` | ${exp.location}` : ""}
${exp.website ? `${exp.website}` : ""}

${exp.achievements.map((achievement) => `- ${achievement}`).join("\n")}

**Skills:** ${exp.skills.join(", ")}`,
  )
  .join("\n\n")}

## Education

${education
  .map(
    (edu) => `### ${edu.institution}
${edu.degree}${edu.minor ? ` | Minor: ${edu.minor}` : ""}
${edu.website ? `${edu.website}` : ""}`,
  )
  .join("\n\n")}

## Projects

${projects
  .filter((project) => project.description)
  .map(
    (project) => `### ${project.title}
${project.description}
${project.url ? `${project.url}` : ""}`,
  )
  .join("\n\n")}

## Blog Posts

${posts
  .map((post) => {
    const url = joinUrl(site, `/blog/${post.id}/`);
    const date = formatDate(post.data.publishDate);
    const tags = post.data.tags.length
      ? `\nTags: ${post.data.tags.join(", ")}`
      : "";
    return `### ${date} — ${post.data.title}
${url}
${post.data.description}${tags}`;
  })
  .join("\n\n")}

---

This file is auto-generated for LLM consumption.
`;

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
