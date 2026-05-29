# Domain: Assets & Media - System Context

## Responsibility

Owns static file inventory and image/document delivery behavior.

## Primary Locations

- `public/projects/chatbot.jpg`
- `public/projects/accident-analysis.jpg`
- `public/resume/resume.pdf`
- `public/*.svg` default icon assets

## Consumers

- `src/app/page.tsx` project cards (`next/image`)
- `src/app/page.tsx` and contact CTAs (resume download link)

## Constraints

- Project image list in `page.tsx` is index-based; array length should track `PROJECTS`.
- Resume path must match `PERSONAL_INFO.resumePath`.
