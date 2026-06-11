# Threat Model

## Project Overview

This project is a public marketing and lead-generation website for Pope Cleaning Services, built with React 19, Vite, Tailwind CSS, and a small Express codebase that exists in the repository but is not the production serving path today. Replit deployment is configured as a **static** deployment with `publicDir = "dist/public"`, so the production attack surface is primarily the built frontend and any assets emitted into `dist/public`.

The repository also contains a Node/Express server (`server/`) plus shared schema/storage code, but under the current deployment configuration those paths are dev-only and should not be treated as production-reachable unless deployment is changed away from static hosting.

Assumptions propagated from platform context:
- Production traffic is terminated with TLS by the platform.
- `NODE_ENV` is `production` in production.
- This scan only reports vulnerabilities that are production-reachable.

## Assets

- **Brand and site integrity** — the public site represents the business and is the main user trust surface. Defacement, injected content, or malicious redirects would directly impact customers.
- **Customer contact and quote details** — the UI collects names, phone numbers, emails, suburb details, and free-form request text in booking/review/custom quote flows. If these flows later become connected to a backend, that data becomes sensitive personal/business information.
- **Deployment metadata and generated HTML** — build-time HTML/meta tag generation influences what browsers and crawlers render. Unsafe interpolation here could become an XSS or content-injection vector if attacker-controlled inputs are introduced.
- **Static assets shipped to production** — anything copied into `dist/public` becomes world-readable because deployment visibility is public.

## Trust Boundaries

- **Browser to static deployment boundary** — all user interaction comes from untrusted browsers to a public static site. Client-side code must not assume any user input is trustworthy.
- **Build-time environment to generated HTML boundary** — Vite plugins and build scripts can inject environment-derived values into HTML and metadata. Only trusted platform-controlled values should cross this boundary without sanitization.
- **Repository source to deployed assets boundary** — only files emitted into `dist/public` are production-reachable under the current deployment model. Repo files outside that output, including `server/` and `attached_assets/`, are out of production scope unless explicitly bundled or copied.
- **Public to business-contact boundary** — the site exposes phone/email/social links directly to unauthenticated users. Those links should not enable script execution, open redirect behavior, or leakage of hidden/internal destinations.

## Scan Anchors

- Production entry point: `client/index.html` and `client/src/main.tsx`, built by Vite into `dist/public`.
- Highest-risk production code areas: `vite-plugin-meta-images.ts`, `client/src/pages/booking.tsx`, `client/src/components/chatbot.tsx`, and any future code that turns the mock forms into real submissions.
- Public surface: the entire deployed frontend is public; there is no authenticated or admin production surface today.
- Dev-only / usually out of scope: `server/`, `shared/schema.ts`, `server/storage.ts`, and local development Vite middleware. Revisit only if deployment stops being static or these paths are exposed through another runtime.

## Threat Categories

### Tampering

The main tampering risk in this project is client-side or build-time content manipulation: malicious input influencing generated HTML, link targets, or rendered UI in a way that changes what users see or where they are sent. The project must ensure that any future user-controlled data rendered into the page is encoded safely, and that build-time metadata interpolation only uses trusted values.

### Information Disclosure

Because the site is publicly deployed, any file emitted into `dist/public` becomes readable by anyone. The project must ensure that only intended marketing assets are published and that internal documents, prompts, or user data are not copied into the static output. If quote/review forms are later connected to storage or email, personal data must not be exposed in client bundles, logs, or public assets.

### Spoofing

The site contains business contact channels and customer-facing claims. Attackers could abuse unsafe links, injected meta tags, or future third-party integrations to impersonate the business or redirect users to attacker-controlled destinations. All externally influenced URLs surfaced to users or crawlers must be trusted, fixed, or validated against an allowlist.

### Elevation of Privilege

There is no authenticated/admin production surface today, so classic privilege-escalation risks are currently limited. The main future concern is that dormant backend/auth/storage code could become production-reachable if deployment changes; if that happens, authentication, password handling, and authorization controls will need a fresh review before launch.
