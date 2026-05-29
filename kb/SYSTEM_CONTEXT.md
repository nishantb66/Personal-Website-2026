# System Context

## Project Identity

- Project: `Personal Website` (portfolio site)
- Framework: Next.js App Router (`next@16.1.1`)
- Language: TypeScript + React 19
- Styling: Tailwind CSS v4 + custom design tokens in `src/app/globals.css`
- Animation: Framer Motion

## Functional Scope

The application is a content-driven portfolio site with:

1. Home route (`/`) containing hero, about, work, experience, and contact sections.
2. Secondary route (`/ai-engineering`) for AI-engineering narrative content.
3. Static assets for project images and resume download.

There is no backend API in this repository and no database integration.

## Runtime Model

- Rendering model: client-side interactive components (`"use client"` in both route pages).
- Routing model: file-based App Router:
  - `src/app/page.tsx` -> `/`
  - `src/app/ai-engineering/page.tsx` -> `/ai-engineering`
- Shared root layout: `src/app/layout.tsx`

## Core Modules

- `src/lib/constants.ts`: canonical content and profile data used by routes.
- `src/app/page.tsx`: primary portfolio UI and section flows.
- `src/app/ai-engineering/page.tsx`: AI narrative page.
- `src/app/globals.css`: global tokens, reusable utility classes, and visual system.
- `src/components/theme-provider.tsx`: wrapper around `next-themes`.

## Cross-Cutting Constraints

- `ThemeProvider` is configured with `forcedTheme="dark"` and `enableSystem={false}`.
  - Effective behavior is fixed dark mode in current runtime.
- `src/components/theme-toggle.tsx` exists but is not currently mounted in route UI.
- Project content is static and source-controlled (no CMS or runtime admin).

## Operational Boundaries

- Build/deploy target is Vercel-friendly by default.
- Required runtime is Node.js 18+ per project docs.
- No environment variables are currently required for app startup.
