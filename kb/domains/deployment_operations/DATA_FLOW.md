# Domain: Deployment & Operations - Data Flow

1. Source changes committed to repository.
2. CI/platform runs `npm install` and `npm run build`.
3. Next.js outputs optimized build to `.next`.
4. Platform serves production build.
5. Runtime requests resolve to static assets + rendered route bundles.
