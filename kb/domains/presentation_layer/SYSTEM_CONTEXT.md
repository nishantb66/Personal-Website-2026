# Domain: Presentation Layer - System Context

## Responsibility

Controls visual identity, typography, spacing rhythm, and reusable style primitives.

## Primary Files

- `src/app/layout.tsx` (font loading + root wrappers)
- `src/app/globals.css` (design tokens and global classes)
- `src/components/theme-provider.tsx`

## Key Visual Primitives

- typography: `display-hero`, `display-xl`, `display-lg`, `kicker`
- surfaces: `panel`
- actions: `cta-primary`, `cta-ghost`
- metadata tags: `chip`
- effects: `orb-*`, `accent-dot`, `page-shell::before`

## Constraints

- Theme is effectively pinned to dark mode by layout configuration.
- Most visual semantics are centralized in global CSS, not component-local CSS modules.
