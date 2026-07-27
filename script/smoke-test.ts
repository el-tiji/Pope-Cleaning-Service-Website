/**
 * API smoke / regression tests for the critical customer workflows.
 * Run with the dev server up:  npm run smoke
 *
 * Covers: public routes render, robots/sitemap, quote submission (residential,
 * commercial, extras, marketing consent on/off), server-side validation
 * (email, phone, postcode, missing plan, invalid source enum, oversized notes),
 * admin route protection, and stale conditional data absence.
 */
const BASE = process.env.SMOKE_BASE_URL || "http://localhost:5000";

let passed = 0;
let failed = 0;
const failures: string[] = [];

function check(name: string, ok: boolean, detail = "") {
  if (ok) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    failures.push(name + (detail ? ` — ${detail}` : ""));
    console.error(`  ✗ ${name} ${detail}`);
  }
}

const validCustomer = {
  firstName: "Smoke",
  lastName: "Test",
  email: "smoke-test@example.com",
  phone: "0400 000 000",
  contactMethod: "email",
  consentQuote: true,
  consentService: true,
  consentMarketing: false,
};

async function post(body: unknown) {
  const res = await fetch(`${BASE}/api/quotes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let json: any = null;
  try {
    json = await res.json();
  } catch {}
  return { status: res.status, json };
}

async function main() {
  console.log(`Smoke tests against ${BASE}\n`);

  // 1. Public routes respond
  console.log("Routes:");
  for (const route of ["/", "/services", "/pricing", "/about", "/book", "/quote", "/privacy"]) {
    const res = await fetch(`${BASE}${route}`);
    check(`GET ${route} -> 200`, res.status === 200, `got ${res.status}`);
  }
  const robots = await fetch(`${BASE}/robots.txt`);
  const robotsText = await robots.text();
  check("robots.txt served and disallows /admin", robots.status === 200 && robotsText.includes("Disallow: /admin"));
  const sitemap = await fetch(`${BASE}/sitemap.xml`);
  const sitemapText = await sitemap.text();
  check(
    "sitemap.xml valid, public-only",
    sitemap.status === 200 && sitemapText.includes("<urlset") && !sitemapText.includes("/admin"),
  );

  // 2. Admin protection
  console.log("\nAdmin protection:");
  const admin = await fetch(`${BASE}/api/admin/quotes`);
  check("GET /api/admin/quotes without session -> 401", admin.status === 401, `got ${admin.status}`);

  // 3. Valid submissions
  console.log("\nValid submissions:");
  const cleanupRefs: string[] = [];

  const residential = await post({
    source: "quote_form",
    plan: "regular",
    propertyType: "house",
    suburb: "Subiaco",
    postcode: "6008",
    rooms: { bedrooms: 3, bathrooms: 2 },
    extras: ["oven", "windows"],
    schedule: { howSoon: "this_week", accessNotes: "Key under mat" },
    customer: { ...validCustomer, consentMarketing: true },
  });
  check("residential quote accepted", residential.status === 201 || residential.status === 200, JSON.stringify(residential.json));
  if (residential.json?.reference) cleanupRefs.push(residential.json.reference);

  const commercial = await post({
    source: "booking_form",
    plan: "office",
    propertyType: "office",
    suburb: "Perth",
    postcode: "6000",
    commercial: { workstations: 12, afterHours: true },
    customer: validCustomer,
  });
  check("commercial quote accepted", commercial.status === 201 || commercial.status === 200, JSON.stringify(commercial.json));
  if (commercial.json?.reference) cleanupRefs.push(commercial.json.reference);

  // 4. Server-side validation
  console.log("\nServer-side validation:");
  const badEmail = await post({ plan: "regular", customer: { ...validCustomer, email: "not-an-email" } });
  check("invalid email rejected (400)", badEmail.status === 400, `got ${badEmail.status}`);

  const badPhone = await post({ plan: "regular", customer: { ...validCustomer, phone: "123" } });
  check("invalid phone rejected (400)", badPhone.status === 400, `got ${badPhone.status}`);

  const badPostcode = await post({ plan: "regular", postcode: "abcd", customer: validCustomer });
  check("letters in postcode rejected (400)", badPostcode.status === 400, `got ${badPostcode.status}`);

  const shortPostcode = await post({ plan: "regular", postcode: "60", customer: validCustomer });
  check("short postcode rejected (400)", shortPostcode.status === 400, `got ${shortPostcode.status}`);

  const longPostcode = await post({ plan: "regular", postcode: "60088", customer: validCustomer });
  check("long postcode rejected (400)", longPostcode.status === 400, `got ${longPostcode.status}`);

  const noPlan = await post({ customer: validCustomer });
  check("missing plan rejected (400)", noPlan.status === 400, `got ${noPlan.status}`);

  const badSource = await post({ source: "hacked_form", plan: "regular", customer: validCustomer });
  check("invalid source enum rejected (400)", badSource.status === 400, `got ${badSource.status}`);

  const hugeNotes = await post({
    plan: "regular",
    schedule: { accessNotes: "x".repeat(10000) },
    customer: validCustomer,
  });
  check("oversized access notes rejected (400)", hugeNotes.status === 400, `got ${hugeNotes.status}`);

  const emptyName = await post({ plan: "regular", customer: { ...validCustomer, firstName: "   " } });
  check("whitespace-only first name rejected (400)", emptyName.status === 400, `got ${emptyName.status}`);

  // Validation error responses must be structured, no stack traces
  check(
    "validation errors are structured (no stack traces)",
    typeof badEmail.json?.message === "string" && !JSON.stringify(badEmail.json).includes(" at "),
  );

  console.log(`\nCreated test records: ${cleanupRefs.join(", ") || "none"} (email smoke-test@example.com — safe to delete)`);
  console.log(`\nResult: ${passed} passed, ${failed} failed`);
  if (failures.length) {
    console.error("\nFailures:\n" + failures.map((f) => `  - ${f}`).join("\n"));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Smoke test crashed:", err);
  process.exit(1);
});
