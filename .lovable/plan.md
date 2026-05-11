## Goal

Create `/new2` — a polished, minimal variant of `/new` inspired by seerinteractive.com's aesthetic (deep matte-black background with subtle grain texture, generous spacing, large bold typography, single accent color, gradient pill CTA), but rendered in our brand palette (Midnight Navy `#000814`/`#000033` base, Orange `#E8670A`/`#F97316` accent, Oswald headings, Inter body). Keep the lead form above the fold.

## Approach

1. **Route + page**
   - Add `<Route path="/new2" element={<New2LandingPage />} />` in `src/App.tsx`.
   - Create `src/pages/New2LandingPage.tsx` — composes a new hero + reuses existing TRT sections (TrustBar, HowItWorks, Results, Manifesto, Pillars, Locations, FAQ, FinalCTA, Footer, MobileCTA). Excludes `MobileFooterBar` (already excluded for `/new`-prefixed routes — verify `/new2` is also excluded).

2. **New components folder** `src/components/landing/new2/`
   - `New2Hero.tsx` — full-bleed black bg with subtle SVG noise/grain overlay (data URI), centered eyebrow tag in orange, oversized Oswald headline (clamp ~44–88px), thin muted subhead, gradient pill CTA, two-column on desktop with the form on the right. Form pinned above the fold (min-height ~92vh, content vertically centered).
   - `New2Background.tsx` — reusable wrapper providing the matte-black + noise texture (CSS `background-image` with inline SVG turbulence + radial vignette) so other sections can opt in.

3. **Form**
   - Reuse existing `TRTHeroForm` unchanged (keeps validation/analytics consistent). Wrap in a clean white card with soft shadow against the dark bg, matching Seer's contrast pattern.

4. **Visual language (Seer-inspired, in our palette)**
   - Background: `#000814` base + 4–6% white noise SVG + faint orange radial glow top-right.
   - Accent eyebrow: small uppercase orange label with 0.12em tracking (replaces Seer's pink).
   - Headline: white Oswald, very large, with one orange-underlined keyword (Seer underlines key words in pink — we use orange).
   - CTA: orange→deeper-orange gradient pill (`#F97316 → #E8670A`), arrow icon, hover scale 1.02.
   - Section rhythm: large vertical padding (py-24 md:py-32), max-w-[1200px], generous whitespace.
   - Section dividers: thin `rgba(255,255,255,0.06)` hairlines instead of hard color blocks.

5. **Sections kept (re-skinned via wrapping, no edits to originals)**
   - Hero (new) → TrustBar → HowItWorks → Manifesto → Results → Pillars → Locations → FAQ → FinalCTA.
   - Each wrapped in `<SectionReveal>` for the same opacity-fade reveals used on `/new`.

6. **SEO/meta**
   - Same `document.title` / description pattern as `NewLandingPage.tsx`.

## Out of scope

- No business-logic changes to the form, no new analytics events, no edits to existing TRT section components.
- No new fonts — Oswald + Inter only.
- No emojis, no AI imagery, no glassmorphism (per project memory).

## Files

- New: `src/pages/New2LandingPage.tsx`, `src/components/landing/new2/New2Hero.tsx`, `src/components/landing/new2/New2Background.tsx`
- Edit: `src/App.tsx` (one route), `src/components/shared/MobileFooterBar.tsx` (add `"new2"` to excluded routes)
