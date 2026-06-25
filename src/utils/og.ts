import { readFileSync } from "node:fs";
import { join } from "node:path";

import satori from "satori";
import sharp from "sharp";

// Brand font bundled locally (src/assets/fonts) so OG generation has no
// build-time network dependency. Matches the site's Satoshi typeface.
// Resolved from the project root because this module gets bundled into
// dist/.prerender during build, where import.meta.url no longer points at src.
const fontDir = join(process.cwd(), "src/assets/fonts");
const fontMedium = readFileSync(join(fontDir, "Satoshi-Medium.ttf"));
const fontBold = readFileSync(join(fontDir, "Satoshi-Bold.ttf"));

export type OgImageOptions = {
  // Large headline — the post/page title.
  title: string;
  // Small uppercase label above the title (e.g. "Blog", "Resume").
  eyebrow?: string;
  // Muted line under the title (e.g. "Dec 8, 2025 · 6 min read").
  footer?: string;
  // Author name shown in the bottom branding row.
  name: string;
  // Site domain shown opposite the name (e.g. "funkstyr.me").
  domain: string;
};

const WIDTH = 1200;
const HEIGHT = 630;

const BG = "#0f172a";
const FG = "#f1f5f9";
const MUTED = "#94a3b8";
const ACCENT = "#38bdf8";

// satori accepts a plain { type, props } VDOM tree, so we avoid JSX/tsx here.
type Node = { type: string; props: Record<string, unknown> };

function el(
  type: string,
  style: Record<string, unknown>,
  children?: Node[] | string,
): Node {
  return { type, props: { style, children } };
}

function buildTree(opts: OgImageOptions): Node {
  const body: Node[] = [];

  if (opts.eyebrow) {
    body.push(
      el(
        "div",
        {
          color: ACCENT,
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: "uppercase",
        },
        opts.eyebrow,
      ),
    );
  }

  body.push(el("div", { flexGrow: 1, display: "flex" }));

  body.push(
    el(
      "div",
      {
        color: FG,
        fontSize: 68,
        fontWeight: 700,
        lineHeight: 1.1,
        // Cap to three lines so long titles never overflow the card.
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": 3,
        overflow: "hidden",
      },
      opts.title,
    ),
  );

  if (opts.footer) {
    body.push(
      el(
        "div",
        { color: MUTED, fontSize: 28, fontWeight: 500, marginTop: 24 },
        opts.footer,
      ),
    );
  }

  body.push(
    el(
      "div",
      {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 48,
        paddingTop: 32,
        borderTop: `1px solid #1e293b`,
      },
      [
        el("div", { color: FG, fontSize: 30, fontWeight: 700 }, opts.name),
        el("div", { color: MUTED, fontSize: 28, fontWeight: 500 }, opts.domain),
      ],
    ),
  );

  return el(
    "div",
    {
      width: WIDTH,
      height: HEIGHT,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      padding: 72,
      backgroundColor: BG,
      backgroundImage: `radial-gradient(circle at 100% 0%, rgba(56,189,248,0.16), transparent 55%)`,
      fontFamily: "Satoshi",
    },
    body,
  );
}

// Maps a page pathname to the slug of its prebuilt OG card. Shared between
// BaseHead (which references the card) and the /og endpoint (which builds the
// matching set) so the two can't drift. Blog posts are handled separately in
// BlogPost.astro via `/og/post/<id>.png`.
export function ogSlugForPathname(pathname: string): string {
  const path = pathname.replace(/\/+$/, "");

  if (path === "/resume" || path === "/resume/print") return "resume";
  if (path === "/contracting") return "contracting";

  return "default";
}

export function ogImagePath(slug: string): string {
  return `/og/${slug}.png`;
}

export async function renderOgImage(opts: OgImageOptions): Promise<Buffer> {
  const svg = await satori(buildTree(opts) as unknown as never, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: "Satoshi", data: fontMedium, weight: 500, style: "normal" },
      { name: "Satoshi", data: fontBold, weight: 700, style: "normal" },
    ],
  });

  return sharp(Buffer.from(svg)).png().toBuffer();
}
