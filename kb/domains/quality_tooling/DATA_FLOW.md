# Domain: Quality & Tooling - Data Flow

1. Developer runs `npm run lint`.
2. ESLint checks TS/TSX files with Next.js presets.
3. Developer runs `npm run build`.
4. Next.js compiles TypeScript + route graph and emits production artifacts.
5. Failures block release until code/config is corrected.
