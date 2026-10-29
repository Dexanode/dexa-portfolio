"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content";

const QUOTES = [...profile.roles, "Anonymous by design"];

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("js");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("is-ready");
      setRemoved(true);
      return;
    }
    const start = performance.now();
    const duration = 1700;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setGone(true);
        document.documentElement.classList.add("is-ready");
        window.setTimeout(() => setRemoved(true), 700);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (removed) return null;
  const quote =
    QUOTES[Math.min(QUOTES.length - 1, Math.floor((count / 100) * QUOTES.length))];

  return (
    <div className={`preloader${gone ? " preloader-gone" : ""}`} aria-hidden="true">
      <p className="preloader-quote">{quote}</p>
      <p className="preloader-count">{count}</p>
    </div>
  );
}
