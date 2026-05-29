# Domain: AI Engineering - System Context

## Responsibility

Owns the dedicated `/ai-engineering` route and narrative around AI-assisted engineering philosophy.

## Primary Files

- `src/app/ai-engineering/page.tsx`
- `src/lib/constants.ts` (`AI_ENGINEERING`)

## Domain Inputs

- `AI_ENGINEERING.title`
- `AI_ENGINEERING.subtitle`
- `AI_ENGINEERING.sections[]`

## Domain Outputs

- Structured content page with section-type-dependent cards.
- CTA links for email outreach and jump back to work section on home page.

## Constraints

- Rendering is client-side (`"use client"`).
- Section rendering logic assumes known `type` values (`highlight`, `conclusion`, default).
