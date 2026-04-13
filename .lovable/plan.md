

## Plan: Align booking form to top

**What changes**: In `src/components/booking/StepOne.tsx`, the form container currently uses `md:justify-center` and `md:min-h-[calc(100vh-88px)]` to vertically center the content on desktop. I'll change `md:justify-center` to `md:justify-start` and adjust the top padding so the form aligns to the top of the viewport instead of being centered.

**File**: `src/components/booking/StepOne.tsx` (line 49)
- Change `md:justify-center` → `md:justify-start`
- Adjust `md:py-8` → `md:py-10` (or similar) to give comfortable top spacing without centering

