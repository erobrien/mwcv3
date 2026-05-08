## Plan: Add physician photo as TRT hero background

1. Copy `user-uploads://image-51.png` → `src/assets/trt-hero-physician.webp` (saved as project asset for bundling/optimization).
2. Update `src/components/landing/trt/TRTHero.tsx`:
   - Import the new asset.
   - Add a full-bleed `<img>` inside the hero `<section>` with `absolute inset-0 w-full h-full object-cover`, `object-position: right center` (keep physician visible on right; form overlays him), `loading="eager"`, `fetchpriority="high"`, `decoding="async"`, empty alt.
   - Add a dual gradient overlay above the image: `linear-gradient(90deg, rgba(0,0,51,0.95) 0%, rgba(0,0,51,0.75) 45%, rgba(0,0,51,0.55) 100%)` plus a subtle bottom fade for text legibility.
   - Keep `background: #000033` on the section as fallback.
   - Ensure content wrapper stays `relative z-10` so headline, checks, and form sit above image.
3. No layout / copy changes — only background treatment.

Result: headline contrast preserved (≥7:1 on left), physician visible behind/around the form on desktop, navy overlay strengthens on mobile so text stays readable.