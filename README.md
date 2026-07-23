# daaffalbari-v2

Personal portfolio site for Daffa Albari — an editorial, hiring-led portfolio
built with Next.js. The design system is documented in [`design.md`](./design.md)
and the shared tokens live in [`tokens.css`](./tokens.css); read those before
changing styles or layout.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion, GSAP, and Lenis for motion/scroll
- `@openrouter/sdk` for the "Ask my agent" chatbot (`src/app/api/chat`)
- Blog posts are pulled live from Medium via RSS at request/build time (`src/lib/medium.ts`)

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in OPENROUTER_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See [`.env.example`](./.env.example). `OPENROUTER_API_KEY` is required for the
chatbot to respond; `MODEL_NAME` is optional and defaults to `openai/gpt-4o-mini`.

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server (Turbopack)     |
| `npm run build` | Production build                    |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Project structure

```
src/
  app/            # App Router routes, layout, metadata, sitemap/robots
  components/      # Shared components (nav, footer, chatbot, ...)
  components/sections/  # Home page chapters (Hero, About, Projects, ...)
  lib/            # Static content (data.ts) and the Medium RSS client
public/
  images/         # Profile and project images
tokens.css        # Design tokens (colour, type, spacing, motion)
design.md         # The locked design system — read before redesigning
```
