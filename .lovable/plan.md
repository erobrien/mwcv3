## Fix invisible hero pattern on /lp/testosterone

The grid lines were drawn at 4% white opacity over near-black navy, then a second navy gradient layer covered them — net result: nothing visible. Two fixes:

1. **Reorder layers**: navy gradient first, grid pattern on top.
2. **Make the gradient and grid actually readable**:
   - Gradient now goes from `#000033` (left) → `#001A66` → `#002A99` (right), giving real left-to-right depth.
   - Grid lines bumped to 12% white opacity, 56px cells, masked so the left 30% stays solid (for headline contrast) and the pattern fades in across the right side.
   - Add a soft orange radial glow in the top-right corner to anchor the brand color and break up the flat field.

3. **Layer order in the section** (back → front):
   ```
   #000033 base
   navy 90deg gradient (#000033 → #001A66 → #002A99)
   grid pattern (12% white, masked from left)
   orange radial glow (top-right, 18% E8670A)
   content
   ```

Headline still sits on solid `#000033` thanks to the gradient mask + the pattern's left-side fade-out, so contrast stays AA.

### File touched
- `src/components/landing/trt/TRTHero.tsx` — replace the two background `<div>`s with the four-layer stack above.

No other components, copy, or assets change.
