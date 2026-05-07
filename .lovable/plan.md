## Goal
Remove the "Turn On Your Testosterone" Optimal/Low T toggle section (TRTSymptomToggle) from `/lp/testosterone` while preserving a clean, alternating background rhythm down the page.

## Current section order & backgrounds
1. TRTHero — navy
2. TRTTrustBar — navy
3. TRTInlineLeadMobile — cream (mobile only)
4. TRTHowItWorks — cream
5. TRTSymptomToggle — navy ← remove
6. TRTResults — cream
7. TRTManifesto — navy
8. TRTMarquee — orange (divider strip)
9. TRTPricingCTA — orange
10. TRTPillars — navy
11. TRTLocations — white
12. TRTFAQ — cream
13. TRTFinalCTA — navy

Removing SymptomToggle would leave HowItWorks(cream) → Results(cream), breaking the rhythm.

## Change
Edit `src/pages/TRTLandingPage.tsx` only. Remove `<TRTSymptomToggle />` and reorder so cream/navy alternates:

```text
TRTHero               navy
TRTTrustBar           navy
TRTInlineLeadMobile   cream (mobile)
TRTHowItWorks         cream
TRTManifesto          navy   ← moved up
TRTResults            cream
TRTPillars            navy   ← moved up
TRTMarquee            orange (divider)
TRTPricingCTA         orange
TRTLocations          white
TRTFAQ                cream
TRTFinalCTA           navy
```

Also remove the `TRTSymptomToggle` import line.

## Notes
- No component internals change; only page composition.
- Marquee + PricingCTA stay paired as the orange "break" between the editorial cream/navy stack and the white Locations block.
- No copy, schema, or tracking changes.

## Files
- `src/pages/TRTLandingPage.tsx` (edit imports + JSX order)
