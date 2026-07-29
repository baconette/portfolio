# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start the dev server (Turbopack, port 3000)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint (flat config: `eslint-config-next` core-web-vitals + typescript)

There is no test suite configured in this repo.

## Environment

Requires `.env.local` (gitignored) with:
- `NOTION_TOKEN` — internal integration token for the Notion API (separate from any Claude-side Notion MCP connector — this is what the deployed app itself uses at runtime)
- `NOTION_PORTFOLIO_DATA_SOURCE_ID` — data source ID for the "Portfolio CMS" Notion database

Without these, Notion-backed pages fall back to hardcoded sample data (see Data layer below) rather than failing.

A `.claude/launch.json` config exists for previewing the dev server via the Browser pane tooling.

## Architecture

**Stack**: Next.js 16 (App Router, `src/app`), React 19, Tailwind CSS v4, TypeScript. Path alias `@/*` → `src/*`.

### Component library is vendored, not hand-authored

`src/components/{base,foundations,marketing}` are pulled from the Untitled UI React library via its CLI (`npx untitledui@latest add <component>`), not written from scratch. When a new Untitled UI component is needed, install it with the CLI rather than copying/recreating it by hand — this keeps components structurally consistent with the vendored ones already in the tree. `base/` = primitives (avatar, badges, buttons, tooltip), `foundations/` = logo/icon assets, `marketing/` = page-section components (header, footer, blog cards).

### Design tokens live in three places that must be kept in sync manually

1. **`design-system/tokens.json`** — the source-of-truth design spec (color primitive scales, semantic color mapping, typography, spacing, radius). Written independently of the Untitled UI defaults.
2. **`src/styles/theme.css`** — Tailwind v4 `@theme` block. `globals.css` imports `theme.css` + `typography.css`. The color scales here (`--color-brand-*`, `--color-neutral-*`, `--color-dark-neutral-*`, etc.) are literal values manually ported from `tokens.json`, overriding Untitled UI's stock palette — they are not generated/synced automatically, so a change to `tokens.json` requires a matching hand-edit in `theme.css`.
3. **Figma** (`eg-portfolio` file) — has its own variable collections mirroring `tokens.json` (`core`, `light`, `dark`, `theme`), used when building/updating design references in Figma via the Figma Console MCP tools. Also kept in sync manually.

The active brand palette is the "hero" scale (vivid yellow-green, `#EBFC72` at 500) with a separate "dark-neutral" olive-black scale reserved for future dark-surface work (defined in `theme.css` as `--color-dark-neutral-*` but not yet wired into any component).

Body/display font is Bricolage Grotesque, loaded via `next/font/google` in `src/app/layout.tsx` and bound to `--font-bricolage-grotesque`, which `theme.css`'s `--font-body`/`--font-display` reference.

### Data layer: Notion as headless CMS

`src/lib/notion.ts` fetches the "Portfolio CMS" Notion database (`getPortfolioProjects`) using the Notion SDK's newer data-sources API (`notion.dataSources.query`, not the deprecated `databases.query`), filtered to `Published = true` and sorted by the `Order` property. Results are mapped into the `Article` type consumed by `blog-cards.tsx`'s card components. If `NOTION_TOKEN` or the data source ID is missing, `getPortfolioProjects` returns `[]` and callers fall back to hardcoded sample articles — this fallback is intentional, not an error path to "fix".

Notion property → `Article` field mapping: `Title`→title, `Excerpt`→summary, `Cover`→thumbnailUrl, `Slug`→href (`/work/{slug}`), `Type`→category (the badge shown on card), `Industry`→tags.

### Product scope and process

`product.md` defines the product spec: a password-protected, filterable portfolio collection (case studies pulled from the Notion database) plus a homepage summary. It also defines a required feature workflow: write a 3-sentence functional design doc and explicit acceptance criteria before modifying files, then change only the files strictly required by the user story.
