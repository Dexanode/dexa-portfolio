# Plan 007 — Fade the copy-email "Copied" feedback

- Commit: `4eb705c`
- Severity: LOW | Category: Missed opportunity (additive)
- Source: improve-animations audit, missed opportunity #2.

## Problem

`app/page.tsx` `CopyEmail` (~line 331) swaps its label instantly:

```tsx
<button
  type="button"
  className={`copy-email${copied ? " copied" : ""}`}
  onClick={copy}
  aria-live="polite"
>
  {copied ? t.emailCopied : t.copyEmail}
</button>
```

The "Copy email" → "Copied" swap pops. A 250ms fade makes the confirmation feel deliberate. (`aria-live="polite"` already announces the change — keep it.)

## Target

Label change cross-fades (opacity + 4px rise, 250ms ease-out). Button keeps a stable width so the pill doesn't jump between the two label lengths.

## Steps

1. `app/page.tsx`: wrap the label in a keyed span:
   ```tsx
   <span key={copied ? "copied" : "idle"} className="copy-label">
     {copied ? t.emailCopied : t.copyEmail}
   </span>
   ```
   Keep the button, className logic, onClick, and `aria-live="polite"` unchanged.
2. `app/globals.css`: add near the existing `.copy-email` rules (~line 1771):
   ```css
   .copy-email { min-width: 11ch; text-align: center; }  /* merge into existing rule — do not duplicate the selector */
   .copy-label { display: inline-block; animation: copy-label-in 250ms ease-out; }
   @keyframes copy-label-in { from { opacity: 0; transform: translateY(4px); } }
   ```
   Note: merge `min-width`/`text-align` into the existing `.copy-email` rule rather than adding a second one.
3. Run `npx tsc --noEmit` and `npm run build` — must pass.

## Scope boundaries

- Clipboard logic (`navigator.clipboard` + fallback) untouched.
- The 1600ms revert timer untouched.
- No change to the `.copied` border-color state.

## Verification (feel-check)

1. Click "Copy email": label fades up into "Copied", pill width doesn't jump.
2. After 1.6s it fades back to "Copy email".
3. Screen reader still announces the change once (aria-live intact — test with one SR, or at minimum confirm the attribute is still on the button).
4. Reduced-motion on: no rise movement (covered by reduced-motion CSS), opacity fade may remain — acceptable.
