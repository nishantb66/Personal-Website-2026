# Domain: Content Model - Data Flow

1. Content is authored directly in `src/lib/constants.ts`.
2. Route components import named exports at module load.
3. Arrays are mapped to UI lists/cards.
4. URLs in constants become direct anchor `href` values at render time.
5. Content updates require code change + redeploy.
