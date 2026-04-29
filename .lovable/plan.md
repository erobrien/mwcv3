## Goal

Build a mockup patient satisfaction survey at **`/survey`** that reuses the `/bookv2` visual chrome (dark navy `#0B1029`, V2Header, segmented progress bar, white step cards, orange CTA). The survey decides which Google review URL to send the patient to based on their location.

## Two entry scenarios

**Scenario A — GHL-prefilled (warm)**
URL: `/survey?contact_id=abc123&location=virginia-beach&first_name=John`
- `location` query param (one of `virginia-beach | newport-news | richmond`) is trusted.
- Skip the location/identity step. Survey is 3 questions only.

**Scenario B — Cold link**
URL: `/survey` (no params)
- Run the 3 survey questions first, then ask for **location** + **one identity field** (email or phone) at the end so we can attribute the response.
- Identity is captured *after* the rating questions (per your direction) so we don't lose drop-offs before the rating signal.

In both flows: if Q3 ("Would you recommend us?") = **Yes**, redirect to that location's Google review URL. If **No**, route to a friendly internal "thanks for the feedback" page that captures an optional comment (no Google redirect).

## Flow (mockup)

```text
Scenario A (warm, ?location=...)        Scenario B (cold)
─────────────────────────────────       ──────────────────────────────────
1. Overall experience? (5 options)      1. Overall experience? (5 options)
2. Interaction with staff? (5)          2. Interaction with staff? (5)
3. Recommend us? (Yes / No)             3. Recommend us? (Yes / No)
   ├─ Yes → Google review (by loc)      4. Which center did you visit? (3 cards)
   └─ No  → /survey/thanks              5. Email OR phone (one required)
                                           ├─ Yes from Q3 → Google review
                                           └─ No  from Q3 → /survey/thanks
```

Progress bar phases (mirroring V2ProgressBar style):
- Scenario A: 3 segments — `EXPERIENCE` · `STAFF` · `RECOMMEND`
- Scenario B: 4 segments — `EXPERIENCE` · `STAFF` · `RECOMMEND` · `ABOUT YOU`

## Design system (matches /bookv2)

- Page bg `#0B1029`, sticky `V2Header` reused as-is.
- White step card, max-width ~`520px`, centered, rounded `16px`, soft shadow.
- Question prompt: Bebas Neue 22–26px uppercase navy.
- 5-option rating: stacked white cards with thin border, hover/selected = orange border + 6% orange tint (matches `intake-select-card`). Auto-advance 300ms after tap.
- Yes/No on Q3: two large chip buttons side-by-side (`intake-chip` style), no auto-advance — user must confirm with bottom CTA so the redirect feels intentional.
- Bottom: orange pill `PrimaryCTA` ("Next" / "Submit Feedback"), sticky above mobile keyboard. Back link top-left under header (same as bookv2).
- Reuse Montserrat body / Bebas headings already defined in `intake/styles.css`.

## Google review redirects (location → URL)

```ts
const REVIEW_URLS = {
  "virginia-beach": "https://search.google.com/local/writereview?placeid=ChIJYzXsRADruokR9wX5sXQ6AEw",
  "newport-news":   "https://search.google.com/local/writereview?placeid=ChIJs00FguJ5sIkRwYLOLdjOZgg",
  "richmond":       "https://search.google.com/local/writereview?placeid=ChIJP5F8BJ5rsYkR6mdPGbGUmh8",
};
```
(Normalized to https for both VB and Richmond; the http URLs you provided will redirect anyway.)

## Files to create

- `src/pages/SurveyPage.tsx` — route container, owns step state, slide transitions (copy pattern from `BookingFunnelV2.tsx`).
- `src/pages/SurveyThanksPage.tsx` — shown when Q3 = No; "Thanks for the honest feedback" + optional comment textarea + phone CTA.
- `src/components/survey/SurveyProgressBar.tsx` — 3- or 4-segment variant of `V2ProgressBar`.
- `src/components/survey/SurveyRatingStep.tsx` — reusable for Q1 + Q2 (5-option card list, auto-advance).
- `src/components/survey/SurveyRecommendStep.tsx` — Yes/No chips for Q3.
- `src/components/survey/SurveyLocationStep.tsx` — 3 location cards (cold flow only).
- `src/components/survey/SurveyIdentityStep.tsx` — segmented toggle Email/Phone + single field (cold flow only).
- `src/data/reviewUrls.ts` — the `REVIEW_URLS` map + `LOCATION_LABELS`.

## Files to edit

- `src/App.tsx` — add `<Route path="/survey" element={<SurveyPage />} />` and `<Route path="/survey/thanks" element={<SurveyThanksPage />} />` above the catch-all.

## Behavior details

- **Pre-fill parsing**: read `location`, `contact_id`, `first_name` from `URLSearchParams` on mount. If `location` matches one of the 3 slugs → Scenario A; otherwise Scenario B.
- **Header greeting** (subtle): if `first_name` present, show small "Hi, John —" line above Q1 card.
- **Outbound redirect** uses `window.location.assign(url)` so the back button returns to `/survey`. Show a 1-second interstitial card ("Opening Google…") before redirecting, so the transition isn't jarring.
- **Mockup only** — no webhook submission this round; log payload to `console.info('survey_submit', payload)` and `window.dataLayer?.push({ event: 'survey_submitted', ...payload })`. We can wire a real endpoint in a follow-up.
- **Validation**: identity step requires a valid email *or* a 10-digit phone (reuse `formatPhone` from `intake/components/fields/PhoneField`).
- Accessibility: `role="radiogroup"` on rating lists, arrow-key support (already in `CardRadio`), reduced-motion respected.

## Out of scope (this round)

- Real backend submission / GHL webhook (mockup only).
- Token validation / signed URLs (we trust the `location` param for the mockup; flag for prod hardening).
- Multi-language, A/B variants, NPS 0–10 scale.

## Acceptance

- `/survey?location=richmond&first_name=John` → 3 questions, Yes routes to Richmond Google review URL.
- `/survey` (cold) → 3 questions + location + identity, then routes correctly.
- Any "No" on Q3 → `/survey/thanks` (no Google redirect).
- Visual chrome is indistinguishable from `/bookv2` (header, progress bar style, card, CTA).
