# Coding Standards

## TypeScript and React

- Keep `strict` TypeScript compatibility (see `tsconfig.json`).
- Use App Router patterns (`src/app/*`) for route composition.
- Use `"use client"` only where interaction/state/animation is required.
- Keep route-level JSX readable by extracting reusable logic only when needed.

## Content Modeling

- Store profile and section content in `src/lib/constants.ts`.
- Maintain stable object shapes used by page components.
- Update content and matching UI assumptions together.

## Styling Conventions

- Prefer shared semantic classes in `globals.css` (`panel`, `chip`, `cta-*`, `display-*`).
- Use design tokens from CSS variables rather than hardcoded colors in JSX.
- Keep utility usage consistent with existing naming and spacing rhythm.

## Motion and Interaction

- Use Framer Motion for view transitions and progressive reveals.
- Keep durations and easing aligned with existing motion language.
- Avoid excessive motion that harms readability or mobile performance.

## Accessibility

- Include meaningful `aria-label` values for icon-only or stateful buttons.
- Preserve keyboard-safe navigation and link semantics.
- Provide descriptive `alt` text for project images.

## Quality Gates

- Before merge/deploy:
  1. `npm run lint`
  2. `npm run build`
  3. Manual route check for `/` and `/ai-engineering`
