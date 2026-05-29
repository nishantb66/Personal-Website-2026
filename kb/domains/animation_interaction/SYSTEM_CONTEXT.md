# Domain: Animation & Interaction - System Context

## Responsibility

Handles dynamic motion, viewport reveals, and interactive UI state.

## Primary Files

- `src/app/page.tsx`
- `src/app/ai-engineering/page.tsx`
- `src/components/theme-toggle.tsx` (currently unused)

## Interaction Features

- scroll progress bar (`useScroll` + `useSpring`)
- in-view card reveals (`whileInView`)
- mobile menu open/close state on home route
- animated icon swap in `ModeToggle`

## Constraints

- Motion behavior is entirely client-side.
- Theme toggle is not active in mounted layout at present.
