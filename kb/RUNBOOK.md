# Runbook

## Local Development

1. Install dependencies:
   - `npm install`
2. Start dev server:
   - `npm run dev`
3. Open:
   - `http://localhost:3000`

## Production Validation

1. Build:
   - `npm run build`
2. Start production server:
   - `npm run start`
3. Verify route health:
   - `/`
   - `/ai-engineering`

## Pre-Deploy Checklist

1. Resume exists at `public/resume/resume.pdf`.
2. Project links in `src/lib/constants.ts` are correct.
3. Project images in `public/projects/` are valid and intentional.
4. Lint and build pass locally.
5. Metadata in `src/app/layout.tsx` is up to date.

## Deployment (Vercel-Oriented)

1. Push branch to Git provider.
2. Import repository into Vercel.
3. Build command: `npm run build` (auto-detected).
4. Start command: `npm run start` for local simulation only; Vercel handles runtime.

## Common Issues and Fixes

- Issue: missing resume download
  - Fix: ensure `public/resume/resume.pdf` exists and `PERSONAL_INFO.resumePath` matches.

- Issue: theme toggle appears ineffective
  - Cause: layout forces dark theme (`forcedTheme="dark"`).
  - Fix: remove forced theme config if light/dark switching is desired.

- Issue: broken image cards
  - Fix: confirm `projectImages` array indexes align with `PROJECTS` length and files exist.

## Change Management

When changing site structure/content contracts:

1. Update `src/lib/constants.ts` and impacted route component.
2. Update KB docs in `kb/`.
3. Re-run lint/build before handoff.
