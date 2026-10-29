"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { t } from "./copy";
import { markReady } from "./hero-entrance";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);
  const [removed, setRemoved] = useState(false);
  const QUOTES = t.preloaderQuotes;

  useEffect(() => {
    document.documentElement.classList.add("js");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markReady();
      setRemoved(true);
      return;
    }
    // Counter runs on a GSAP tween; onUpdate drives the React state.
    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: 100,
      duration: 1.7,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(counter.value)),
      onComplete: () => {
        setCount(100);
        setGone(true);
        markReady();
        window.setTimeout(() => setRemoved(true), 700);
      },
    });
    return () => {
      tween.kill();
    };
  }, []);

  if (removed) return null;
  const quote =
    QUOTES[Math.min(QUOTES.length - 1, Math.floor((count / 100) * QUOTES.length))];

  return (
    <div className={`preloader${gone ? " preloader-gone" : ""}`} aria-hidden="true">
      <div className="preloader-inner">
        <span className="preloader-logo">
          <img src="/logos/dexa-logo-white.svg" alt="" className="mark-dark" draggable={false} />
          <img src="/logos/dexa-logo-black.svg" alt="" className="mark-light" draggable={false} />
        </span>
        <p className="preloader-quote">{quote}</p>
      </div>
      <p className="preloader-count">{count}</p>
    </div>
  );
}
