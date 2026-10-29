# Plan 005 — Accordion `grid-template-rows` animation: measure, then keep

- Commit: `4eb705c`
- Severity: LOW | Category: Performance
- Source: improve-animations audit finding #5

## Problem (candidate)

`app/globals.css` (~line 1592) animates a layout property:

```css
.exp-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.45s var(--ease-out);
}
.exp-item.open .exp-body {
  grid-template-rows: 1fr;
}
```

The playbook says animate `transform`/`opacity` only — `grid-template-rows` triggers layout + paint + composite every frame. However, this is the standard modern technique for height-auto accordions, the interaction is occasional (not high-frequency), and the alternative (fixed `max-height`) is worse UX. This plan is a verify-and-keep: measure first, change only if the numbers justify it.

## Steps

1. Open the production build locally (`npm run build`, serve `out/`), open DevTools → Performance.
2. Record: expand the Dawn Trade row, collapse it, expand a row with long content. Repeat 3x.
3. Read the frame timings during the 0.45s transition:
   - If p95 frame time stays under ~24ms on a mid-tier mobile emulation (Moto G4 / 4x CPU slowdown): **keep the code as-is**. No change needed — document the measurement in this file's status (see README).
   - If frames consistently exceed ~32ms (visible jank): replace with a FLIP-style approach — measure `scrollHeight` on toggle and animate a wrapper's `height` via GSAP (`gsap.to` with `ease: "power3.out"`, 0.45s), keeping the same easing token feel. Do NOT use a magic `max-height` pixel value.
4. Either way, keep `0.45s var(--ease-out)` as the duration/easing reference.

## Scope boundaries

- Do NOT change the accordion markup, ARIA, or open-one-at-a-time behavior (`app/experience-accordion.tsx` untouched unless the FLIP fallback is taken).
- Do NOT restyle anything.

## Verification (feel-check)

1. Expand/collapse feels smooth on a real phone (or 4x CPU-throttled emulation) — no stutter mid-expand.
2. Reduced-motion on: content appears instantly (unchanged — the transition is already covered by the reduced-motion CSS).
3. Record the verdict (keep vs FLIP) in `plans/README.md` status column.
