# Design — Daffa Albari

A locked design system for this portfolio. Every page redesign reads this file
before emitting code. Do not regenerate per page — extend or amend this file
when the system needs to grow.

Established by Hallmark on 2026-05-20. Editorial genre, hiring-led portfolio.

## Genre

Editorial. Magazine-quiet, type-led. The page is *literature about the work*,
not a SaaS marketing funnel.

## Macrostructure family

Two families, both rooted in **Long Document**:

- **Home page** — Long Document with numbered chapter heads. Each chapter
  (01 · Work, 02 · Notes, 03 · Experience, 04 · Awards, 05 · Writing,
  06 · Get in touch) is a section break inside one continuous editorial flow.
- **Blog detail** — Long Document refined for prose reading. Drop-cap lede,
  italic blockquotes, inline section heads emerging from paragraph flow.
- **404** — Letter shape. Short note, signed.

## Theme

Custom OKLCH palette. Single warm terracotta accent, used at ≤ 5 % per
viewport. No cyan, no rainbow, no gradient text.

```
/* light paper */
--color-paper       oklch(98.0% 0.005 80)   /* warm off-white */
--color-paper-2     oklch(95.5% 0.008 80)   /* subtler tint */
--color-paper-3     oklch(92.0% 0.010 80)   /* deepest paper */
--color-ink         oklch(20.0% 0.010 50)   /* warm near-black */
--color-ink-2       oklch(40.0% 0.010 50)   /* body subtleties */
--color-ink-3       oklch(58.0% 0.010 50)   /* muted metadata */
--color-rule        oklch(85.0% 0.008 80)   /* hairline */
--color-rule-strong oklch(70.0% 0.010 50)   /* hairline emphasis */
--color-accent      oklch(48.0% 0.150 25)   /* warm terracotta */
--color-accent-ink  oklch(98.0% 0.005 80)   /* paper on accent */
--color-focus       oklch(48.0% 0.150 25)   /* matches accent */

/* dark paper (warm coffee-black, not blue-black) */
--color-paper       oklch(15.0% 0.005 50)
--color-paper-2     oklch(19.0% 0.005 50)
--color-paper-3     oklch(24.0% 0.005 50)
--color-ink         oklch(92.0% 0.005 80)
--color-ink-2       oklch(75.0% 0.008 60)
--color-ink-3       oklch(58.0% 0.010 50)
--color-rule        oklch(28.0% 0.008 50)
--color-rule-strong oklch(40.0% 0.010 50)
--color-accent      oklch(72.0% 0.180 25)
--color-accent-ink  oklch(15.0% 0.005 50)
--color-focus       oklch(72.0% 0.180 25)
```

Diversification axes — paper-band: light/dark dual · display-style: serif ·
accent-hue: warm.

## Typography

Locally hosted, no Google CDN. Preserves what was already on disk.

- **Display:** `Caraque` — weights 400/500/700. Italic permitted at hero scale.
- **Body:** `Caraque` Regular. Line-height 1.65. Measure 60–65ch.
- **Mono / outlier:** `GT America Mono` Regular. Used for section numerals
  (`01 ·`), eyebrows, year columns in lists, metadata.
- **Display tracking:** −0.02em on display; 0 on body.
- **Type scale anchor:** `--text-display` = `clamp(3.25rem, 8vw, 6.5rem)`.

## Spacing

4-point named scale. The values are in `tokens.css`. Pages must use named
tokens (`var(--space-md)`), never raw values.

## Motion

- **Easings:**
  - `--ease-out`: `cubic-bezier(0.16, 1, 0.3, 1)`
  - `--ease-in-out`: `cubic-bezier(0.65, 0, 0.35, 1)`
- **Durations:** `--dur-short` 180ms, `--dur-base` 280ms, `--dur-long` 480ms.
- **Reveal pattern:** opacity-only fade. No spring, no scale, no parallax,
  no typewriter, no marquee, no cursor trail.
- **Reduced-motion fallback:** all reveals off; instant render.

## Microinteractions stance

- **Hover:** ink-to-accent colour shift on links, 180ms. Underline thickens
  on hover from 1px to 2px.
- **Focus-visible:** 2px solid `var(--color-focus)` outline, 3px offset.
  Never animated.
- **Buttons:** silent success. No celebratory toasts.
- **Tooltips:** hover delay 800ms; focus delay 0ms.
- **No magnetic buttons.** No gradient fills on hover.

## CTA voice

- **Primary CTA:** typographic — `→ Get in touch`. Underlined link with
  arrow. No fill, no background, no animation on the arrow.
- **One pill maximum per viewport.** When a pill IS used (only the hero
  contact action), it is editorial: thin ink border, no fill, no gradient,
  `padding: 0.625rem 1.25rem`, `border-radius: 999px`.
- **Copy pattern:** verb-led. "Get in touch", "Read the case", "See the
  awards". Never "Click here", never emoji suffixes.

## Per-page allowances

- **Home page** MAY include the small portrait at the top of the standfirst
  area. The portrait is a real photo, no decorative frames.
- **Home page** MAY include the Chatbot dock and Command Palette overlay
  (restyled to editorial chrome).
- **Blog detail** MUST NOT add hero enrichment beyond the post's own
  cover image. Drop-cap on the lede is permitted.
- **404** is text-only.

## What pages MUST share

- The wordmark (text-set "Daffa Albari" in Caraque 500).
- The accent colour and its placement (≤ 5 % per viewport, no large fills).
- The display + body + mono pairing (Caraque + Caraque + GT America Mono).
- The CTA voice (typographic link with arrow; one optional editorial pill).
- The chapter-heading rhythm: `02 ·` mono numeral · Caraque eyebrow label ·
  display Caraque heading, all left-aligned, stacked vertically (NOT in a
  two-column tag-left/heading-right layout).

## What pages MAY differ on

- The depth of metadata in chapter rules (home shows year column; blog
  shows reading-time + date).
- The presence of the standfirst (home only).
- The footer composition (home: full Ft6 letter close; blog: short colophon).

## Component archetypes

- **Nav** — N9 Edge-aligned minimal. Wordmark left, three text links right.
  Hairline rule appears below after first scroll. No backdrop-blur. No pill.
- **Footer** — Ft6 Letter close. Sign-off paragraph anchors a single
  horizontal band; wordmark, three socials inline, colophon line.

## Banned patterns

Hard prohibitions inside this design system. Audit verb flags these as
critical findings.

- Animated rainbow-gradient text (`gradient-text-animated`).
- Glassmorphism on any surface (`backdrop-filter: blur`, glass cards).
- Pulsing green status dot ("always online" / "available" pattern).
- Magnetic / gradient-fill-on-hover buttons.
- Animated underline expanding from 0%.
- Floating pixel pets / decorative animal GIFs in the hero.
- Cursor trail / custom cursor decoration.
- Typewriter effect cycling through roles.
- Terminal mockup styling (fake traffic-light dots + monospace block) —
  redrawn UI chrome violates Hallmark gate 57.
- Card-in-card layouts; bento grids of equal feature tiles.
- Pure black `#000` ink or pure white `#fff` paper. Tint toward warm.
- Emoji suffixes on buttons (`👋`, `✨`, etc.).
- Centred-everything heroes.

## Exports

Drop-in formats for re-using this design system in other projects.

### tokens.css

The canonical, complete token block lives at `./tokens.css` at the project
root. Pages import via `@import "../../tokens.css"` from `globals.css`, or
reference tokens by name in component CSS / inline styles.

### Tailwind v4 `@theme inline`

`src/app/globals.css` registers each token under `@theme inline` so they
become available as Tailwind utilities (`bg-paper`, `text-ink`,
`border-rule`, `font-display`, etc.). See `globals.css` for the mapping.

## Provenance

Designed by Hallmark on behalf of Daffa Albari. Editorial genre selected by
the user. Hiring-led use case inferred from "Mixed — but lead with hiring"
audience choice. Tone confirmed as Editorial via preview comparison.
