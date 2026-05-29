# Domain: Core Site - System Context

## Responsibility

Owns the main portfolio route (`/`) and its sectioned storytelling flow.

## Primary Files

- `src/app/page.tsx`
- `src/lib/constants.ts`
- `src/app/globals.css`

## Domain Inputs

- Profile and contact data from `PERSONAL_INFO` and `SOCIAL_LINKS`
- Skills, projects, and experiences from constants arrays
- Project image paths from local `projectImages` list

## Domain Outputs

- Rendered section-based portfolio interface
- External navigation to social/project links
- Resume file download entry points

## Constraints

- Built as a client component.
- Depends on constants data shape consistency.
- Uses custom style primitives (`panel`, `chip`, `cta-*`, `display-*`).
