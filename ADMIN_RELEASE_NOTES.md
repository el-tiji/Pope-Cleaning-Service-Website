# Admin Release Notes — Public Release Without Admin Login

**Date:** July 27, 2026
**Status:** Admin/login functionality has been **hidden for public release**. All code is preserved for future development.

## What changed

The website is now in "public release mode": the customer-facing site is fully
functional, while the Log In button and all admin/auth routes are hidden behind
a feature flag.

## Feature flag

| Variable | Value | Effect |
|----------|-------|--------|
| `VITE_ENABLE_ADMIN_LOGIN` | *(unset)* or `false` | **Public release mode** (current). Log In button hidden, admin/auth routes return 404. |
| `VITE_ENABLE_ADMIN_LOGIN` | `true` | **Development mode.** Log In button and all admin/auth routes restored. |

Flag definition: `client/src/config/featureFlags.ts`

To re-enable admin/login for development, set the environment variable
`VITE_ENABLE_ADMIN_LOGIN=true` (in Replit Secrets or a `.env` file) and restart
the dev server. No code changes are needed.

> Note: this is a frontend visibility flag only. Its value is public in the
> built bundle (as all `VITE_*` vars are), so it must never hold secrets. Real
> authentication/authorization must still be enforced server-side when the
> admin phase ships.

## Routes affected (hidden when flag is off)

- `/login` → 404
- `/auth/login` → 404
- `/auth/signup` → 404
- `/portal/dashboard` → 404
- `/admin` → 404
- `/admin/dashboard` → 404
- `/admin/quotes` → 404
- `/admin/quotes/:id` → 404

All public routes remain active: `/`, `/services`, `/pricing`, `/about`,
`/book`, `/quote`.

## Files / components preserved (NOT deleted)

- `client/src/pages/auth/login.tsx` — admin login screen
- `client/src/pages/auth/signup.tsx` — signup screen
- `client/src/pages/portal/dashboard.tsx` — customer portal dashboard
- `client/src/pages/admin/dashboard.tsx` — admin dashboard
- `client/src/pages/admin/quotes/index.tsx` — quote requests list
- `client/src/pages/admin/quotes/detail.tsx` — quote detail + admin quote assistant
- `client/src/components/admin/layout.tsx` — admin sidebar layout
- All routes remain registered in `client/src/App.tsx`, gated by the flag.

## Files changed for this release

- `client/src/config/featureFlags.ts` — **new**, defines `ENABLE_ADMIN_LOGIN`
- `client/src/App.tsx` — admin/auth routes gated behind the flag
- `client/src/components/layout/navbar.tsx` — Log In button gated behind the flag
- `client/src/pages/not-found.tsx` — polished into a clean, brand-consistent 404 page

## Next steps for future admin work

1. Set `VITE_ENABLE_ADMIN_LOGIN=true` to restore the UI.
2. Replace the prototype email check in `auth/login.tsx` with real
   authentication (server-side session or auth provider).
3. Connect the admin quotes list/detail to real quote submissions.
4. Add server-side route protection for all `/admin/*` API endpoints before
   ever enabling the flag in production.
