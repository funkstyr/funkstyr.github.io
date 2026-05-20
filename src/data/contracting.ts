export type ContractingService = {
  title: string;
  description: string;
};

export type ContractingStack = {
  title: string;
  items: string[];
};

export type ContractingCta = {
  label: string;
  href: string;
  /** Optional helper text shown beneath the CTA */
  hint?: string;
  /** Used by analytics to identify which CTA was clicked */
  method: "email" | "linkedin";
};

export type ContractingData = {
  intro: string[];
  services: ContractingService[];
  stack: ContractingStack[];
  ctas: ContractingCta[];
};

export const contractingData: ContractingData = {
  intro: [
    "I'm currently available for contract and consulting work. If you're shipping something in TypeScript, React, .NET, or Node and want another senior pair of hands on it, let's talk.",
    "I tend to do my best work on small teams that own a product end-to-end — the kind of place where the line between frontend, backend, and infra is wherever you stop typing.",
  ],

  services: [
    {
      title: "Full-stack product work",
      description:
        "React and Next.js on the front, .NET Core or Node on the back. Take a feature from spec to production, including the test coverage and observability that lets you sleep through the weekend after a deploy.",
    },
    {
      title: "LLM features with Claude",
      description:
        "Anthropic Claude integration, prompt design, tool use, and evals. I've shipped AI setup wizards and chat-over-data features against the Claude models — happy to help you get past the POC stage.",
    },
    {
      title: "Monorepos & developer experience",
      description:
        "Turborepo setup, OpenAPI codegen, shared component libraries, CI caching, and the kind of test infra that's easier to add up front than to retrofit a year in.",
    },
    {
      title: "Audits & advisory",
      description:
        "Short engagements for architecture review, test strategy, or observability gaps. Useful when you need a second opinion before committing a quarter of engineering time.",
    },
  ],

  stack: [
    {
      title: "Frontend",
      items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Playwright"],
    },
    {
      title: "Backend",
      items: [".NET Core", "Node.js", "Hono", "PostgreSQL", "REST / OpenAPI"],
    },
    {
      title: "Infra & DX",
      items: ["AWS", "Docker", "Turborepo", "GitHub Actions", "Terraform"],
    },
  ],

  ctas: [
    {
      label: "Email me",
      href: "mailto:funk-michael@outlook.com?subject=Contract%20inquiry",
      hint: "funk-michael@outlook.com",
      method: "email",
    },
    {
      label: "Message on LinkedIn",
      href: "https://www.linkedin.com/in/michaelafunk/",
      method: "linkedin",
    },
  ],
};
