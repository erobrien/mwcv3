# MWC Booking Funnel — Pages 2–5

Build a 4-page booking funnel that visually inherits the existing TRT landing page (`/NEW` / `NewLandingPage.tsx`). Reuse `TRTHeader` and `TRTFooter` so chrome is identical across all 5 pages.

## Design token reconciliation

The brief lists slightly different hex values than what's actually shipped on the existing landing. Since the brief explicitly says "visually indistinguishable from the existing landing page," **the existing TRT tokens win**:

| Brief says | Existing site | Use |
|---|---|---|
| Background `#0B1530` | `#0B1029` (TRTHero `navyDeep`) | `#0B1029` |
| Footer navy `#0B1530` | `#000033` (TRTFooter) | `#000033` |
| CTA orange `#F37021` | `#E8670A` (everywhere) | `#E8670A` |
| CTA hover `#D85D14` | `#CF5B09` | `#CF5B09` |
| Off-white text `#F5F1EA` | `#FFFFFF` / `rgba(255,255,255,.85)` | match TRT |
| Display font: Oswald/Bebas/Anton | Inter (TRT uses Inter heavy uppercase, no display font loaded) | **Add Oswald 700 via Google Fonts** for H1/H2 — matches the brief's "GIT YOUR EDGE BACK" condensed look |

All other tokens (border `#1A2547`, success `#22C55E`, muted `#8A95AD`, light border `#E5E7EB`, white card) used as specified.

## Routes & files

Add to `src/App.tsx`:
```
/book/symptom    → BookSymptom
/book/duration   → BookDuration
/book/schedule   → BookSchedule
/book/confirmed  → BookConfirmed
```

New files:
```
src/pages/book/BookSymptom.tsx
src/pages/book/BookDuration.tsx
src/pages/book/BookSchedule.tsx
src/pages/book/BookConfirmed.tsx
src/components/book/BookLayout.tsx        // wraps TRTHeader + main + TRTFooter, sets data-page
src/components/book/SurveyCard.tsx        // shared white card + progress + footer nav bar
src/components/book/OptionRow.tsx         // 72px tappable single-select row
src/components/book/MissingParamBanner.tsx
```

`index.html`: add Oswald 700 to existing Google Fonts link.

## Page 2 — `/book/symptom`

- `BookLayout data-page="symptom"`
- `SurveyCard` props: `step={1}`, `total={2}`, title `WHAT BRINGS YOU IN?`, subtitle `Select your primary concern.`
- 4 `OptionRow`s (Zap, Heart, Scale, HelpCircle from lucide — replacing emoji per existing site convention; the brief shows emoji but project memory bans generic icons in favor of Lucide; flag for confirmation if needed but default to Lucide)
- Footer nav: PREV → `/`, NEXT → `/book/duration?symptom={value}`. NEXT disabled at 40% opacity until selection.

## Page 3 — `/book/duration`

- Identical pattern, `step={2}`, both progress segments filled.
- 4 OptionRows with Clock icon.
- Reads `?symptom=` via `useSearchParams`; if missing, render `MissingParamBanner` above card linking to `/`.
- PREV → `/book/symptom?symptom=X`. NEXT label `SEE AVAILABLE TIMES →` → `/book/schedule?symptom=X&duration=Y`.

## Page 4 — `/book/schedule`

- Hero band (80px navy `#0B1029`): H2 `PICK YOUR CONSULT TIME` (Oswald), subhead `Same or next day. Your first visit is on us.`
- White card max-w 900px containing `<div id="ghl-calendar-embed" style="min-height:700px">` placeholder reading "GHL Calendar Widget — Loaded in production" (centered, muted).
- Trust strip below: 4 items (`4.9★ · 200+ reviews`, `10,000+ men treated`, `Same-day labs`, `Face-to-face physician`). Flex row desktop, 2x2 grid mobile.
- 3 testimonial cards (extract 3 strongest from `TRTResults` / `TRTManifesto`; will read those files when implementing).
- No video.
- Reads both params; soft banner if missing.

## Page 5 — `/book/confirmed`

- Top band 120px navy: green `CheckCircle2` (#22C55E, 56px), H1 `YOU'RE BOOKED.`, subhead 20px `Tuesday, May 12 at 10:30 AM · Newport News` (static placeholder, comments mark GHL merge fields).
- Video card max-w 720px: 16:9 `<div id="welcome-video">` with placeholder thumbnail (solid navy + Play icon overlay), caption `A quick note from your physician — 60 seconds.`, HTML comment for GHL embed.
- "What to Expect" section: 4 numbered orange circles in horizontal row (desktop) / stacked (mobile), styled like `TRTHowItWorks` step circles.
- "Before You Come In" bullet list with orange check icons; address line + secondary outline `Open in Maps` button (`https://www.google.com/maps/search/?api=1&query=...`).
- Two secondary outline buttons: Add to Google / Apple Calendar (no real ICS — GHL injects).
- Bottom grey card: "Running late or need to move it? Just text or call (866) 344-4955." with `tel:` link.
- Bottom of `<body>` (via `useEffect` → no-op, just HTML comments in JSX): pixel placeholder comments for Meta / Google Ads / GA4.

## Shared component details

**`SurveyCard`**
- White bg, max-w 640px, border-radius 12px, border `1px #E5E7EB`, padding 40px / 24px mobile.
- Header: `STEP {n} OF {total}` (uppercase, 14px, `#8A95AD`, letter-spacing 0.1em).
- Progress bar: 2 segments, 4px tall, gap 4px, filled `#E8670A`, unfilled `#E5E7EB`.
- H2 Oswald 700 uppercase, 40px desktop / 28px mobile, `#0B1029`, `text-wrap: balance`.
- Subtitle 16px `#5A6478`.
- Children slot for OptionRows.
- Footer nav bar: orange `#E8670A`, full-width inside card, rounded-b-12, padding 16px 24px. PREV left (white, uppercase 14px, `← PREV`). NEXT right (white, bold, 16px, `LABEL →`). Desktop: sticky inside card. Mobile: `fixed bottom-0 inset-x-0` outside card.

**`OptionRow`**
- `<button>` full-width, 72px desktop / 64px mobile, padding 20px, border 1.5px `#E5E7EB`, radius 12px, gap 16px.
- Icon left (Lucide, 24px, `#E8670A`), label flex-1 left-aligned (16px, weight 500, `#0B1029`), `Check` right shown when selected.
- Selected/hover: border `#E8670A`, bg `#FFF5EE`.
- Focus ring: 2px `#E8670A` outline, 2px offset.
- `transition: border-color 100ms, background-color 100ms`.

## Global behaviors

- `useSearchParams` for read/write; navigation via `useNavigate` preserves params.
- `MissingParamBanner`: small amber-tinted strip above card — "Looks like you started in the middle — start over" linking `/`. No redirect.
- Page transition: wrap page content in a div with `animate-in fade-in duration-200`.
- Set `document.title` per page via `useEffect`.
- Body data attribute: applied via `useEffect` setting `document.body.dataset.page` on mount, cleared on unmount.

## Mobile / a11y

- 16px side padding on mobile, full-width cards.
- Sticky footer nav bar pinned to viewport bottom on mobile (`<768px`); add 88px bottom padding to card so content isn't hidden.
- All interactive: native `<button>` / `<a>`, `:focus-visible` orange outline (2px), `aria-label` on icon-only.
- Tap targets ≥56px (OptionRow 72/64 ok; PREV link gets py-3).

## Out of scope

- Real GHL calendar embed, real video, real ICS files, actual analytics firing — placeholders + comments only.
- No new nav menu, no AI/stock imagery on funnel pages, no new global colors.
- Existing `/NEW`, `/`, and other routes untouched.
