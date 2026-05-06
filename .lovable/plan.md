## Goal

Create a new route `/lp/testosterone-v2` that duplicates the existing `/lp/testosterone` (TRTLandingPage) component tree, then rewrites copy and structure to comply with Google Ads Healthcare/Personalized Advertising policies. The original `/lp/testosterone` page is left fully untouched as a control.

## Approach

Rather than reusing the existing `TRT*` components (which hard-code non-compliant copy like "Tired, Low Energy, Losing Muscle?", "It's Probably Your Testosterone", manifesto copy, etc.), I'll create a parallel component set under `src/components/landing/trt-v2/` so edits never touch the original. Visual styling (navy #000033, orange #E8670A, Oswald/Inter, layout patterns) is copied from existing TRT components for consistency.

## Files to create

New page:
- `src/pages/TRTv2CompliantLandingPage.tsx` — assembles the 9 sections in fixed order, sets compliant `<title>` and meta description.

New components in `src/components/landing/trt-v2/`:
1. `TRTv2Header.tsx` — reuse styling from `TRTHeader`; logo + phone + "Book My Consultation" CTA.
2. `TRTv2Hero.tsx` — eyebrow, new H1 "Physician-Led Testosterone Care, In One Visit", sub-copy, 4.9★/200+ reviews row, primary + secondary ghost CTAs, 4 trust checks.
3. `TRTv2TrustBar.tsx` — stats row + certification strip (LegitScript / HIPAA / Google Healthcare Certified).
4. `TRTv2SymptomsAndVisit.tsx` — two-column section: left "Common signs of low testosterone in men" (third-person bullets), right "How your first visit works" (3 timed steps), shared CTA.
5. `TRTv2FirstVisitIncluded.tsx` — single bordered card, 8 green-check inclusions, pricing line with `[$XX]` placeholders, clinical disclaimer, CTA.
6. `TRTv2ReviewsOutcomes.tsx` — outcome stats with required disclaimer + 3 testimonial cards (5★, quote, "First L., City, VA", "Verified Patient Review" badge) + Google reviews link.
7. `TRTv2Locations.tsx` — 3 location cards pulling from `src/data/locations.ts` (name, address, hours, phone, Get Directions, Book at this location).
8. `TRTv2Commitment.tsx` — clinical risk-reversal copy (no "guarantee/promise/money-back") + 3 small icons.
9. `TRTv2FAQ.tsx` — 6-question accordion in specified order, inline CTAs after Q1 and Q6, FAQPage JSON-LD with exact-match text.
10. `TRTv2BookingForm.tsx` — anchored `#booking`, 3 fields (First Name, Phone, Location dropdown), TCPA-compliant micro-text, submit button.
11. `TRTv2Footer.tsx` — full legal name, all 3 clinic addresses, main phone, Privacy/Terms links, full medical disclaimer paragraph, certification badges, copyright.
12. `TRTv2MobileCTA.tsx` — sticky mobile bar with "Book Consultation" + tap-to-call, appears after hero scroll.

Routing:
- `src/App.tsx` — add `<Route path="/lp/testosterone-v2" element={<TRTv2CompliantLandingPage />} />`. No other routes touched.

## Compliance enforcement (applied throughout)

- All symptom/condition language is third-person/general ("Men with low testosterone often experience…", "Common signs include…"). No "you have low T" assertions.
- No "cure / guaranteed / miracle / breakthrough / proven to fix"; outcomes use "may help / many patients report / clinically monitored".
- No shame/negative self-image framing — the existing "Tired of feeling like a worse version of yourself" headline is replaced.
- No countdown timers, no fake scarcity, no exit popups, no auto-open chat.
- No "steroids / anabolic / performance enhancement / bodybuilding" and no named controlled substances (cypionate, enanthate, HCG, anastrozole). "TRT" and "hormone therapy" only.
- Telehealth/virtual visit/ship-to-door language explicitly excluded.
- Outcome stats ("2–5×", "84%") carry the required "Based on internal patient outcomes data… Individual results vary…" disclaimer directly beneath them.
- Pricing line uses `[$XX]` placeholders so marketing fills exact numbers before launch (avoids "misleading pricing" risk).
- TCPA consent micro-text under booking form button.
- Footer carries full medical disclaimer, business name + 3 addresses, phone, Privacy/Terms links, and certification badges (LegitScript / HIPAA / Google Healthcare Certified).
- "Verified Patient Review" badge on each testimonial; testimonials sourced from existing site review data, not fabricated.

## Technical notes

- Pull location data (addresses, hours, phone) from `src/data/locations.ts` to keep NAP consistent with the rest of the site.
- FAQ component renders both visible accordion and a `FAQPage` JSON-LD `<script>` with exact-match Q&A text (per project SEO schema integrity rule).
- Page-level `<title>`: "Testosterone Therapy in Virginia | In-Person Men's Health Clinics | MWC". Meta description focuses on in-person, physician-led, 3 Virginia clinics.
- Sticky mobile CTA uses an `IntersectionObserver` on the hero (matches existing `TRTMobileCTA` pattern).
- Brand tokens reused: navy `#000033` (existing), orange `#E8670A`. The spec lists `#0B1B3F`/`#F26B1F`; existing brand memory locks navy `#000814` / orange `#E8670A` — I'll keep the established site values for visual consistency unless told otherwise.
- All primary CTAs scroll to `#booking`; secondary "See If You Qualify" CTAs also scroll to `#booking` (no separate qualification flow exists yet — adding one is out of scope).
- No changes to `TRTLandingPage.tsx` or any `src/components/landing/trt/*` file.

## Out of scope

- Wiring the booking form to a real backend/CRM (current TRT forms are presentational; v2 will match that pattern and dispatch a `lp_trt_v2_cta_click` analytics event).
- Building a separate `/qualify` quiz for the secondary CTA.
- Filling in real `[$XX]` pricing — left as placeholders for marketing.
