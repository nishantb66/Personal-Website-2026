# Domain: Core Site - Data Flow

1. Browser requests `/`.
2. Next.js loads `src/app/page.tsx`.
3. Component imports constants from `src/lib/constants.ts`.
4. Section renderer maps:
   - `SKILLS` -> skill chips
   - `PROJECTS` -> project cards
   - `EXPERIENCES` -> timeline cards
5. Contact CTAs resolve to:
   - `mailto:`
   - LinkedIn URL
   - GitHub URL
   - `/resume/resume.pdf`
6. Framer Motion applies entrance and in-view transitions.
