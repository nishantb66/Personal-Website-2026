# Integrations

## Framework and Runtime

- `next@16.1.1`: routing, build pipeline, static asset serving, metadata.
- `react@19.2.3` + `react-dom@19.2.3`: component runtime.

## UI and Styling

- `tailwindcss@^4`: utility-first styling base.
- `@tailwindcss/postcss@^4`: Tailwind PostCSS integration.
- Custom global design system in `src/app/globals.css`.

## Animation and Visual Motion

- `framer-motion@^12.24.12`:
  - scroll progress bar (`useScroll`, `useSpring`)
  - section/card reveal transitions
  - icon transition animation in unused theme toggle component

## Icons and Class Composition

- `lucide-react@^0.562.0`: iconography for nav and CTA blocks.
- `clsx@^2.1.1` + `tailwind-merge@^3.4.0`: className merging utility (`cn`).

## Theming

- `next-themes@^0.4.6`:
  - wrapped by `src/components/theme-provider.tsx`
  - currently configured as forced dark mode in layout

## Fonts

Google fonts loaded via `next/font/google`:

- Sora
- Cormorant Garamond
- JetBrains Mono

## Deployment

- Deployment guidance is documented for Vercel in `DEPLOYMENT.md`.
- No environment-variable-backed third-party services are currently required.
