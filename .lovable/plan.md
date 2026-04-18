
## Goal
Add a double-opt-in confirmation step in the `/bookv2` funnel right after the user selects a calendar time (Step 6) and before the final confirmation page (currently Step 7).

## Current Flow
```text
1. Name/Phone/Location → 2. Concern → 3. Duration → 4. Prior Treatment → 5. Email → 6. Calendar → 7. Confirmed
```

## New Flow
```text
1. Name/Phone/Location → 2. Concern → 3. Duration → 4. Prior Treatment → 5. Email → 6. Calendar → 7. Verify (NEW) → 8. Confirmed
```

## Implementation

### 1. New component: `src/components/booking-v2/V2StepVerify.tsx`
A standalone "Almost There" verification step styled to match the existing dark navy page background and editorial typography of Step 7 (`V2StepFour`).

Layout:
- Centered container, max-width 480px
- Top: Mail/Phone icon pair (Lucide `Mail` + `MessageSquare`) in orange `#E8670A`, simple — no animation, no glow
- Heading: "You're Almost There!" — Bebas Neue, white, uppercase, same sizing as Step 7's confirmation heading
- Body copy (white/light gray on navy):
  > Check your email and phone right now. We sent a confirmation link to both — your appointment isn't booked until you click it.
- Helper line in muted gray (`#AEB5BF`):
  > Don't see it within a few minutes? Check spam, or call us at 1-866-344-4955. (phone as `tel:` link)
- Two info cards (white background, dark text — matching Step 7 summary card style):
  - Email card: Mail icon + "Check your email" + the captured email address
  - SMS card: MessageSquare icon + "Check your phone" + the captured phone number
- Single CTA button: "I've Confirmed — Show My Booking" → advances to the final confirmed step
  - Uses standard `#E8670A` orange, Montserrat 700, uppercase, 56px height
- Secondary text-only link below: "Resend confirmation" (logs to console for now, no backend wired)

No decorative orbs, glows, or filler — strictly editorial and aligned with the existing system.

### 2. Update `src/pages/BookingFunnelV2.tsx`
- Change `Step` type from `1 | 2 | 3 | 4 | 5 | 6 | 7` to `1 | 2 | 3 | 4 | 5 | 6 | 7 | 8`
- Insert new Step 7 (Verify) between current Step 6 (Calendar) and current Step 7 (Confirmed, becomes Step 8)
- Step 6's `onNext` advances to Step 7 (Verify) instead of jumping to confirmation
- Step 7 (Verify) advances to Step 8 (Confirmed) on CTA click
- Update back-button visibility condition from `step < 7` to `step < 8`
- Pass `email` and `phone` props into `V2StepVerify`

### 3. Update `src/components/booking-v2/V2ProgressBar.tsx`
Currently expects 7 steps. Needs to handle 8 steps so the new Verify step appears in the progress indicator. I'll inspect this file during implementation to extend the step count and any phase labels (YOU / YOUR VISIT / YOUR TIME / CONFIRMED) — the Verify step belongs to the "CONFIRMED" phase as a sub-step.

## Notes
- This is a UI-only change. No backend, no actual email/SMS verification sending — the user explicitly asked for the visual step. The "I've Confirmed" CTA simply advances the funnel.
- The console payload log on the final step remains unchanged.
- Phone number formatting: use the captured `formData.phone` as-is in the SMS card.

## Files Changed
- `src/components/booking-v2/V2StepVerify.tsx` (new)
- `src/pages/BookingFunnelV2.tsx` (insert step, renumber)
- `src/components/booking-v2/V2ProgressBar.tsx` (extend to 8 steps)
