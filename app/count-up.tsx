"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({
  to,
  suffix = "",
  duration = 2200,
  delay = 400,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const run = () => {
      cancelAnimationFrame(raf.current);
      if (reduce) {
        setVal(to);
        return;
      }
      // Delay lets the parent Reveal fade-in start first, so the
      // counting is actually visible instead of running behind it.
      const startAt = performance.now() + delay;
      const tick = (now: number) => {
        const p = Math.min(Math.max((now - startAt) / duration, 0), 1);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        setVal(Math.round(eased * to));
        if (p < 1) raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);
    };

    // Re-runs on every re-entry: if the user missed it (or it fired
    // while hidden), scrolling away and back replays the count.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) run();
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [to, suffix, duration, delay]);

  return (
    <span ref={ref}>
      {val.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
