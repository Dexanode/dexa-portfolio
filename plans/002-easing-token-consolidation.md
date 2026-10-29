# Plan 002 — Consolidate hand-typed easings onto the `--ease-out` token

- Commit: `4eb705c`
- Severity: LOW | Category: Cohesion & tokens
- Source: improve-animations audit finding #2

## Problem

`cubic-bezier(0.22, 1, 0.36, 1)` is hand-typed in three places while the repo already defines a near-identical token `--ease-out: cubic-bezier(0.22, 0.61, 0.36, 1)` (`app/globals.css:14`). Five near-identical curves is exactly the consolidation finding the playbook describes. The visual difference between the two curves is imperceptible; the token wins for consistency.

## Current code

`app/globals.css`:

```css
.preloader-logo {
  animation: preloader-logo-in 1.1s cubic-bezier(0.22, 1, 0.36, 1) both;  /* ~line 239 */
}
.header {
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);              /* ~line 1664 */
}
.bottom-nav {
  transition:
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),                       /* ~line 1689 */
    opacity 0.4s ease;
}
```

Token (already exists, `app/globals.css:14`):

```css
--ease-out: cubic-bezier(0.22, 0.61, 0.36, 1);
```

## Target

All three usages reference `var(--ease-out)`. No other easing changes.

## Steps

1. Line ~239: `animation: preloader-logo-in 1.1s var(--ease-out) both;`
2. Line ~1664: `transition: transform 0.5s var(--ease-out);`
3. Line ~1689: `transform 0.55s var(--ease-out),`
4. Run `npx tsc --noEmit` and `npm run build` — must pass.

## Scope boundaries

- Do NOT touch GSAP easings (`power3.out`, `power2.inOut`) — those are a separate, deliberate system.
- Do NOT touch bare `ease` on hover/color transitions — correct per the playbook (hover/color → `ease`).
- Do NOT touch the preloader exit curve `cubic-bezier(0.76, 0, 0.24, 1)` (~line 115) — deliberately different (swift exit).

## Verification (feel-check)

1. Reload: preloader logo entrance, header slide-away on scroll, bottom-nav pill entrance — all should feel identical to before (the curves differ by an imperceptible amount).
2. Toggle reduced-motion in DevTools rendering panel — nothing should animate (unchanged behavior).
