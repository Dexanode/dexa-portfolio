# Plan 004 — Scope reduced-motion CSS: keep fades, drop movement

- Commit: `4eb705c`
- Severity: LOW | Category: Accessibility
- Source: improve-animations audit finding #4

## Problem

`app/globals.css` (~line 1641) nukes everything under reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *,
  *::before,
  *::after {
    transition: none !important;
    animation: none !important;
  }
  .btn:hover { transform: none; }
  .preloader { display: none; }
}
```

The playbook: reduced motion means fewer and gentler animations, not zero — keep transitions that aid comprehension (opacity/color fades), drop position changes. The blanket `transition: none` also kills comprehension-aiding feedback (e.g. accordion/theme state fades). All GSAP motion is already gated in JS, so this CSS only needs to cover CSS transitions/keyframes.

## Target

Under `prefers-reduced-motion: reduce`: keyframes off, transform/filter transitions off, opacity/color/background transitions preserved at their authored durations.

## Steps

1. In `app/globals.css`, replace the universal rule inside the reduced-motion block:
   ```css
   *,
   *::before,
   *::after {
     animation: none !important;
     transition-property: opacity, color, background-color, border-color, outline-color !important;
   }
   ```
   (Durations are intentionally left at their authored values — 160–200ms fades remain gentle and aid comprehension; movement transitions are dropped because `transform`/`filter` are no longer transitioned.)
2. Keep `html { scroll-behavior: auto; }` and `.preloader { display: none; }` unchanged.
3. Delete the now-redundant `.btn:hover { transform: none; }` override inside the block (plan 001 deletes `.btn:hover` entirely; if 001 is not applied, keep this line).
4. Run `npx tsc --noEmit` and `npm run build` — must pass.

## Scope boundaries

- Do NOT touch any JS reduced-motion guards — they stay as the primary gate.
- Do NOT change authored transition durations.
- If plan 001 is applied first, skip step 3's fallback (the `.btn:hover` rule won't exist).

## Verification (feel-check)

1. DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`, reload: no movement anywhere (no reveals sliding, no marquee, no preloader).
2. Toggle light/dark: the theme cross-fade should still be a gentle fade, not an instant snap.
3. Expand an experience accordion row: content appears without sliding — acceptable, comprehension preserved.
4. Turn emulation off: everything animates exactly as before.
