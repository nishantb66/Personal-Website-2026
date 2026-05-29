# Domain: Presentation Layer - Data Flow

1. `layout.tsx` loads Google fonts and assigns CSS variable hooks.
2. `globals.css` maps variables to theme tokens and utility classes.
3. Route JSX applies semantic classes.
4. Browser computes final styles from:
   - Tailwind utility classes
   - custom classes from `globals.css`
   - CSS custom properties from root theme config
