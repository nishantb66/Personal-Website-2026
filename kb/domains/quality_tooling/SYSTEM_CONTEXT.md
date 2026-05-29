# Domain: Quality & Tooling - System Context

## Responsibility

Provides static analysis, type safety, and consistency checks.

## Primary Files

- `tsconfig.json`
- `eslint.config.mjs`
- `package.json`
- `src/lib/utils.ts` (`cn` utility)

## Active Controls

- TypeScript strict mode enabled.
- ESLint extends Next.js core-web-vitals + TypeScript rule sets.
- Next.js build pipeline enforces route/module correctness.

## Constraints

- No dedicated unit/integration test suite is currently configured.
- Lint and build are the primary automated guardrails.
