## Restructure /intake to the new 18-step spec

The current intake is a 20-step flow centered on About-You / Emergency Contact / PCP / Symptoms / Reason / Consent. The new spec is an 18-step funnel that splits the identity steps (one field per screen), promotes "Reason for visit" early with a fit-check gate, and ends with a 4-checkbox e-signature.

### New step map (replaces existing Step01–Step20)

```
1.  First + Last name
2.  Phone
3.  Email
4.  Date of Birth (MM/DD/YYYY)
5.  Address (autocomplete) + Apt/Suite (optional)
6.  Main Reason for Visit (radio)
7.  "Are We the Right Fit?" gate (informational; Continue / Not for me)
8.  Primary Care Provider (name, clinic, may-contact radio) — all optional
9.  Diagnoses (multi-select checklist + "None of the above")
10. Hormone history (Yes / No)
11. Medications (textarea, optional)
12. Allergies (textarea, optional)
13. Occupation (optional)
14. Lifestyle — tobacco + alcohol radios
15. Physical Symptoms (multi-select)
16. Mind Symptoms (multi-select)
17. Sexual Symptoms (multi-select)
18. Sign & Submit — 4 consent checkboxes + typed-name e-signature + reCAPTCHA placeholder + "Complete My Intake"
```

A dedicated welcome/intro screen (current Step01) and a final success/thanks screen (current Step20) are kept as wrappers but are not counted in the 18 — internally we'll still route them. Total internal screens: intro + 18 + success = 20 routes, but the progress bar shows "Step X of 18".

### Phase grouping for the progress bar

```
Phase 1 — About You      → steps 1–5
Phase 2 — Your Visit     → steps 6–7
Phase 3 — Health History → steps 8–14
Phase 4 — Symptoms       → steps 15–17
Phase 5 — Sign & Submit  → step 18
```

### Files to create

- `src/intake/components/fields/AddressAutocompleteField.tsx` — Google Places-style autocomplete UI. Mockup-grade: free-text + simulated suggestions list (no API key required for the mockup). Writes street/city/state/postal_code to the store.
- `src/intake/components/fields/AptSuiteField.tsx` — small optional input shown under address.
- `src/intake/components/RecaptchaPlaceholder.tsx` — visual reCAPTCHA "I'm not a robot" mockup checkbox (non-functional).
- New step files Step01–Step18 in a new directory `src/intake/steps-v2/` so the new flow is built side-by-side without breaking the current one during development. After QA we delete `src/intake/steps/` and rename `steps-v2/` to `steps/`.

### Files to modify

- `src/types/intake.ts`
  - Add `address.address2` (Apt/Suite).
  - Add `signature.typed_name` (already present).
  - Replace `phaseForStep` with the new 5-phase mapping above.
  - Set `TOTAL_STEPS = 18`.
  - Split `about_you.full_legal_name` into `first_name` + `last_name` (legal-name field is still recombined for the e-signature comparison on step 18).
- `src/store/intakeStore.ts`
  - Update `initialIntake` for the renamed name fields and `address.address2`.
  - Update `loadFromUrlParams` (first_name/last_name handled directly; the "skip About You" auto-advance becomes "skip to step 5 if name + phone + email + dob all provided").
  - Update `estimateResumeStep` to the new step indices.
- `src/hooks/useStepValidation.ts` — rewrite the switch to the new 18 steps:
  - Step 1: first_name + last_name required
  - Step 2: 10-digit phone
  - Step 3: valid email
  - Step 4: DOB MM/DD/YYYY, ≥18
  - Step 5: street + city + state + ZIP required (apt optional)
  - Step 6: visit.primary_reason required
  - Step 7: no validation (gate screen)
  - Step 8: all optional
  - Step 9: optional (zero selections allowed)
  - Step 10: hormone_therapy.used_before required (Yes/No)
  - Steps 11–13: optional
  - Step 14: tobacco + alcohol required
  - Steps 15–17: optional
  - Step 18: 4 consents true + typed_name matches `${first_name} ${last_name}`
- `src/intake/IntakeFlow.tsx`
  - Update `stepModules` to point at the new 18 step files and adjust `lazy` map.
  - Update `phaseForStep` import / progress wiring to 18 steps.
  - Keep the welcome screen as Step "0" / intro shown before Step 1; final submit screen reused after Step 18.
- `src/intake/components/AppShell.tsx` — adjust progress bar prop expectations (totalSteps = 18, 5 phases). Verify nothing hard-codes 20.
- `src/intake/components/ProgressBar.tsx` — verify segment math handles 5 phases.
- `src/lib/submitIntake.ts` — adjust payload shape: rename name fields, include address2, include the four new consent flags exactly. (Mockup keeps existing console.info pattern.)

### Step 7 — "Are We the Right Fit?" details

Informational screen, no inputs. Body copy from the spec:

> "We treat Low Testosterone, Erectile Dysfunction, and Medical Weight Loss. We are not a primary care, urgent care, or STD clinic."

Two CTAs:
- Primary: "Continue" → step 8
- Secondary link: "This isn't for me" → routes to a soft-landing screen (reuse `DQSoftLanding` pattern from `src/components/booking/DQSoftLanding.tsx`, adapted to the intake visual system).

This screen is shown unconditionally after step 6, regardless of which reason is picked, so the user explicitly acknowledges fit before proceeding.

### Step 9 — Diagnoses options (exact list from spec)

Renders as `CardCheckbox` grid, with the existing "None of the above" toggle clearing all others (same pattern as today's Step13). Options:

High blood pressure, High cholesterol, Diabetes, Heart disease, Stroke, Sleep apnea, Thyroid disorder, Depression or anxiety, Prostate condition, Cancer, Blood clots / DVT, Sickle cell anemia, Priapism, Peyronie's disease, None of the above.

### Step 17 — Sexual Symptoms (new section)

Adds `symptoms.sexual` checklist:

Decreased or absent morning erections, Inability to obtain an erection, Inability to maintain an erection, Decreased turgor or rigidity, Ineffective response to ED medication, Use of medication (Viagra or Cialis), Premature ejaculation.

This already exists in the type (`symptoms.sexual: string[]`) — just wire the UI.

### Step 18 — Sign & Submit

Consents (4 checkboxes, each maps to `consents.*`):
- "I confirm my information is accurate." → `info_accurate`
- "I consent to evaluation and treatment." → `authorize_treatment`
- "I understand telemedicine may be used." → `telemedicine`
- "I acknowledge the Privacy Notice." → `privacy_practices` (with a link opening the existing `ConsentDrawer`)

Plus:
- Typed full legal name (must match `first_name + " " + last_name`, case-insensitive).
- reCAPTCHA placeholder (visual only — `RecaptchaPlaceholder` component).
- CTA: `Complete My Intake →` (orange primary, full width).

On click: validate, set `signature.signed_at`, call `submitIntake`, navigate to the existing success screen.

### Visual / styling notes

- Reuse all existing intake primitives (`StepCard`, `PrimaryCTA`, `TextField`, `PhoneField`, `EmailField`, `MaskedDOBField`, `CardRadio`, `CardCheckbox`, `ChipRow`, `SavedIndicator`, `ConsentDrawer`, `BackButton`, `AppShell`, `ProgressBar`).
- No new visual system — keep Bebas Neue / Montserrat tokens already in `src/intake/styles.css`.
- Keep `useShowErrors` "blur or CTA-tap" reveal pattern on every validated step.
- Keep autosave + resume toast working against the new step indices.

### Out of scope for this change

- Real Google Places API integration (we'll mock suggestions for now; can be wired later).
- Real reCAPTCHA (visual placeholder only).
- Backend submission to GHL — `submitIntake` continues its current console-log/mock behavior; no Lovable Cloud changes.

### Migration / cleanup

After the new flow renders correctly, delete `src/intake/steps/Step01.tsx`–`Step20.tsx`, rename `steps-v2/` → `steps/`, and update imports in `IntakeFlow.tsx`. The `IntakePage` route (`/intake`) stays the same.
