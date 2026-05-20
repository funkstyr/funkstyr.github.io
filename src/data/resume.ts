// Resume data types
export type ContactInfo = {
  name: string;
  title: string;
  email: string;
  linkedInUrl: string;
  location: string;
  currentCompany: string;
  currentCompanyUrl: string;
};

export type SocialLink = {
  platform: string;
  url: string;
  username: string;
};

export type WhatIDo = {
  title: string;
  description: string;
};

export type SkillCategory = {
  title: string;
  skills: string[];
};

export type Experience = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location?: string;
  website?: string;
  achievements: string[];
  skills: string[];
  /** If true, this experience will be excluded from the print version */
  excludeFromPrint?: boolean;
};

export type Education = {
  institution: string;
  degree: string;
  minor?: string;
  website?: string;
  logoPath?: string;
};

export type Project = {
  title: string;
  description: string;
  url?: string;
  imagePath?: string;
};

export type ResumeSummary = {
  /** Short version for web "About" section */
  short: string[];
  /** Detailed version for print "Professional Summary" */
  detailed: string;
};

export type ResumeData = {
  contact: ContactInfo;
  summary: ResumeSummary;
  aboutMe: string[];
  whatIDo: WhatIDo[];
  socialLinks: SocialLink[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: SkillCategory[];
};

// Actual resume data
export const resumeData: ResumeData = {
  contact: {
    name: "Michael Funk",
    title: "Senior Software Engineer",
    email: "funk-michael@outlook.com",
    linkedInUrl: "https://www.linkedin.com/in/michaelafunk",
    location: "Sacramento, CA",
    currentCompany: "",
    currentCompanyUrl: "",
  },

  summary: {
    short: [
      "Senior fullstack engineer specializing in React and TypeScript",
      "10+ years across consumer apps, B2B platforms, and AI-powered features",
      "Equally comfortable in .NET Core, Node.js, and modern monorepos",
    ],
    detailed:
      "Fullstack engineer with over a decade of experience, mostly in TypeScript and React on the front and .NET Core or Node on the back. Recent work has been monorepo architecture, LLM-powered features against the Anthropic models, and the less glamorous infrastructure (testing, CI, observability) that keeps small teams shipping without breaking things in production.",
  },

  aboutMe: [
    "Hi, I'm Michael. I've been writing software for about ten years, mostly on small teams where the line between frontend and backend is wherever you stop typing.",
    "Lately that's meant LLM features against the Anthropic models, untangling a couple of apps into a Turborepo monorepo, and the kind of test and observability work that's easier to skip than to come back and add a year later.",
  ],

  whatIDo: [
    {
      title: "Frontend Development",
      description:
        "React and Next.js, mostly. I care about accessibility and tend to write Playwright tests for anything I'd be sad to see break in production.",
    },
    {
      title: "Backend & Infrastructure",
      description:
        ".NET Core and Node, deployed onto AWS via Docker and Kubernetes. Comfortable enough in Terraform to make a change without paging anyone.",
    },
    {
      title: "Developer Experience",
      description:
        "Monorepos, CI pipelines, codegen. The things that compound. If a teammate's iteration loop is slow, that's the bug I want to fix first.",
    },
  ],

  socialLinks: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/michaelafunk/",
      username: "michaelafunk",
    },
    {
      platform: "GitHub",
      url: "https://github.com/funkstyr/",
      username: "funkstyr",
    },
  ],

  experience: [
    {
      company: "Highlight",
      position: "Senior Software Engineer",
      startDate: "June 2022",
      endDate: "May 2026",
      location: "Remote",
      website: "https://www.letshighlight.com/",
      achievements: [
        "Created an AI-assisted setup wizard that turned a short study description or scoping document into a configured project",
        "Built an AI chat that lets researchers ask questions about study results in plain English instead of pivoting CSVs",
        "Migrated three apps into a monorepo, splitting code into feature packages and cutting CI times with caching",
        "Took the consumer app from POC to launch, including onboarding, SMS verification, and the rest of the mobile flow",
        "Shipped an analytics dashboard with cross-tab analysis and CSV export for the market research team",
        "Set up shared API packages with RTK Query hooks and types by running codegen off of an OpenAPI spec for C# APIs",
        "Utilized a shared component library so the consumer, client, and admin applications pulled from the same primitives",
      ],
      skills: [
        "React",
        "Next.js",
        "Monorepo",
        "C#",
        ".Net Core",
        "Docker",
        "Kubernetes",
        "AWS",
      ],
    },
    {
      company: "AVB Marketing",
      position: "Software Engineer",
      startDate: "Mar 2019",
      endDate: "May 2022",
      location: "Remote",
      website: "https://www.avbmarketing.com/",
      achievements: [
        "Migrated the e-commerce storefront (~800 sites) from custom webpack to Next.js for the SEO and TTI wins",
        "Added French localization to two apps so the same codebase could serve our Canadian customers",
        "Integrated the credit-check and payment vendors behind the checkout flow, which facilitated roughly $9M/month",
      ],
      skills: ["React", "Next.js", "Redux", "Docker", "AWS"],
    },
    {
      company: "Intel",
      position: "Software Engineer",
      startDate: "Aug 2018",
      endDate: "Mar 2019",
      location: "Folsom, CA",
      website: "https://www.intel.com/",
      achievements: [
        "Worked on a Django and Angular based test automation suite for NAND memory validation, allowing for quick edits and reruns",
        "Utilize SQLAlchemy for relational model and D3 to display filtered graphs displaying execution trends",
        "Refresh and add documentation to allow for expedited onboarding",
      ],
      skills: ["AngularJS", "Python", "Django", "SQLAlchemy"],
    },
    {
      company: "Stanislaus County - Agricultural Commissioner's Office",
      position: "Software Developer II",
      startDate: "Dec 2016",
      endDate: "June 2018",
      location: "Modesto, CA",
      website: "https://www.stanag.org/",
      achievements: [
        "Built an offline-capable PWA for inspectors doing phytosanitary work on iPads in orchards where signal is unreliable",
        "Wrote a scale-testing app that generated the inspection certificates and invoices the office had been producing by hand",
        "Used Python to produce per-vehicle milage reports from inspector Excel logs for yearly audits",
      ],
      skills: ["React", "Docker", "Python"],
    },
    {
      company: "Mattersight",
      position: "Software Developer",
      startDate: "Feb 2016",
      endDate: "Dec 2016",
      location: "Remote",
      website: "https://www.nice.com/",
      achievements: [
        "Wrote the C# / ZeroMQ adapter that pulled real-time agent and call events out of Aspect for the analytics pipeline",
        "Refactored the audio-vendor integrations behind a factory so adding inContact didn't require a new branch of the code",
        "Built a codegen tool that scaffolded the per-customer project setup that had been eating about a week per client onboarding",
      ],
      skills: ["C#", "ZeroMQ"],
      excludeFromPrint: true,
    },
  ],

  education: [
    {
      institution: "California State University, Stanislaus",
      degree: "BSBA - Accounting",
      minor: "Computer Science",
      website: "https://www.csustan.edu/",
      logoPath: "/src/assets/stan_logo.png",
    },
  ],

  projects: [
    {
      title: "Base",
      description: "Simple bun monorepo.",
      url: "https://github.com/funkstyr/base",
      imagePath: "/src/assets/coming-soon.png",
    },
    {
      title: "POC Sandbox",
      description: "POC for Bun and Turborepo.",
      url: "https://funkstyr.me/bun-mono/",
      imagePath: "/src/assets/coming-soon.png",
    },
  ],

  skills: [
    {
      title: "Languages",
      skills: ["TypeScript", "JavaScript", "C#", "SQL", "Python"],
    },
    {
      title: "AI / LLM",
      skills: [
        "Anthropic Claude models",
        "LLM integration",
        "Prompt engineering",
        "Tool use / function calling",
      ],
    },
    {
      title: "Frontend",
      skills: [
        "React",
        "Next.js",
        "Redux",
        "Tailwind CSS",
        "Storybook",
        "Vitest",
        "Playwright",
        "Testing Library",
      ],
    },
    {
      title: "Backend",
      skills: [
        ".NET Core",
        "Node.js",
        "Hono",
        "REST APIs",
        "GraphQL",
        "OpenAPI/Swagger",
        "PostgreSQL",
      ],
    },
    {
      title: "DevOps",
      skills: [
        "Docker",
        "Kubernetes",
        "AWS",
        "Turborepo",
        "GitHub Actions",
        "Terraform",
        "Nginx",
        "Git",
      ],
    },
  ],
};

// Helper to get social link by platform
export function getSocialLink(platform: string): SocialLink | undefined {
  return resumeData.socialLinks.find(
    (link) => link.platform.toLowerCase() === platform.toLowerCase(),
  );
}

// Helper to get all social URLs for schema.org sameAs
export function getSocialUrls(): string[] {
  return resumeData.socialLinks.map((link) => link.url);
}

// Helper to get all skills as flat array for schema.org knowsAbout
export function getAllSkills(): string[] {
  return resumeData.skills.flatMap((cat) => cat.skills);
}

// ============================================
// ResumeView: target-shaped resume data
// ============================================
//
// Single source of truth for which sections appear, in what order, with what
// filters, on each target (web vs print). Pages iterate `view.sections` and
// render per kind — they do not decide what's included.

export type ResumeTarget = "web" | "print";

export type ResumeSection =
  | { kind: "summary"; title: string; lines: string[] }
  | { kind: "experience"; title: string; experiences: Experience[] }
  | { kind: "education"; title: string; education: Education[] }
  | { kind: "skills"; title: string; categories: SkillCategory[] }
  | { kind: "projects"; title: string; projects: Project[] };

export type ResumeView = {
  contact: ContactInfo;
  sections: ResumeSection[];
};

export function getResumeView(target: ResumeTarget): ResumeView {
  if (target === "print") {
    return {
      contact: resumeData.contact,
      sections: [
        {
          kind: "summary",
          title: "Professional Summary",
          lines: [resumeData.summary.detailed],
        },
        {
          kind: "experience",
          title: "Experience",
          experiences: resumeData.experience.filter((e) => !e.excludeFromPrint),
        },
        { kind: "skills", title: "Skills", categories: resumeData.skills },
        {
          kind: "education",
          title: "Education",
          education: resumeData.education,
        },
      ],
    };
  }
  return {
    contact: resumeData.contact,
    sections: [
      { kind: "summary", title: "About", lines: resumeData.summary.short },
      {
        kind: "experience",
        title: "Experience",
        experiences: resumeData.experience,
      },
      { kind: "skills", title: "Skills", categories: resumeData.skills },
      {
        kind: "education",
        title: "Education",
        education: resumeData.education,
      },
      {
        kind: "projects",
        title: "Projects",
        projects: resumeData.projects,
      },
    ],
  };
}
