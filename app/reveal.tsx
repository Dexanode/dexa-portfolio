"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // ScrollTrigger lives on the timeline itself, never on inner tweens.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
      tl.fromTo(
        el,
        { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, delay: delay / 1000 }
      );
      const kicker = el.querySelector(".kicker");
      if (kicker) {
        tl.fromTo(
          kicker,
          { letterSpacing: "0.42em", opacity: 0 },
          {
            letterSpacing: "0.24em",
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
          },
          "<0.1"
        );
      }
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}
