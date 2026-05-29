# Domain: AI Engineering - Data Flow

1. Browser requests `/ai-engineering`.
2. Route loads `src/app/ai-engineering/page.tsx`.
3. Component imports `AI_ENGINEERING` constant object.
4. Header reads `title` and `subtitle`.
5. `sections` array is iterated and rendered by `type` branch:
   - `highlight` -> highlighted card
   - `conclusion` -> conclusion card with `main` + `sub`
   - otherwise -> standard narrative panel
6. CTA actions:
   - email link with prefilled subject
   - internal link to `/#work`
