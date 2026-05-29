# API Catalog

## Internal APIs

There are currently no internal HTTP API endpoints in this repository.

- No `src/app/api/*` routes.
- No custom backend server files.
- No RPC layer or service client abstraction.

## Data Interfaces

Application data contracts are in-process TypeScript object shapes from `src/lib/constants.ts`:

- `PERSONAL_INFO`
- `SKILLS`
- `SOCIAL_LINKS`
- `PROJECTS`
- `EXPERIENCES`
- `AI_ENGINEERING`

These act as the content API for route components.

## External URLs Used as Endpoints

- LinkedIn profile URL
- GitHub profile URL
- Email `mailto:` URL
- Internal static file URL: `/resume/resume.pdf`

## API Evolution Notes

If future work adds `src/app/api/*` routes, update this file with:

1. Route path and method
2. Request schema
3. Response schema
4. Auth requirements
5. Error cases
