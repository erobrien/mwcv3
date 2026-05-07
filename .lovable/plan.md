# /lp/testosterone — Mobile-first UX & CRO Pass

Focused on the experience at 390px width. Desktop layouts are preserved.

## Issues observed on mobile

1. **Visual monotony** — every two-column section stacks as `text → image`. Feels like one long scroll of copy with photos as afterthoughts.
2. **Hero is too tall** before the first proof point. Trust checks push social proof and form below 2+ scrolls.
3. **Inconsistent CTA targets** — Hero "Book My Consultation" and several mid-page CTAs all jump to `#final-cta`, but there's no early/inline form. Long scroll to convert.
4. **TRTHowItWorks** opens with negative "Sound Familiar?" symptom list before the value prop. On mobile this is the second screen and reads as doom-scroll.
5. **TRTPricingCTA** headline reads `YOUR FIRST VISIT IS .` (trailing period bug, no value).
6. **Mobile CTA bar** uses a single orange button. Adding a tap-to-call half doubles intent capture (matches Locations pattern already in repo).
7. **Image sizing on mobile** — pillar/manifesto/results photos render full-width tall; some need `aspect-ratio` caps so they don't dominate the viewport.

## Changes

### 1. Alternate image/text order on mobile (zig-zag rhythm)
For each two-column section, set the image column to appear *first* on mobile in alternating sections, while desktop stays as designed. Pattern from top down:

| Section | Mobile order |
|---|---|
| TRTHowItWorks | text → steps (unchanged; no hero image) |
| TRTResults | **image/testimonial card → stats** |
| TRTManifesto | text → image (unchanged) |
| TRTPricingCTA | **image → text** |
| TRTPillars | grid (unchanged) |

Implementation: wrap columns with `order-1`/`order-2` classes scoped to `md:order-none` so desktop is untouched.

### 2. Hero tightening (TRTHero)
- Reduce top padding on mobile (`pt-28` → `pt-20`) so the H1 lands higher.
- Move the 4 trust checks into a horizontal-scroll chip row directly under the rating, dropping vertical height by ~120px.
- Drop the secondary "See If You Qualify" button on mobile only (keeps single primary CTA above the fold). Keep on desktop.

### 3. Add inline lead-capture above-the-fold-ish (mobile only)
Insert a compact 3-field card (Name, Phone, Location dropdown → submit) immediately after `TRTTrustBar` on mobile. Reuses the same submit logic as `TRTFinalCTA` (extract handler into a small shared util or call the same endpoint). Hidden on `md+`. This kills the "scroll to bottom to convert" tax.

### 4. TRTHowItWorks — re-order for mobile
On mobile only, render "The Fix / Here's how it works" column **first**, "Sound Familiar?" symptoms second. Lead with solution, follow with pain. Desktop unchanged.

### 5. TRTPricingCTA fixes
- Fix headline: `YOUR FIRST VISIT IS .` → `YOUR FIRST VISIT IS SIMPLE.`
- Mobile: image first, copy + CTA below.

### 6. TRTMobileCTA — split into call + book
Replace the single orange bar with a two-button bar mirroring `LocationMobileCTA`:
- Left 50%: `Call (866) 344-4955` on dark navy
- Right 50%: `Book Consultation` on orange
Triggers same scroll-after-hero visibility logic.

### 7. Image discipline on mobile
Add `aspect-[4/3]` (or `16/10`) wrappers + `object-cover` to photos in `TRTManifesto`, `TRTPricingCTA`, `TRTResults` testimonial card, and `TRTPillars` cards so no single photo eats more than ~55vh.

### 8. Spacing cleanup
- Section vertical padding `py-14` → `py-10` on mobile across TRT sections (keep `md:py-20`). Tighter scroll on small screens.
- Bump body copy line-height to `1.55` on mobile-only blocks of `TRTHowItWorks` and `TRTManifesto` for legibility.

## Files touched

- `src/components/landing/trt/TRTHero.tsx`
- `src/components/landing/trt/TRTHowItWorks.tsx`
- `src/components/landing/trt/TRTResults.tsx`
- `src/components/landing/trt/TRTManifesto.tsx`
- `src/components/landing/trt/TRTPricingCTA.tsx`
- `src/components/landing/trt/TRTPillars.tsx`
- `src/components/landing/trt/TRTMobileCTA.tsx`
- `src/pages/TRTLandingPage.tsx` (insert mobile inline lead form after TRTTrustBar)
- New: `src/components/landing/trt/TRTInlineLeadMobile.tsx`

## Out of scope (call out, don't touch)
- Footer, FAQ, Locations content (recently revised)
- Desktop layouts
- Copy rewrites beyond the headline bug fix in PricingCTA

Approve and I'll implement in build mode.
