

## Richmond Location Page Restructure

This is a significant reorganization of the Richmond location page involving reordering sections, adding 3 new features, and reworking 3 existing sections.

---

### Overview of Changes

**Current order:** Hero → Breadcrumb → NAP → WhyMWC → Symptoms → Services → Pricing → Process → Providers → Testimonials → Citations → Comparison → AreasServed → FAQ → UniqueCallout → OtherCenters → CTA

**New order:** Hero → Breadcrumb → Process → Providers → Testimonials → **[Mid CTA]** → Symptoms → Services → Pricing → Comparison → **[Mid CTA]** → Citations (reworked) → **Results (NEW)** → WhyMWC → NAP → AreasServed (trimmed) → FAQ → **[Mid CTA]** → UniqueCallout → OtherCenters → CTA

---

### Part 1: Reorder Sections in RichmondLocation.tsx

Rearrange the component render order in `src/pages/locations/RichmondLocation.tsx` to match the specified sequence. No new imports needed for this step alone.

### Part 2A: New Component — LocationResults

**File:** `src/components/locations/LocationResults.tsx`

- H2: "REAL RESULTS FROM REAL MEMBERS"
- Subtext paragraph with disclaimer framing
- 3 stat cards in a responsive row (1-col mobile, 3-col desktop) using the same white rounded-xl card style as LocationPricing (no icons, no orange borders, no shadows)
- Each card: large bold stat (e.g. "3x"), subtitle text, small treatment label
- Bottom disclaimer in muted small text
- Orange CTA button scrolling to `#location-cta`
- Stats hardcoded for now but structured as props-ready data for future per-location config

### Part 2B: New Component — LocationStickyMobileCTA

**File:** `src/components/locations/LocationStickyMobileCTA.tsx`

Replace the existing `LocationMobileCTA` with an enhanced version:
- Only visible below 768px (`md:hidden`)
- Fixed bottom bar, dark navy background (#1A1A2E), white text
- Two side-by-side buttons: "CALL NOW" (tel link to location phone) + "BOOK ONLINE" (scrolls to `#location-cta`)
- Subtle top shadow/border
- Small X/close button — dismissal stored in `sessionStorage`
- Hidden when `#location-cta` form is in viewport (IntersectionObserver)
- Hidden until user scrolls past hero

### Part 2C: Mid-Page CTA Buttons

**File:** `src/components/locations/LocationMidCTA.tsx`

A simple reusable component rendering the standard orange pill CTA button ("BOOK MY FREE CONSULTATION") that scrolls to `#location-cta`. Insert after:
1. Testimonials section
2. Comparison section
3. FAQ section

### Part 3A: Rework LocationCitations — Stat Cards

**File:** `src/components/locations/LocationCitations.tsx`

Replace the 4 blockquote paragraphs with a 4-column grid (2x2 on mobile) of compact stat cards:
- Bold large stat number, subtitle, small source citation
- Same white card aesthetic as pricing section
- Keep existing disclaimer line

### Part 3B: Trim LocationAreasServed — Remove Directions

**File:** `src/components/locations/LocationAreasServed.tsx`

Remove the expandable "Directions to Our Center" toggle and the turn-by-turn driving direction blocks. Keep intro paragraph, area badges with drive times, and driving context line.

### Part 3C: Tighten Hero Subtext

**File:** `src/data/locations.ts`

Update `richmondLocation.heroAuthorityStatement` to:
> "Board-certified physicians. Same-day labs. Personalized treatment plans for testosterone therapy, ED, and weight loss — walk in with questions and leave the same day with answers."

---

### Files Modified
| File | Action |
|------|--------|
| `src/pages/locations/RichmondLocation.tsx` | Reorder sections, add new component imports |
| `src/components/locations/LocationResults.tsx` | **Create** — outcomes stat cards |
| `src/components/locations/LocationStickyMobileCTA.tsx` | **Create** — enhanced sticky mobile bar |
| `src/components/locations/LocationMidCTA.tsx` | **Create** — reusable mid-page CTA button |
| `src/components/locations/LocationCitations.tsx` | Rework from blockquotes to stat cards |
| `src/components/locations/LocationAreasServed.tsx` | Remove directions blocks |
| `src/data/locations.ts` | Update Richmond hero subtext |

