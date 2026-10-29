"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const READY_EVENT = "site:ready";

function markReady() {
  (window as unknown as { __siteReady?: boolean }).__siteReady = true;
  window.dispatchEvent(new Event(READY_EVENT));
}

function isReady() {
  return Boolean((window as unknown as { __siteReady?: boolean }).__siteReady);
}

export default function HeroEntrance() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = () => {
      // Entrance choreography: role line -> title chars -> meta.
      // Position parameters + labels keep the sequencing readable.
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.addLabel("intro", 0);
      tl.from(
        ".hero .role-line",
        { y: 26, opacity: 0, duration: 0.8 },
        "intro"
      );
      tl.addLabel("title", "-=0.55");
      tl.from(
        ".hero .char",
        { yPercent: 115, duration: 1.05, stagger: 0.055 },
        "title"
      );
      tl.addLabel("meta", "-=0.7");
      tl.from(
        ".hero .hero-meta > *",
        { y: 14, opacity: 0, duration: 0.6, stagger: 0.05 },
        "meta"
      );

      // Gentle parallax: title drifts as the hero scrolls away.
      gsap.to(".hero .hero-title", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    };

    if (isReady()) {
      start();
    } else {
      window.addEventListener(READY_EVENT, start, { once: true });
      return () => window.removeEventListener(READY_EVENT, start);
    }
  }, []);

  return null;
}

export { markReady };
