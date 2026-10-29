# Plan 003 — Clear `will-change` after one-shot animations finish

- Commit: `4eb705c`
- Severity: LOW | Category: Performance
- Source: improve-animations audit finding #3

## Problem

`will-change` is declared permanently in CSS for elements that animate once:

```css
.char {                                   /* app/globals.css ~line 593 */
  display: inline-block;
  will-change: transform;
}
.reveal {                                 /* app/globals.css ~line 706 */
  will-change: opacity, transform;
}
```

Every `.reveal` section keeps a dedicated compositor layer forever after its one-time entrance (~20 elements on the page). The playbook: add `will-change` only for the animated span, naming the animated property. (`.marquee-track`'s `will-change: transform` is correct — it animates continuously — leave it.)

## Target

`will-change` is set via JS right before each one-shot animation and cleared on completion. No permanent `will-change` in CSS for `.char` / `.reveal`.

## Steps

1. `app/globals.css`: delete `will-change: transform;` from `.char` and `will-change: opacity, transform;` from `.reveal`.
2. `app/hero-entrance.tsx`: in the `start()` function, before building the timeline, add:
   ```ts
   gsap.set(".hero .char", { willChange: "transform" });
   ```
   and extend the existing char tween:
   ```ts
   tl.from(
     ".hero .char",
     {
       yPercent: 115,
       duration: 1.05,
       stagger: 0.055,
       onComplete: () => gsap.set(".hero .char", { clearProps: "willChange" }),
     },
     "title"
   );
   ```
   (Current tween is at ~line 38-43; keep its label/position `"title"` and everything else unchanged.)
3. `app/reveal.tsx`: inside the `useEffect`, before creating the timeline, add:
   ```ts
   gsap.set(el, { willChange: "opacity, transform" });
   ```
   and add `onComplete` to the timeline defaults:
   ```ts
   const tl = gsap.timeline({
     defaults: { ease: "power3.out" },
     scrollTrigger: { trigger: el, start: "top 88%", once: true },
     onComplete: () => gsap.set(el, { clearProps: "willChange" }),
   });
   ```
4. Run `npx tsc --noEmit` and `npm run build` — must pass.

## Scope boundaries

- Do NOT touch `.marquee-track`'s `will-change`.
- Do NOT change any durations, easings, or triggers.
- The reduced-motion early-returns stay as-is (no animation → no will-change set, correct).

## Verification (feel-check)

1. DevTools → Layers panel (or Rendering → Layer borders): after scrolling through the whole page, `.reveal` elements must NOT retain compositor layers.
2. Reload: hero char stagger and section reveals must look identical to before.
3. Reduced-motion on: no layers created, content visible immediately (unchanged).
