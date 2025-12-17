// Resume data types
export type ContactInfo = {
  name: string;
  title: string;
  email: string;
  linkedIn: string;
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
    title: "Senior Software Engineer | Full Stack Developer",
    email: "funk-michael@outlook.com",
    linkedIn: "michaelafunk",
    linkedInUrl: "https://www.linkedin.com/in/michaelafunk/",
    location: "Sacramento, CA",
    currentCompany: "Highlight",
    currentCompanyUrl: "https://www.letshighlight.com/",
  },

  summary: {
    short: [
      "Fullstack developer that specializes in React",
      "Sometimes dabble in .Net Core",
      "Currently enjoy developing in a bun monorepo",
    ],
    detailed: `Senior Software Engineer with 8+ years of experience building scalable web applications and leading technical initiatives. Expert in React, TypeScript, and modern JavaScript ecosystems with strong full-stack capabilities in .NET Core and cloud infrastructure. Proven track record of architecting monorepo strategies, establishing testing frameworks, and delivering high-impact features from concept to production.`,
  },

  aboutMe: [
    "Hi! I'm Michael, a fullstack developer with a passion for building scalable, user-focused applications. I specialize in React and the modern JavaScript ecosystem, with experience across the full stack.",
    "Currently, I work as a Software Engineer at Highlight, where I build AI-powered features, architect monorepo solutions, and help teams ship code with confidence. I love working in fast-paced environments where quality and velocity go hand-in-hand.",
  ],

  whatIDo: [
    {
      title: "Frontend Development",
      description:
        "Building responsive, accessible user interfaces with React, Next.js, and TypeScript. I focus on creating delightful user experiences backed by solid testing practices.",
    },
    {
      title: "Backend & Infrastructure",
      description:
        "Designing APIs and services with .NET Core, Node.js, and modern cloud platforms. I enjoy working with Docker, Kubernetes, and AWS to build scalable systems.",
    },
    {
      title: "Developer Experience",
      description:
        "Improving workflows through monorepo architecture, CI/CD pipelines, and tooling. I believe great developer experience leads to better products.",
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
    {
      platform: "Twitter",
      url: "https://x.com/funkstyr/",
      username: "funkstyr",
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/_funkstyr/",
      username: "_funkstyr",
    },
  ],

  experience: [
    {
      company: "Highlight",
      position: "Senior Software Engineer II",
      startDate: "June 2022",
      endDate: "Current",
      location: "Remote",
      website: "https://www.letshighlight.com/",
      achievements: [
        "Integrated Anthropic Claude API to build conversational AI assistant for analyzing study results and generating actionable insights",
        "Architected monorepo strategy with Turborepo and pnpm workspaces, enabling atomic cross-package changes across 3+ applications",
        "Led full-stack development of consumer-facing app from POC to production, including onboarding flows, SMS verification, and mobile-optimized experiences",
        "Built analytics dashboard with interactive visualizations, cross-tabulation analysis, and export capabilities for market research teams",
        "Established API package architecture with RTK Query integrations, caching strategies, and Zod schema generation for type safety across the monorepo",
        "Implemented testing and observability infrastructure with Playwright E2E suites, Datadog RUM, and Amplitude analytics",
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
        "Migrated Create React App (CRA) to Next.js for platform serving 800+ e-commerce websites, improving SEO and initial page load performance",
        "Internationalized two React applications for English and French markets, expanding customer reach across North America",
        "Integrated third-party credit verification and payment providers, facilitating $9M+ monthly revenue through checkout systems",
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
        "Developed internal test automation suite for NAND memory validation using Python and Django, improving testing efficiency and coverage",
        "Created comprehensive onboarding documentation for local development environment setup, reducing new developer ramp-up time",
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
        "Built offline-capable Progressive Web Application (PWA) for field phytosanitary inspections on iPads, enabling data collection without network connectivity",
        "Developed web application for scale testing records with automated PDF generation for inspection certifications and invoices",
        "Automated fiscal year reporting with Python scripts to process Excel inspection data and generate vehicle-based reports",
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
        "Developed Aspect telephony interface using C# and ZeroMQ to ingest real-time agent and call events for analytics processing",
        "Implemented factory pattern architecture to integrate multiple audio vendors including inContact, enabling flexible third-party integrations",
        "Built code generation tool to scaffold customer-specific projects, accelerating new client onboarding and reducing setup time",
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
      title: "Loading...",
      description: "",
      imagePath: "/src/assets/coming-soon.png",
    },
  ],

  skills: [
    {
      title: "Languages",
      skills: ["TypeScript", "JavaScript", "C#", "SQL", "Python"],
    },
    {
      title: "Frontend",
      skills: [
        "React",
        "Next.js",
        "Redux",
        "Tailwind CSS",
        "Playwright",
        "Testing Library",
      ],
    },
    {
      title: "Backend",
      skills: [".NET Core", "Node.js", "Hono", "tRPC", "PostgreSQL"],
    },
    {
      title: "DevOps",
      skills: [
        "Docker",
        "Kubernetes",
        "AWS",
        "Turborepo",
        "CI/CD",
        "Nginx",
        "Git",
      ],
    },
  ],
};

// Helper to get skills by category title
export function getSkillsByCategory(title: string): string[] {
  return resumeData.skills.find((cat) => cat.title === title)?.skills ?? [];
}

// Helper to get experience for print (excludes items marked excludeFromPrint)
export function getPrintExperience(): Experience[] {
  return resumeData.experience.filter((exp) => !exp.excludeFromPrint);
}

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
