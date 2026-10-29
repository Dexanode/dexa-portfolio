"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { profile } from "@/content";
import { useLang } from "./i18n";

export default function MenuOverlay() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reduceRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // One master timeline for open AND close: close just reverses it.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });
      tl.addLabel("fade", 0);
      tl.fromTo(root, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, "fade");
      tl.fromTo(
        ".menu-nav a",
        { y: 44, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.055 },
        "fade+=0.1"
      );
      tl.fromTo(
        ".menu-foot",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 },
        "fade+=0.35"
      );
      tlRef.current = tl;
    }, root);

    return () => {
      ctx.revert();
      tlRef.current = null;
    };
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    const root = rootRef.current;
    if (!tl || !root) return;
    if (reduceRef.current) {
      gsap.set(root, { autoAlpha: open ? 1 : 0 });
      return;
    }
    if (open) {
      tl.timeScale(1).play();
    } else {
      tl.timeScale(1.5).reverse();
    }
  }, [open ]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      <button
        type="button"
        className="menu-btn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? t.menuClose : t.menuOpen}
      >
        {open ? t.menuClose : t.menuOpen}
      </button>
      <div ref={rootRef} className="menu-overlay" aria-hidden={!open}>
        <nav className="menu-nav" aria-label="Sections">
          {t.nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              <span className="menu-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          ))}
        </nav>
        <p className="menu-foot">{profile.handle}</p>
      </div>
    </>
  );
}
