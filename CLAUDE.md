# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page personal portfolio for Daffa Albari (AI Engineer), plus project/
research case-study pages (`/work/[slug]`), dynamic blog detail pages, an AI
chatbot, and a **Keystatic CMS** at `/keystatic` for editing projects and blog
posts without touching code. Next.js 16 App Router · React 19 · TypeScript
(strict) · Tailwind CSS v4. The React Compiler is enabled (`reactCompiler: true`
in `next.config.ts`).

## Commands

```bash
npm run dev      # dev server (http://localhost:3000)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint (eslint-config-next)
npx tsc --noEmit # type-check only (tsconfig has noEmit: true)
```

No test framework is configured — there are no tests or test scripts. Verify
changes by running `dev`/`build` and driving the UI.

Path alias: `@/*` → `./src/*`.

## Environment

`src/app/api/chat/route.ts` reads:
- `OPENROUTER_API_KEY` — **required** for the chatbot to work
- `MODEL_NAME` — optional, defaults to `openai/gpt-4o-mini`

The Keystatic CMS uses GitHub mode in production and needs
`KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`,
`KEYSTATIC_SECRET`, `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` (see `.env.example`).
In development it uses local mode and needs none of these.

## Architecture — the parts that span multiple files

**Content lives in two places.** `src/lib/data.ts` holds the *static* profile
content — `personalInfo`, `experiences`, `achievements`, `skills`, `education`,
nav/social links — imported by the section components and by the chatbot route.
**Projects/research and blog posts live in the Keystatic CMS** (`src/content/`),
NOT in `data.ts`. Do not re-add a `projects` array or blog posts to `data.ts`.

**The Keystatic CMS is the source of truth for projects and posts.**
`keystatic.config.ts` (root) defines two collections stored as `.mdoc` files:
`projects` → `src/content/projects/*` and `posts` → `src/content/posts/*`. The
public site reads committed files via `src/lib/content.ts` (`createReader`);
`src/lib/projects.ts` and `src/lib/posts.ts` wrap it with typed accessors, and
`src/lib/markdoc.tsx` renders Markdoc bodies into the `.prose` styles. Admin UI
is at `/keystatic` (local storage in dev, GitHub mode in prod). Because the
reader hits the filesystem, routes that read at *request* time
(`/api/chat`, and the dynamic slug routes) list `src/content/**` under
`outputFileTracingIncludes` in `next.config.ts` so the files ship to Vercel.

**The homepage is a server component that feeds a client shell.**
`src/app/page.tsx` is `async`, reads projects + CMS posts on the server, and
passes them to `src/components/HomeClient.tsx` (`"use client"`), which holds the
command-palette/chatbot state and composes the sections (`Hero → About →
Experience → Projects → Achievements → Blog → Contact`) inside `SmoothScroll`.
The `Projects` and `Blog` sections take their data as props. Sections live in
`src/components/sections/`.

**Project detail = case-study pages at `/work/[slug]`.** `src/app/work/[slug]/`
statically generates a page per project from the CMS, rendered by
`src/components/CaseStudy.tsx` (masthead, meta rule, hero plate, Markdoc
narrative, metric band, recognition, links, next-case). The old click-to-open
project modal is gone.

**Blog merges CMS posts with the live Medium feed.** The homepage `Blog` section
and `/blog/[slug]` combine CMS posts (`src/lib/posts.ts`) with Medium's RSS feed
(`src/lib/medium.ts`, `@daffabercerita`); `src/lib/blog.ts` holds the shared
`PostListItem` type + `mergeAndSortPosts` (newest-first, CMS wins slug
collisions). `/blog/[slug]` renders CMS posts via `CmsPostContent` (Markdoc) and
Medium posts via `BlogPostContent` (HTML); `generateStaticParams` enumerates
both sources.

**Chatbot** (`/api/chat`) streams Server-Sent Events from OpenRouter. The
persona is "Abel." The client (`src/components/Chatbot.tsx`) consumes the SSE
stream.

**Theming** is handled manually, not via `next-themes` (which is an unused
dependency). An inline script in `src/app/layout.tsx` sets `data-theme`
(`light`/`dark`) on `<html>` before hydration, reading `localStorage.theme`
then `prefers-color-scheme`. `ThemeToggle` writes `localStorage`. All colors are
OKLCH custom properties that switch on `data-theme`.

## Design system — read `design.md` before any UI change

This project has a **locked editorial design system**, generated and maintained
by the Hallmark skill (`.agents/skills/hallmark/`, pinned in `skills-lock.json`).

- **`design.md`** (root) is the authoritative spec: genre, typography, motion,
  CTA voice, per-page allowances, and a hard **banned-patterns list** (no cursor
  trails, pixel pets, glassmorphism, gradient text, typewriter effects, terminal
  mockups, bento grids, pure `#000`/`#fff`, emoji-suffixed buttons, etc.). Treat
  violations as critical.
- **`tokens.css`** (root) is the canonical token source (OKLCH colors, fluid
  type scale, 4-point spacing scale, easings/durations, radii).
- **`src/app/globals.css`** imports `tailwindcss` and `tokens.css`, registers
  tokens under `@theme inline` (so `bg-paper`, `text-ink`, `font-display`, etc.
  work as Tailwind utilities), and defines the editorial CSS primitives:
  `.page`, `.chapter`, `.chapter-head`, `.display`, `.standfirst`, `.lede`,
  `.lnk`, `.pill`, `.row`, `.tag`, `.prose` (blog body), `.reveal`.

Rules that matter when writing styles:
- Use **named tokens** (`var(--space-md)`, `var(--color-ink)`) — never raw
  values.
- Fonts (`Caraque`, `GT America Mono`) are **locally hosted** in `/public/fonts`
  via `@font-face` — no Google CDN.
- Motion is **opacity-only** fades (Framer Motion `useInView`), with a
  reduced-motion fallback that disables reveals. No spring/scale/parallax.

`.claude/rules/UX_RULES.md` is a UX-psychology checklist (Nielsen heuristics,
Laws of UX, ethical guardrails) to apply when building or reviewing any flow.
