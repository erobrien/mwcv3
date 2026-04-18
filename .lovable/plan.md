
## Goal
Add a non-destructive **annotation overlay** on `/bookv2` that turns the live funnel into a clickable mockup spec for the dev team. Zero changes to forms, fields, or business logic.

## How it works
- Activated via either `?spec=1` query param OR a small floating "🛠 Spec Mode" toggle button (bottom-right corner) so the team can flip it on/off from any step.
- When active: numbered orange callout markers appear pinned next to each meaningful element (screen header, field, button, transition trigger). Markers float over the UI without affecting layout.
- Clicking a marker opens a side panel (right side, slides in) with that callout's full definition: label, type, required/optional, validation, behavior, copy rationale.
- An "All callouts for this step" link at the panel top opens a scrollable list of every annotation on the current step.

## Architecture

### 1. New file: `src/components/booking-v2/spec/specAnnotations.ts`
Single source of truth — a typed registry keyed by `step` (1–8) and `id`. Each entry contains:
```ts
{
  id: string;          // stable slug e.g. "step1-firstname"
  step: number;        // 1-8
  number: number;      // visible numeric badge per step
  target: string;      // CSS selector or data-spec-id
  label: string;       // "First Name field"
  type: 'screen' | 'field' | 'button' | 'behavior' | 'copy';
  required?: boolean;
  validation?: string;
  behavior?: string;   // auto-advance, transition, etc.
  copyRationale?: string;
  notes?: string;
}
```
All copy lives here so the dev team can read it as a flat reference too.

### 2. New file: `src/components/booking-v2/spec/SpecOverlay.tsx`
- Renders nothing unless spec mode is on.
- Uses `useEffect` + `MutationObserver` to find each annotation's target element (by `[data-spec-id="..."]`) and position an absolutely-positioned numbered badge next to it via `getBoundingClientRect`.
- Updates positions on scroll / resize / step change.
- Opens a right-side panel (`<aside>`, fixed, 360px wide, dark navy with white text matching the funnel theme) when a badge is clicked.
- Panel shows: number, label, type chip, required chip, validation, behavior, copy rationale, notes.
- Esc key + close button dismiss the panel.

### 3. New file: `src/components/booking-v2/spec/SpecModeToggle.tsx`
- Small fixed pill in bottom-right: "🛠 Spec Mode: ON/OFF"
- Stores state in `localStorage` and reflects `?spec=1` query param.
- Clicking toggles a CSS class on `<body>` (`spec-mode-on`) which the overlay hooks into.

### 4. Edit `src/pages/BookingFunnelV2.tsx`
- Mount `<SpecModeToggle />` and `<SpecOverlay currentStep={step} />` at the bottom of the layout.
- **No changes to step rendering, state, or props.**

### 5. Add `data-spec-id="..."` attributes to existing elements
This is the only mutation to the step files — purely additive HTML attributes, no logic, no styling change. I'll add them to:
- `V2StepOne.tsx`: name field, phone field, location card group, SMS consent, CTA, trust line, trust badges
- `V2StepConcern.tsx`: heading, each concern card, auto-advance trigger
- `V2StepDuration.tsx`: heading, each duration card
- `V2StepPriorTreatment.tsx`: heading, Yes button, No button
- `V2StepEmail.tsx`: heading, email field, CTA
- `V2StepThree.tsx` (calendar): month nav, calendar grid, time slots, summary line, SMS reminder, confirm CTA
- `V2StepVerify.tsx`: icon pair, heading, body, helper, email card, phone card, resend link
- `V2StepFour.tsx` (confirmed): checkmark, summary card, calendar buttons, health form upsell, what-to-expect, referral, trust footer
- `V2ProgressBar.tsx`: bar, phase label

### 6. Annotation content
For each marker I'll author Field + Behavior + Copy Rationale, e.g.:
- **Step 1 → First Name field**
  - Type: text input, required
  - Validation: trimmed, non-empty
  - Behavior: enables CTA when combined with phone + location; SMS consent NOT required
  - Copy rationale: placeholder "John" + label "Full Name" personalizes immediately and lowers form anxiety vs "Enter your full name"
- **Step 2 → Concern cards**
  - Behavior: auto-advances to Step 3 after 300ms on selection (per /bookv2 funnel spec)
  - Copy rationale: card-based selection feels lower-friction than a dropdown and qualifies intent for the provider
- (…and so on for every meaningful element)

## Visual style of overlay (matches existing theme)
- Badge: 24px circle, `#E8670A` background, white Montserrat 700 number, subtle drop shadow, `cursor: pointer`, hover scales 1.1.
- Panel: `#0B1029` background, `#FFFFFF` text, `#E8670A` accent borders, Bebas Neue header + Montserrat body — consistent with the funnel.
- Toggle pill: same orange, 44px touch target, bottom-right with 16px offset.

## Notes
- **No form, validation, copy, or state changes.** Only additive: new files + `data-spec-id` attributes.
- Spec mode is opt-in — production users never see it unless they hit `?spec=1`.
- All annotation copy is centralized in `specAnnotations.ts` so the dev team can also export/print it as a flat reference if desired.
