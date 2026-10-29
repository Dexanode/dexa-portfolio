# Plan 006 — Cross-fade the theme toggle sun/moon icon

- Commit: `4eb705c`
- Severity: LOW | Category: Missed opportunity (additive)
- Source: improve-animations audit, missed opportunity #1. Uses the better-ui icon recipe: icon swap cross-fades — scale `0.25`→`1`, opacity `0`→`1`, blur `4px`→`0`, `300ms` with `cubic-bezier(0.2, 0, 0, 1)`, bounce always `0`.

## Problem

`app/theme-toggle.tsx` swaps the icon instantly:

```tsx
<span className="theme-icon">{isDark ? <MoonIcon /> : <SunIcon />}</span>
```

A contextual icon swap on an infrequent state change should cross-fade instead of popping.

## Target

Both icons stay in the DOM; the incoming icon fades/scales in while the outgoing one fades out, 300ms, `cubic-bezier(0.2, 0, 0, 1)`.

## Steps

1. `app/theme-toggle.tsx`: replace the icon span with:
   ```tsx
   <span className="theme-icon" aria-hidden="true">
     <span className={`ti${isDark ? " on" : ""}`}>
       <MoonIcon />
     </span>
     <span className={`ti${!isDark ? " on" : ""}`}>
       <SunIcon />
     </span>
   </span>
   ```
   Keep the button, `aria-pressed`, and `aria-label` exactly as they are. Keep `MoonIcon`/`SunIcon` components untouched.
2. `app/globals.css`: find the existing `.theme-icon` rule and extend it (do not remove existing declarations — check what it currently sets for size/layout first):
   ```css
   .theme-icon { position: relative; }
   .theme-icon .ti {
     position: absolute; inset: 0;
     display: inline-flex;
     opacity: 0;
     transform: scale(0.25);
     filter: blur(4px);
     transition: opacity 300ms cubic-bezier(0.2, 0, 0, 1),
       transform 300ms cubic-bezier(0.2, 0, 0, 1),
       filter 300ms cubic-bezier(0.2, 0, 0, 1);
   }
   .theme-icon .ti.on { opacity: 1; transform: scale(1); filter: blur(0); }
   ```
   If the current `.theme-icon` already sets `display`/size, keep those and only add `position: relative`. The `.ti` spans must fill the same box the single icon filled before (verify the svg keeps its current size — check the existing `.theme-icon svg` rule and mirror sizing onto `.ti svg` if needed).
3. Run `npx tsc --noEmit` and `npm run build` — must pass.

## Scope boundaries

- Icon artwork (`MoonIcon`/`SunIcon` paths) untouched.
- No change to the theme toggle behavior itself (`useTheme().toggle`).
- Keep it working under `prefers-reduced-motion`: the fade becomes instant via the global reduced-motion CSS (opacity transition is preserved per plan 004, or instant if 004 isn't applied — either is acceptable; do NOT add a special case).

## Verification (feel-check)

1. Click the toggle: moon shrinks/blurs out while sun grows/blurs in — one smooth 300ms morph, no pop.
2. Rapid double-click: the cross-fade retargets mid-flight (transitions, not keyframes) — no stuck half-state.
3. Both themes: icon color inherits `currentColor` as before (no separate assets).
