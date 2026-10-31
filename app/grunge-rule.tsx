import { useId } from "react";

/* Standalone distressed divider: a thin rule roughened by turbulence.
   Monochrome metal accent between sections. */
export default function GrungeRule() {
  const id = useId();
  const filterId = `grunge-${id.replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg
      className="grunge-rule"
      viewBox="0 0 1440 24"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id={filterId} x="-5%" y="-200%" width="110%" height="500%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.35"
            numOctaves="3"
            seed="11"
            result="n"
          />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="12" />
        </filter>
      </defs>
      <rect
        x="0"
        y="10"
        width="1440"
        height="3"
        style={{ fill: "var(--border)" }}
        filter={`url(#${filterId})`}
      />
    </svg>
  );
}
