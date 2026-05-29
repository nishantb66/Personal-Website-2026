# KB Guide

## Purpose

This KB documents the real behavior of the `Personal Website` codebase so future updates can be made safely and quickly.

## Structure

- Root docs:
  - `kb/SYSTEM_CONTEXT.md`
  - `kb/DATA_FLOW.md`
  - `kb/API_CATALOG.md`
  - `kb/INTEGRATIONS.md`
  - `kb/CODING_STANDARDS.md`
  - `kb/RUNBOOK.md`
  - `kb/GLOSSARY.md`
- Domain docs:
  - `kb/domains/<domain>/SYSTEM_CONTEXT.md`
  - `kb/domains/<domain>/DATA_FLOW.md`
- Generated outputs:
  - `kb/generated/*`

## Suggested Reading Order

1. `SYSTEM_CONTEXT.md`
2. `DATA_FLOW.md`
3. `API_CATALOG.md`
4. `INTEGRATIONS.md`
5. `RUNBOOK.md`
6. Relevant domain docs under `kb/domains/`

## Domain Map

- `core_site` - Home route and primary portfolio UX.
- `ai_engineering` - `/ai-engineering` route and narrative sections.
- `content_model` - Static content source of truth (`src/lib/constants.ts`).
- `presentation_layer` - Layout, theme tokens, and shared visual styles.
- `animation_interaction` - Framer Motion, scroll progress, and UI interactions.
- `assets_media` - Public assets, images, and resume delivery.
- `deployment_operations` - Build, run, deploy, and release operations.
- `quality_tooling` - TypeScript, ESLint, and project quality gates.

## Maintenance Rules

- Update KB in the same change set when behavior changes.
- Prefer code-backed facts over assumptions.
- Keep docs implementation-aware but concise.
- Record known constraints and gaps explicitly.
