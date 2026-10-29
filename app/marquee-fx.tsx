"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeFx() {
  useEffect(() => {
    const track = document.querySelector(".marquee-track");
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Seamless loop; timeScale gets a boost from scroll velocity.
    const tween = gsap.fromTo(
      track,
      { xPercent: 0 },
      { xPercent: -50, ease: "none", duration: 28, repeat: -1 }
    );
    const setScale = gsap.quickTo(tween, "timeScale", {
      duration: 0.5,
      ease: "power2.out",
    });
    let reset: number | undefined;

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const boost = Math.min(Math.abs(self.getVelocity()) / 1400, 3);
        setScale(1 + boost);
        window.clearTimeout(reset);
        reset = window.setTimeout(() => setScale(1), 150);
      },
    });

    return () => {
      st.kill();
      tween.kill();
      window.clearTimeout(reset);
    };
  }, []);

  return null;
}
