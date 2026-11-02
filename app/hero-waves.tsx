"use client";

import { useEffect, useId, useRef } from "react";
import { useTheme } from "./theme";

const WAVES = 5;
const STEP = 8;
const SPECKS = 90;
const MOUSE_RADIUS = 190;

/**
 * Animated grunge light-wave lines behind the hero (monochrome).
 * - Mouse-reactive: waves push away and roughen near the cursor, with
 *   grunge specks scattering around it.
 * - Grunge edges via an SVG turbulence/displacement filter on the canvas.
 * rAF loop follows the Motion best-practices rules: no allocation in the
 * hot path (colors pre-cached per theme, preallocated speck pool), plain
 * for loops, DPR capped at 2, paused when the hero leaves the viewport,
 * and fully static when the user prefers reduced motion.
 */
export default function HeroWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const filterId = useId().replace(/[^a-zA-Z0-9]/g, "");
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
    // Pre-cached speck alphas (8 quantized levels).
    let speckAlphas: string[] = [];
    let cacheDark = true;
    const rebuildCache = (dark: boolean) => {
      cacheDark = dark;
      const cr = dark ? 245 : 17;
      const cg = dark ? 245 : 24;
      const cb = dark ? 245 : 39;
      strokes = [];
      for (let wi = 0; wi < WAVES; wi++) {
        const alpha = 0.3 - wi * 0.05;
        strokes.push(
          `rgba(${cr},${cg},${cb},${(alpha * 0.22).toFixed(3)})`,
          `rgba(${cr},${cg},${cb},${alpha.toFixed(3)})`
        );
      }
      speckAlphas = [];
      for (let i = 0; i < 8; i++) {
        speckAlphas.push(`rgba(${cr},${cg},${cb},${((i / 7) * 0.5).toFixed(3)})`);
      }
    };

    // Smoothed mouse position in hero-local coords (-9999 = offscreen).
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
    };
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);

    // Preallocated grunge speck pool.
    const sx = new Float32Array(SPECKS);
    const sy = new Float32Array(SPECKS);
    const svx = new Float32Array(SPECKS);
    const svy = new Float32Array(SPECKS);
    const sl = new Float32Array(SPECKS); // life remaining, 0 = dead

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

    const filterUrl = `url(#hw-grunge-${filterId})`;

    const tick = () => {
      if (!running) return;
      const dark = themeRef.current !== "light";
      if (dark !== cacheDark || strokes.length === 0) rebuildCache(dark);
      t += 0.008;
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;

      ctx.clearRect(0, 0, w, h);
      const cy = h * 0.62;
      const mx = mouse.x;
      const my = mouse.y;
      const mouseOn = mx > -9999;

      // Spawn specks near the cursor (at most 2 per frame).
      if (mouseOn) {
        for (let k = 0; k < 2; k++) {
          for (let i = 0; i < SPECKS; i++) {
            if (sl[i] <= 0) {
              sx[i] = mx + (Math.random() - 0.5) * 60;
              sy[i] = my + (Math.random() - 0.5) * 60;
              const a = Math.random() * 6.2832;
              const sp = 0.4 + Math.random() * 1.6;
              svx[i] = Math.cos(a) * sp;
              svy[i] = Math.sin(a) * sp;
              sl[i] = 40 + Math.random() * 50;
              break;
            }
          }
        }
      }

      ctx.save();
      // Grunge displacement; ignored gracefully where ctx.filter is unsupported.
      try {
        ctx.filter = filterUrl;
      } catch {
        /* older browsers: waves render clean */
      }

      for (let wi = 0; wi < WAVES; wi++) {
        const amp = 24 + wi * 20;
        const yBase = cy - wi * 32;
        for (let pass = 0; pass < 2; pass++) {
          ctx.beginPath();
          ctx.lineWidth = pass === 0 ? 5 : 1.4;
          ctx.strokeStyle = strokes[wi * 2 + pass];
          for (let x = 0; x <= w; x += STEP) {
            let disturb = 0;
            let jitter = 0;
            if (mouseOn) {
              const dx = x - mx;
              const dy = yBase - my;
              // Squared distance avoids a sqrt in the hot path.
              const d2 = dx * dx + dy * dy;
              if (d2 < MOUSE_RADIUS * MOUSE_RADIUS) {
                const f = 1 - Math.sqrt(d2) / MOUSE_RADIUS;
                disturb = f * f * 46 * (dy >= 0 ? 1 : -1);
                jitter = (Math.random() - 0.5) * 14 * f;
              }
            }
            const y =
              yBase +
              disturb +
              jitter +
              Math.sin(x * 0.006 + t * 1.6 + wi * 1.1) * amp +
              Math.sin(x * 0.013 - t * 1.1 + wi * 0.6) * amp * 0.4;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
      ctx.restore();

      // Specks drawn crisp (outside the grunge filter).
      for (let i = 0; i < SPECKS; i++) {
        const life = sl[i];
        if (life <= 0) continue;
        sl[i] = life - 1;
        sx[i] += svx[i];
        sy[i] += svy[i];
        svx[i] *= 0.985;
        svy[i] *= 0.985;
        const level = Math.min(7, (life / 40) * 7) | 0;
        ctx.fillStyle = speckAlphas[level];
        const s = 1 + ((life | 0) % 3);
        ctx.fillRect(sx[i], sy[i], s, s);
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
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, [filterId]);

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter
            id={`hw-grunge-${filterId}`}
            x="-5%"
            y="-20%"
            width="110%"
            height="140%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.09"
              numOctaves="3"
              seed="7"
              result="n"
            />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="22" />
          </filter>
        </defs>
      </svg>
      <canvas ref={canvasRef} className="hero-waves" aria-hidden="true" />
    </>
  );
}
