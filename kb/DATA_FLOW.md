# Data Flow

## Overview

Data flow in this codebase is static-content driven:

1. Source content is defined in `src/lib/constants.ts`.
2. Route components import constants.
3. Components map arrays to JSX blocks.
4. Browser renders content with Framer Motion animations and CSS styling.

No server-side data fetching, API roundtrips, or persistence steps are present.

## Home Route (`/`) Flow

1. `src/app/page.tsx` mounts as a client component.
2. Imports:
   - `PERSONAL_INFO`, `SKILLS`, `PROJECTS`, `EXPERIENCES`, `SOCIAL_LINKS`
3. UI sections render in sequence:
   - Hero -> About -> Work -> Experience -> Contact -> Footer
4. `PROJECTS` array is iterated to build linked project cards.
5. `EXPERIENCES` array is iterated to build timeline-like cards.
6. Contact links resolve to `mailto`, LinkedIn, GitHub, and resume static file.

## AI Engineering Route (`/ai-engineering`) Flow

1. `src/app/ai-engineering/page.tsx` mounts as client component.
2. Imports `AI_ENGINEERING` object.
3. Renders page header + cards from `AI_ENGINEERING.sections`.
4. Section renderer branches by `section.type`:
   - `conclusion` -> emphasized closing card
   - `highlight` -> highlighted statement card
   - others -> standard panel card

## Styling and Theme Flow

1. `src/app/layout.tsx` registers font variables and wraps app in `ThemeProvider`.
2. `src/app/globals.css` maps theme tokens to CSS custom properties.
3. JSX classes (`panel`, `chip`, `cta-*`, `display-*`) consume those tokens.
4. Dark theme is effectively fixed by layout configuration.

## Asset Delivery Flow

1. Static files in `public/` are served directly by Next.js.
2. `next/image` in home page loads:
   - `/projects/chatbot.jpg`
   - `/projects/accident-analysis.jpg`
3. Resume links point to `/resume/resume.pdf` and trigger browser download behavior.
