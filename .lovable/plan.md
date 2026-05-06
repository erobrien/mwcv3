## Fix locations card color in TRT hero

The "3 Virginia Clinics / Walk Into A Real Clinic Near You" card currently uses `bg-card`, which resolves to the deep navy `--card: 240 29% 14%`. The screenshot shows it rendering as a near-black slate that doesn't match the rest of the OLED Midnight Navy palette (#000814) — it reads as a different hue rather than a sibling surface to the page background.

### Change

In `src/components/landing/trt/TRTHero.tsx`, the second CTA card (Locations):

- Replace `bg-card` with an explicit elevated navy that matches the brand: `#0A1228` (one step lighter than the `#000814` background, same hue family).
- Keep the orange CTA card as-is (it's correct).
- Keep border/typography tokens unchanged.

### Result

The Locations card will read as a clean, slightly elevated navy panel against the page background — same hue family, just lifted — instead of the cool slate cast it has now.

No other files change.