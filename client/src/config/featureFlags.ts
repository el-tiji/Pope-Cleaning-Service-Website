// ---------------------------------------------------------------------------
// Feature Flags — Pope Cleaning Services
// ---------------------------------------------------------------------------
// Admin login is temporarily hidden for public release.
// Re-enable with VITE_ENABLE_ADMIN_LOGIN=true (Replit Secrets or .env).
//
// When false (default — public release):
//   - The "Log In" button is hidden from the navbar.
//   - /login, /auth/*, /portal/* and /admin/* routes are NOT registered and
//     fall through to the clean 404 Not Found page.
//
// When true (internal development):
//   - The Log In button and all auth/portal/admin routes are restored.
//
// The admin dashboard is preserved for future development and should not be
// exposed publicly until ready. See ADMIN_RELEASE_NOTES.md for details.
// ---------------------------------------------------------------------------
export const ENABLE_ADMIN_LOGIN =
  import.meta.env.VITE_ENABLE_ADMIN_LOGIN === "true";
