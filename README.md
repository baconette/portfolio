# Portfolio

A password-protected, filterable portfolio site for Erika Aldrich Murga — a homepage introducing her product design and strategy work, and a case study collection pulled from a Notion database, filterable by discipline (branding, product design, UX research, end-to-end).

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

`src/lib/notion.ts` queries a "Portfolio CMS" Notion database (via the Notion SDK's data-sources API) for published case studies, homepage hero copy, and per-page SEO metadata, each matched against the corresponding page's `Slug` property. If Notion isn't configured, pages fall back to hardcoded sample content rather than failing.

### Pages

- `/` — homepage with an interactive, mouse-reactive map header and a summary of Erika's work
- `/work` — the case study collection, rendered from the Notion-backed blog card components
