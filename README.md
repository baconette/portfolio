# Portfolio

A password-protected portfolio site for Erika to introduce her product strategy and design work, with a case study collection pulled from a Notion database, filterable by project type (product strategy, service design, and experiments).

## Tech stack

- **Next.js 16** (App Router) with **React 19** and TypeScript
- **Tailwind CSS v4**, configured through a `@theme` block rather than a JS config file
- **Notion API** (`@notionhq/client`) as a headless CMS for case study content
- **Untitled UI** React component library, vendored in via its CLI rather than hand-authored
- **Storybook** for component development and visual documentation
- **Style Dictionary** for compiling design tokens into CSS/JS output consumed by the Tailwind theme

## Architecture

### Component library

Components under `src/components/{base,foundations,marketing}` are pulled from Untitled UI's CLI, not written from scratch:

- `base/` — primitives (avatar, badges, buttons, tooltip)
- `foundations/` — logo and icon assets
- `marketing/` — page-section components (header, footer, navigation, blog cards)

### Design tokens

Design tokens are defined once in `design-system/tokens.json` (the source-of-truth spec — color primitive scales, semantic color mapping, typography, spacing, radius), then run through a Style Dictionary pipeline (`design-system/pipeline`) to produce compiled token output. `src/styles/theme.css` is a Tailwind v4 `@theme` block whose color scales are ported from that spec, overriding Untitled UI's stock palette.

### Data layer

`src/lib/notion.ts` queries a "Portfolio CMS" Notion database (via the Notion SDK's data-sources API) for published case studies, Play items, homepage/profile/contact copy, and per-page SEO metadata, each matched against the corresponding page's `Slug` property. If Notion isn't configured, pages fall back to hardcoded sample content rather than failing.

### Access control

`/work` and its case study pages are gated behind a shared password (`src/app/work/layout.tsx` + `src/app/work/actions.ts`), using a signed, HMAC-verified cookie rather than middleware — see `src/lib/work-auth.ts`. Missing password/secret env vars fail closed (the gate can never be passed), unlike the Notion helpers' fallback-to-sample-content behavior.

### Open Graph images

Case study pages generate their preview image dynamically from each project's Notion cover photo (`src/app/work/[slug]/opengraph-image.tsx`); the home, profile, and contact pages share one static image. These stay reachable without the password so link previews keep working even though the pages themselves are gated.

### Pages

- `/` — homepage with an interactive, mouse-reactive map header and a summary of Erika's work
- `/profile` — bio content pulled from Notion
- `/work` — the password-gated case study collection, filterable by project type
- `/play` — externally-linked experiments and side projects, each card opening its Notion `URL` field in a new tab, with a Live/UAT stage badge
- `/contact` — a contact form (Resend) with copy pulled from Notion

## Environment variables

Set these in `.env.local` for local development (see `CLAUDE.md` for details on what each backs):

- `NOTION_TOKEN`, `NOTION_PORTFOLIO_DATA_SOURCE_ID` — Notion CMS access
- `RESEND_API_KEY` — sending the contact form
- `WORK_PASSWORD`, `WORK_AUTH_SECRET` — the `/work` password gate
