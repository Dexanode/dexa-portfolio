# Animation plans — dexa-portfolio

Audit: `improve-animations` skill (emilkowalski), run 2026-10-29 against commit `4eb705c`.
Verdict: no HIGH findings. Motion foundation is sound (no `ease-in`, no `transition: all`, no `scale(0)`, linear marquees, interruptible magnetic/quickTo, reversible menu timeline, reduced-motion gated in all JS).

## Recommended execution order

| # | Plan | Leverage | Depends on | Status |
|---|------|----------|------------|--------|
| 1 | [001-hover-transforms-touch-gate](001-hover-transforms-touch-gate.md) | Touch correctness | — | executed 2026-10-29 (commit 8e99a79) |
| 2 | [002-easing-token-consolidation](002-easing-token-consolidation.md) | Token hygiene | — | executed 2026-10-29 (commit 8e99a79) |
| 3 | [003-will-change-hygiene](003-will-change-hygiene.md) | Layer hygiene | — | executed 2026-10-29 (commit 8e99a79) |
| 4 | [006-theme-toggle-icon-crossfade](006-theme-toggle-icon-crossfade.md) | Delight | — | executed 2026-10-29 (commit 8e99a79) |
| 5 | [007-copy-email-feedback-fade](007-copy-email-feedback-fade.md) | Delight | — | executed 2026-10-29 (commit 8e99a79) |
| 6 | [008-carousel-counter-microshift](008-carousel-counter-microshift.md) | Delight | — | executed 2026-10-29 (commit 8e99a79) |
| 7 | [004-reduced-motion-scope](004-reduced-motion-scope.md) | A11y refinement | 001 (note on `.btn:hover`) | executed 2026-10-29 (commit 8e99a79) |
| 8 | [005-accordion-grid-rows-verify](005-accordion-grid-rows-verify.md) | Verify-and-keep | — | verified, kept (standard technique, occasional interaction; no code change) |

Plans are independent except 004 ↔ 001 (the `.btn:hover` cleanup; if 001 is applied, 004's step 3 fallback is skipped).

## How to execute

Each plan is self-contained: exact file paths, current-code excerpts, target values, ordered steps, scope boundaries, and a feel-check verification. An executor needs no other context. After implementing a plan, update its Status above and re-run `npx tsc --noEmit` + `npm run build`.
