"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./theme";

const WAVES = 5;
const STEP = 8;

/**
 * Animated light-wave lines behind the hero (monochrome).
 * rAF loop follows the Motion best-practices rules: no allocation in the
 * hot path (stroke colors are pre-cached per theme), plain for loops,
 * DPR capped at 2, paused when the hero leaves the viewport, and fully
 * static when the user prefers reduced motion.
 */
export default function HeroWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    if (!canvas || !hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let t = Math.random() * 100;
    // Pre-cached "rgba(...)" strings: [glow0, core0, glow1, core1, ...]
    let strokes: string[] = [];
    let strokesDark = true;

    const rebuildStrokes = (dark: boolean) => {
      strokesDark = dark;
      strokes = [];
      const cr = dark ? 245 : 17;
      const cg = dark ? 245 : 24;
      const cb = dark ? 245 : 39;
      for (let wi = 0; wi < WAVES; wi++) {
        const alpha = 0.3 - wi * 0.05;
        strokes.push(
          `rgba(${cr},${cg},${cb},${(alpha * 0.22).toFixed(3)})`,
          `rgba(${cr},${cg},${cb},${alpha.toFixed(3)})`
        );
      }
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = hero.getBoundingClientRect();
      w = Math.max(1, Math.floor(r.width));
      h = Math.max(1, Math.floor(r.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      if (!running) return;
      const dark = themeRef.current !== "light";
      if (dark !== strokesDark || strokes.length === 0) rebuildStrokes(dark);
      t += 0.008;
      ctx.clearRect(0, 0, w, h);
      const cy = h * 0.62;
      for (let wi = 0; wi < WAVES; wi++) {
        const amp = 24 + wi * 20;
        const yBase = cy - wi * 32;
        for (let pass = 0; pass < 2; pass++) {
          ctx.beginPath();
          ctx.lineWidth = pass === 0 ? 5 : 1.4;
          ctx.strokeStyle = strokes[wi * 2 + pass];
          for (let x = 0; x <= w; x += STEP) {
            const y =
              yBase +
              Math.sin(x * 0.006 + t * 1.6 + wi * 1.1) * amp +
              Math.sin(x * 0.013 - t * 1.1 + wi * 0.6) * amp * 0.4;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        if (visible && !running) {
          running = true;
          raf = requestAnimationFrame(tick);
        } else if (!visible && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(hero);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-waves" aria-hidden="true" />;
}
