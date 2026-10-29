"use client";

import { useCallback, useEffect, useState } from "react";
import { t } from "./copy";
import { subscribeSound, requestSoundToggle } from "./sound-bus";

/* SG-style floating pill: appears once the top header scrolls away. */
export default function BottomNav({
  menuOpen,
  onToggleMenu,
}: {
  menuOpen: boolean;
  onToggleMenu: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const show = window.scrollY > 480;
        setVisible(show);
        document.body.classList.toggle("is-scrolled", show);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.classList.remove("is-scrolled");
    };
  }, []);

  useEffect(() => subscribeSound(setSoundPlaying), []);

  const toTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <nav
      className={`bottom-nav${visible ? " visible" : ""}`}
      aria-label="Quick navigation"
    >
      <button
        type="button"
        className="bn-logo"
        onClick={toTop}
        aria-label="Back to top"
      >
        <img
          src="/logos/dexa-logo-white.svg"
          alt=""
          className="mark-dark"
          draggable={false}
          loading="lazy"
        />
        <img
          src="/logos/dexa-logo-black.svg"
          alt=""
          className="mark-light"
          draggable={false}
          loading="lazy"
        />
      </button>
      <button
        type="button"
        className={`bn-menu${menuOpen ? " open" : ""}`}
        onClick={onToggleMenu}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? t.menuClose : t.menuOpen}
      >
        <span className="bn-label">{menuOpen ? t.menuClose : t.menuOpen}</span>
        <span className="bn-burger" aria-hidden="true">
          <i />
          <i />
        </span>
      </button>
      <button
        type="button"
        className={`bn-sound${soundPlaying ? " playing" : ""}`}
        onClick={requestSoundToggle}
        aria-pressed={soundPlaying}
        aria-label={soundPlaying ? "Pause music" : "Play music"}
        title="Bring Me The Horizon — In The Dark"
      >
        <span className="bn-label">Sound</span>
        <span className="eq" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      </button>
    </nav>
  );
}
