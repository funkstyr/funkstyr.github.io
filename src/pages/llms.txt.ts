import type { APIRoute } from "astro";
import { resumeData } from "../data/resume";
import { siteConfig } from "../site.config";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
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

  const markdown = `# ${contact.name}

> ${contact.title}

${site ? `Website: ${site}` : ""}

## About Me

${aboutMe.join("\n\n")}

## What I Do

${whatIDo.map((item) => `### ${item.title}\n${item.description}`).join("\n\n")}

## Professional Summary

${summary.detailed}

## Contact

- Name: ${contact.name}
- Email: ${contact.email}
- LinkedIn: ${contact.linkedInUrl}
- Location: ${contact.location}
- Current Company: [${contact.currentCompany}](${contact.currentCompanyUrl})

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

---

This file is auto-generated from ${siteConfig.title} for LLM consumption.
`;

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
