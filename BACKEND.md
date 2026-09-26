# Backend API

This backend powers the document risk portal authentication and personalized data layer.

## Required environment

Create a local `.env.local` from `env.sample` and set:

- `DATABASE_URL`
- `JWT_SECRET`
- `OTP_PEPPER`
- `SMTP_USER`
- `SMTP_APP_PASSWORD`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`
- `ALLOWED_ORIGINS` if the frontend is not on `http://localhost:5173` or `http://localhost:3000`

## Database

```bash
npm run db:generate
npm run db:push
```

If the Prisma schema engine fails in the local runtime, initialise the SQLite
database directly:

```bash
npm run db:init
```

## Auth endpoints

- `POST /api/auth/register`
  - Body: `{ "email": "...", "password": "...", "name": "..." }`
  - Sends a 6-digit OTP to the user email.

- `POST /api/auth/verify-otp`
  - Body: `{ "email": "...", "otp": "123456" }`
  - Marks the email as verified. The account is usable only after this succeeds.

- `POST /api/auth/login`
  - Body: `{ "email": "...", "password": "..." }`
  - Sets an HTTP-only session cookie.

- `GET /api/auth/google/start`
  - Redirects to Google OAuth and sets a secure state cookie.

- `POST /api/auth/google/callback`
  - Body: `{ "code": "...", "state": "..." }`
  - Exchanges the Google code, verifies the ID token, creates/updates the user, and sets the session cookie.

- `GET /api/auth/me`
  - Returns the logged-in user.

- `POST /api/auth/logout`
  - Clears the session cookie.

## Personalized portal endpoints

- `GET /api/documents`
  - Returns only documents owned by the logged-in user.

- `POST /api/documents`
  - Creates an analysed document record for the logged-in user.

- `GET /api/dashboard/stats`
  - Returns user-specific dashboard stats: analysed documents, total risks, high/critical risk counts, average risk score, severity counts, and recent documents.
