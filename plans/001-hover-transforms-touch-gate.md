# Plan 001 — Gate hover transforms behind `@media (hover: hover)`

- Commit: `4eb705c`
- Severity: LOW | Category: Accessibility (touch)
- Source: improve-animations audit finding #1

## Problem

Several `:hover` rules animate `transform`. On touch devices `:hover` latches after a tap, so the transformed state gets stuck (e.g. a project screenshot stays 3% zoomed after tapping it). Hover-only motion must sit behind `@media (hover: hover) and (pointer: fine)`.

## Current code

`app/globals.css` — these rules animate transform on hover (verified 2026-10-29):

```css
.theme-toggle:hover {          /* ~line 387 */
  border-color: var(--muted);
  transform: rotate(20deg);
}
.touch-btn:hover {              /* ~line 425 */
  transform: translateY(-1px);
  filter: brightness(1.08);
}
.row-link:hover .row-arrow {    /* ~line 737 */
  transform: translate(6px, -6px);
}
.amb-marquee .amb-logo:hover {  /* ~line 848 */
  border-color: color-mix(in srgb, var(--text) 40%, transparent);
  transform: translateY(-3px);
}
.proj-card:hover .proj-shot {   /* ~line 1132 */
  transform: scale(1.03);
}
.val-marquee .val-logo:hover {  /* ~line 1504 */
  border-color: var(--muted);
  transform: translateY(-3px);
}
```

Also dead code (hero buttons were removed in commit `3cf77c7`, nothing renders `.btn` anymore):

```css
.btn:hover {                    /* ~line 911 */
  transform: translateY(-2px);
}
```

Hover rules that only change color/border (`.sound-pill:hover`, `.menu-btn:hover`, `.menu-nav a:hover`, `.footer a:hover`, `.copy-email:hover`, `.proj-nav button:hover`) are fine on touch — leave them alone.

## Target

All transform-on-hover rules only apply on hover-capable pointers. Dead `.btn` CSS removed.

## Steps

1. In `app/globals.css`, cut the six transform hover rules listed above (keep their color/border declarations OUT — actually move the whole rule; color/border changes are harmless inside the media query too, and keeping each rule intact avoids splitting declarations).
2. Paste them inside one consolidated block placed just before the `@media (prefers-reduced-motion: reduce)` section:
   ```css
   @media (hover: hover) and (pointer: fine) {
     .theme-toggle:hover { border-color: var(--muted); transform: rotate(20deg); }
     .touch-btn:hover { transform: translateY(-1px); filter: brightness(1.08); }
     .row-link:hover .row-arrow { transform: translate(6px, -6px); }
     .amb-marquee .amb-logo:hover { border-color: color-mix(in srgb, var(--text) 40%, transparent); transform: translateY(-3px); }
     .proj-card:hover .proj-shot { transform: scale(1.03); }
     .val-marquee .val-logo:hover { border-color: var(--muted); transform: translateY(-3px); }
   }
   ```
3. Delete the dead `.btn:hover` rule (~line 911) and its reduced-motion override (~line 1653: `.btn:hover { transform: none; }`).
4. Run `npx tsc --noEmit` and `npm run build` — must pass.

## Scope boundaries

- Do NOT touch the tooltip `::after` rules (`.amb-logo:hover::after`, `.val-logo:hover::after`) — showing the name tooltip on tap is desired touch behavior.
- Do NOT touch color-only hover rules.
- Do NOT change any transition durations or easings.

## Verification (feel-check)

1. Desktop: hover each element — the transform effects must still work exactly as before.
2. Mobile emulation (DevTools device toolbar, or a real phone): tap a project card image — it must NOT stay zoomed after the tap. Tap the theme toggle — no stuck rotation.
3. Confirm no visual regression in either theme (light/dark toggle).
