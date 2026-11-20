# Frontend API contracts

The frontend talks to the backend only through typed adapters in `src/services/`. This
document is the coordination point with backend engineers. **Endpoint names and payloads
are proposals to agree, not a description of an existing API.**

## How every adapter behaves

`apiRequest` (`src/services/api-client.ts`) returns a `ServiceResult<T>`:

| Status | Meaning | UI rule |
| --- | --- | --- |
| `ok` | Response validated by a Zod schema | Show the result; success messages only here |
| `not-connected` | `NEXT_PUBLIC_API_URL` is empty, or the feature is gated off. **Nothing was sent.** | Say the feature isn't connected; keep the user's input |
| `error` (`http`, `network`, `timeout`, `invalid-response`, `cancelled`) | The request failed | Say nothing was saved; offer retry where it makes sense |

- Base URL: `NEXT_PUBLIC_API_URL` (public, no secrets). Requests are JSON, `credentials: "include"`
  (assumes cookie sessions set by the backend; agree CSRF handling).
- Default timeout 15 s (20 s for recommendations). Callers pass an `AbortSignal`; Glow Scan
  cancels a pending request whenever preferences change or the view unmounts.
- Responses that fail schema validation are treated as errors, never shown.
- No adapter simulates latency or success. There are no mock fallbacks in production code.

## Integration status

| Feature | Adapter | Proposed endpoint | Status |
| --- | --- | --- | --- |
| Registration | `registerAccount` | `POST /auth/register` | Not connected |
| Sign-in | `signIn` | `POST /auth/sessions` | Not connected |
| Support messages | `sendSupportMessage` | `POST /support/messages` | Not connected |
| Glow Scan recommendations | `requestRecommendations` | `POST /glow-scan/recommendations` | Not connected — falls back to the labelled sample catalogue |
| Glow Scan photo analysis | `analysePhoto` | `POST /glow-scan/analyses` (multipart) | **Locked off** — see below |
| Save routine | `saveRoutine` | `POST /glow-scan/routines` | Not connected — saved on the device (localStorage) instead |
| Workspace modules (inventory, products, suppliers, sales, staff, reports) | — | — | Not built; next milestone. Product page shows true empty states |
| GlowHub Intelligence | — | — | Not built; homepage shows answer structure only |
| Payments | — | — | **Locked off** (`NEXT_PUBLIC_PAYMENTS_ENABLED`) |

## Accounts

`POST /auth/register` — body `RegisterValues` (`src/features/forms/schemas.ts`):
`{ name, email, businessName, password, acceptTerms: true, acknowledgePrivacy: true, marketingConsent }`.
Response `200 { redirectTo: "/…" }` (relative path the frontend navigates to). Expected
errors: `409` email in use, `422` validation (agree an error body with field names).

`POST /auth/sessions` — body `{ email, password }`. Response `200 { redirectTo }`;
`401` invalid credentials. Rate limiting and lockout are backend concerns.

## Support

`POST /support/messages` — body `{ name, email, topic, message, marketingConsent }`
(topics: `general | account | glow-scan | privacy | other`). Response `200 { reference }`.

## Glow Scan

Types: `src/features/glow-scan/types.ts`.

**Until a merchant catalogue is connected** (`requestRecommendations` returns
`not-connected`), results come from `recommendFromSample` in
`src/features/glow-scan/sample-catalogue.ts`: 14 unbranded illustrative products, labelled
"Sample catalogue" and "not for sale" wherever they appear, ranked by goal and skin-feel fit
and passed through the same `constrainMatches` rules. When the endpoint returns `ok`, live
data replaces it automatically; delete the sample module once a catalogue is live.
"Save routine" stores the routine in this browser (`routine-store.ts`, key
`glowhub.glow-scan.routine.v1`: steps and product names only — never a photo or personal
details) when `POST /glow-scan/routines` is not connected.

`POST /glow-scan/recommendations` — body `GlowScanRequest` without `image`:

```json
{
  "preferences": {
    "skinFeel": "dry",
    "goals": ["hydration"],
    "currentProducts": ["cleanser"],
    "sensitivities": ["fragrance"],
    "otherExclusions": ["niacinamide"],
    "categories": ["moisturiser", "sunscreen"],
    "budget": { "minor": 2500000, "currency": "NGN" },
    "routine": "minimal"
  },
  "merchantId": "optional"
}
```

Response `GlowScanResult`: `{ requestId, observations[], matches: ProductMatch[], routine: RoutineStep[], missingInformation[] }`.

Backend requirements:
- Matches come only from authorised, live merchant catalogue data: real name, brand,
  merchant, NGN price (integer kobo), stock status, published ingredient list.
- Never return expired, recalled or quarantined batches.
- Safety screening also runs server-side; red-flag inputs return no matches.

Frontend guarantees (`constrainMatches` in `src/features/glow-scan/logic.ts`, unit-tested),
applied to every response regardless of the backend:
- `out-of-stock` and `unknown` stock are never shown.
- Products containing an excluded ingredient are removed; with any exclusion set, a product
  without an ingredient list is withheld as unverifiable.
- Products priced above the stated budget are removed.
- The number of withheld products and any `missingInformation` are shown.

`observations` must be cautious, cosmetic appearance notes only (e.g. apparent shine), each with
`confidence` and `method`. No diagnosis, disease, age, ethnicity, skin-tone or attractiveness output.

### Photo analysis (locked)

`analysePhoto` always returns `not-connected` and sends nothing. Before it is enabled:
1. Validated method across diverse skin tones; qualified safety review; DPIA.
2. Approved processing region and vendor; documented retention (proposed: delete after analysis).
3. A separate, explicit consent step creating a `ConsentRecord`
   (`purpose`, `policyVersion`, `grantedAt`, `retention`) sent with the upload.
4. Deletion endpoint and status/cancellation semantics agreed.
5. Then unlock `NEXT_PUBLIC_LIVE_SCAN_ENABLED` in `src/config/env.ts` and implement the
   multipart upload in `analysePhoto`.

Client-side handling today: the photo is an in-memory Blob/object URL only. Media tracks stop on
capture, close, track end, step change and unmount; object URLs are revoked on retake, remove,
step change and unmount. Never write images to storage, logs, URLs or analytics.

`POST /glow-scan/routines` — body `{ steps: RoutineStep[] }`, response `{ routineId }`. Requires a
signed-in shopper or an agreed anonymous-save design.

## Payments

Locked off. Plan prices live in `src/config/pricing.ts`; no checkout, card capture or
"Pay now" UI exists. Agree provider (proposed Paystack), webhooks and idempotency before building.
