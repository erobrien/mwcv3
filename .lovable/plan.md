## Remove "Turn On Your Testosterone" Section

Delete the `TRTSymptomToggle` section (the OPTIMAL/LOW T toggle with benefit chips) and re-sequence neighbors so the cream → navy → cream → navy alternation stays intact.

### Current section order & backgrounds

```text
TRTHowItWorks    cream   #F5F0EB
TRTSymptomToggle navy    #000033   ← DELETE
TRTResults       cream   #F5F0EB
TRTManifesto     navy    #000033
TRTMarquee       orange  #E8670A
TRTPricingCTA    orange  #E8670A
TRTPillars       navy    #000033
TRTLocations     white   #FFFFFF
TRTFAQ           cream   #F5F0EB
TRTFinalCTA      navy    #000033
```

Removing `TRTSymptomToggle` puts two cream sections back-to-back (HowItWorks → Results). To preserve alternation, swap `TRTResults` and `TRTManifesto`.

### New order

```text
TRTHowItWorks    cream
TRTManifesto     navy
TRTResults       cream
TRTMarquee       orange
TRTPricingCTA    orange
TRTPillars       navy
TRTLocations     white
TRTFAQ           cream
TRTFinalCTA      navy
```

### Changes

**`src/pages/TRTLandingPage.tsx`**
- Remove `<TRTSymptomToggle />`
- Swap `<TRTResults />` and `<TRTManifesto />` so navy follows cream
- Remove the now-unused `TRTSymptomToggle` import

No other files require edits. The component file itself can stay in the repo (unused) in case we want to bring it back.
