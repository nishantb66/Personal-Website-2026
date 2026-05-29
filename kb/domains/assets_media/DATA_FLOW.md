# Domain: Assets & Media - Data Flow

1. Static assets are stored under `public/`.
2. Next.js serves them from root-relative URLs.
3. Home page requests project images through `next/image` with responsive sizing.
4. Resume links request `/resume/resume.pdf` via anchor navigation with `download`.
