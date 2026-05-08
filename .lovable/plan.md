# Yacht Tequila Sunrise — /New page

Scope is strictly the `/New` route (`NewLandingPage.tsx`) and its TRT components. No other pages, funnels, or shared components change.

## 1. Add tokens (additive, non-breaking)

In `src/index.css` `:root`, add a new yacht palette alongside existing tokens (do NOT mutate `--bg-black` or shadcn vars — that would leak into the rest of the site):

```text
--yacht-navy: #122256
--yacht-navy-light: #1A2E6E
--yacht-near-black: #0D0807
--yacht-orange: #E8670A
--yacht-orange-hover: #D45A00
--yacht-orange-tint: #FFFAF5
--yacht-slate: #8EA0B5
--yacht-slate-light: #B5C4D1
--yacht-slate-dark: #6B7F94
--yacht-teak: #DCDAC6
--yacht-teak-light: #E8E6D6
--yacht-teak-border: #D0CEBC
--yacht-cream: #F2F1EB
--yacht-text: #1A1A1A
--yacht-text-secondary: #4A4A4A
--yacht-text-muted: #888888
--yacht-border: #E8E5E0
--yacht-success: #2D8A4E
--yacht-error: #C0392B
--shadow-yacht-sm: 0 1px 3px rgba(13,8,7,0.06)
--shadow-yacht-md: 0 4px 12px rgba(13,8,7,0.08)
--shadow-yacht-lg: 0 12px 32px rgba(13,8,7,0.12)
--shadow-yacht-card: 0 2px 8px rgba(13,8,7,0.04)
--shadow-yacht-orange: 0 4px 12px rgba(232,103,10,0.25)
```

Add Bebas Neue to the existing Google Fonts import (Inter + Oswald already loaded). Bebas becomes the heading family on /New only — Oswald stays default elsewhere.

In `tailwind.config.ts`, extend (not replace) `colors` with a `yacht.*` group and `fontFamily.bebas` so TRT components can use utility classes if convenient.

## 2. Refactor TRT components

For each component, swap inline hex usage to the yacht palette and apply the new system. Components in scope:

- `TRTHeader.tsx`
- `TRTHero.tsx`
- `TRTHeroForm.tsx`
- `TRTTrustBar.tsx`
- `TRTHowItWorks.tsx`
- `TRTManifesto.tsx`
- `TRTResults.tsx`
- `TRTPillars.tsx`
- `TRTMarquee.tsx`
- `TRTLocations.tsx`
- `TRTFAQ.tsx`
- `TRTFinalCTA.tsx`
- `TRTFooter.tsx`
- `TRTMobileCTA.tsx`
- `SectionReveal.tsx` (no color change; verify only)

### Color mapping

```text
#000814 / #000033 / #0B1220 / #0A1628  → navy #122256
hero overlay near-black                → #0D0807
#F5F1E8 / #F5F0EB cream                → #F2F1EB
section alt bg                          → cream #F2F1EB and white #FFFFFF (alternating)
1-2 dark navy sections max (e.g. Hero, FinalCTA)
gold star #C9A961                       → keep
orange #E8670A                          → unchanged; hover #D45A00
secondary text on light                → #4A4A4A
muted text on light                    → #888888
borders on light                       → #E8E5E0 (or teak #D0CEBC for warm cards)
borders on dark                        → rgba(255,255,255,0.10)
```

### Typography on /New

- Headings (h1/h2/h3, eyebrow-adjacent display text): Bebas Neue 400, letter-spacing 0.02em. Replace existing `Oswald` in TRT components.
- Body: Inter (unchanged).
- Eyebrow chips: 12px Inter 600, 0.18em tracking, uppercase. Slate-dark `#6B7F94` on light bg; orange `#E8670A` on dark bg.
- Form labels: Inter 600, 0.12em tracking, color `#54595F`.

### Section layout rules

- Alternate white → cream → white → cream across `NewLandingPage.tsx` section order. Hero and FinalCTA = navy `#122256` (the 2 dark sections). Footer stays navy.
- Section vertical padding: `clamp(64px, 10vw, 120px)` to cover 64 mobile / 96 tablet / 120 desktop.
- Max content container: 1200px.

### Buttons (apply to all CTAs in TRT components)

- Primary: bg `#E8670A`, white, Inter 600, 0.02em tracking, padding 14px 28px, radius 4px. Hover bg `#D45A00`, `translateY(-1px)`, shadow `0 4px 12px rgba(232,103,10,0.25)`.
- Secondary (light bg): bg navy `#122256`, white. Hover `#1A2E6E`.
- Ghost on light: transparent, navy text, 1.5px navy border. Hover fills navy with white text.
- Ghost on dark: transparent, white text, 1.5px `rgba(255,255,255,0.4)` border. Hover white bg + navy text.

Existing CTA copy/destinations (e.g. "Book My Consult" → form scroll, location thank-you URLs) stay untouched.

### Cards

- Light card: white, 1px `#E8E5E0`, radius 8px, padding 32px, shadow `0 2px 8px rgba(13,8,7,0.04)`.
- Dark card: bg `#1A2E6E`, 1px `rgba(255,255,255,0.10)`, white text.
- Stat card (TRTResults / TRTTrustBar metrics): white bg, 4px orange left border, Bebas Neue 56px navy number, Inter 600 14px slate-dark `#6B7F94` uppercase label with 0.08em tracking.
- Testimonial / quote blocks (TRTManifesto, TRTMarquee, TRTLocations reviews): cream `#F2F1EB`, 1px `#D0CEBC`, 3px orange top border.

### Hero (`TRTHero.tsx`) specifics

- Background image stays; replace gradient overlay color from `rgba(0,8,20,...)` → `rgba(13,8,7,...)` (near-black). Same opacity stops.
- Eyebrow chip: orange `#E8670A` text + border (was cream).
- Headline: Bebas Neue, white. "In One Visit." accent stays orange.
- Sub-copy and trust checks: white at 85% / 75% opacity.

### Hero form (`TRTHeroForm.tsx`) specifics

- Glass card: keep frosted look but tint navy `rgba(18,34,86,0.55)`, border `rgba(255,255,255,0.12)`.
- Inputs: bg `rgba(13,8,7,0.55)`, border `rgba(255,255,255,0.20)`, focus border `#E8670A`. Text white, placeholder `rgba(255,255,255,0.55)`.
- Select dropdown chevron color → white.
- CTA uses primary button spec above.
- Helper / TCPA text colors switch to white `0.60` muted.

### Footer (`TRTFooter.tsx`)

- Background navy `#122256`, text white, secondary white 75%, dividers `rgba(255,255,255,0.10)`.

## 3. What does NOT change

- `src/index.css` shadcn semantic tokens, `--bg-black`, body defaults.
- `tailwind.config.ts` existing color names.
- Any non-TRT component, page, route, or funnel.
- Copy, conversion logic, form submission, thank-you redirects, schema, SEO meta.
- Memory rules — Oswald remains the global heading font; Bebas Neue is a /New-only override.

## 4. QA checklist after build

1. /New renders at desktop 1958w, tablet ~960, mobile 375 with no layout breaks.
2. Section order shows clean white/cream alternation with hero + final CTA + footer in navy.
3. All CTAs use orange primary; hover lifts and shows orange shadow.
4. Form on dark background remains legible (white text, focus ring orange).
5. No other route (/, /trt, /book, /locations, etc.) shows visual changes — open Index briefly to verify.
