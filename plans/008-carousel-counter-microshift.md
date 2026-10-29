# Plan 008 — Micro-shift the carousel counters on change

- Commit: `4eb705c`
- Severity: LOW | Category: Missed opportunity (additive)
- Source: improve-animations audit, missed opportunity #3.

## Problem

Both carousels swap their counter text instantly:

`app/project-carousel.tsx` (~line 147):
```tsx
<span className="proj-counter" aria-hidden="true">
  {String(Math.min(index + 1, projects.length)).padStart(2, "0")} /{" "}
  {String(projects.length).padStart(2, "0")}
</span>
```

`app/skill-carousel.tsx` (~line 111):
```tsx
<span className="proj-counter" aria-hidden="true">
  {String(Math.min(index + 1, groups.length)).padStart(2, "0")} /{" "}
  {String(groups.length).padStart(2, "0")}
</span>
```

A tiny rise-fade on the changing number ties the counter to the card motion. (Both carousels reuse the `proj-counter` class, so one CSS rule covers both.)

## Target

On page change, the current-number part fades/rises in over 300ms with `cubic-bezier(0.2, 0, 0, 1)`. The total (`/ 03`) stays static.

## Steps

1. `app/project-carousel.tsx`: wrap the dynamic number:
   ```tsx
   <span className="proj-counter" aria-hidden="true">
     <span key={index} className="counter-num">
       {String(Math.min(index + 1, projects.length)).padStart(2, "0")}
     </span>{" "}
     / {String(projects.length).padStart(2, "0")}
   </span>
   ```
   Keep the exact padStart logic and the `aria-hidden` on the outer span. (Find the variable holding the page index in this file — it is `index` per the excerpt; confirm before editing.)
2. `app/skill-carousel.tsx`: same wrap around its dynamic number (its index variable is also `index` per the excerpt; confirm).
3. `app/globals.css`: add near the existing `.proj-counter` rule:
   ```css
   .counter-num { display: inline-block; animation: counter-num-in 300ms cubic-bezier(0.2, 0, 0, 1); }
   @keyframes counter-num-in { from { opacity: 0; transform: translateY(6px); } }
   ```
   One rule covers both carousels since both use `.proj-counter`.
4. Run `npx tsc --noEmit` and `npm run build` — must pass.

## Scope boundaries

- Do NOT touch prev/next buttons, their disabled states, or the scroll-snap logic.
- Do NOT animate the total number or the `/` separator.
- The accessible label (if any) stays in sync — the outer span is `aria-hidden`; confirm no separate aria-label duplicates the counter text (if one exists, update it in the same edit).

## Verification (feel-check)

1. Click next/prev on both carousels: the number rises/fades in, the `/ 03` doesn't move.
2. Rapid clicking: each change re-triggers cleanly (key remount), no stuck state.
3. Keyboard: buttons remain focusable/operable, counter is decorative (aria-hidden) as before.
