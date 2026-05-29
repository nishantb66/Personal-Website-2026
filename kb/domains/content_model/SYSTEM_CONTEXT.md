# Domain: Content Model - System Context

## Responsibility

Defines static content contracts consumed by route components.

## Primary Files

- `src/lib/constants.ts`

## Exported Models

- `PERSONAL_INFO`
- `SKILLS`
- `SOCIAL_LINKS`
- `PROJECTS`
- `EXPERIENCES`
- `AI_ENGINEERING`

## Consumers

- `src/app/page.tsx`
- `src/app/ai-engineering/page.tsx`

## Constraints

- No runtime schema validation is currently enforced.
- Component rendering assumes fields exist and types remain stable.
