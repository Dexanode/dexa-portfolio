"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content";
import { useLang } from "./i18n";

export default function MenuOverlay() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

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
      <div
        className={`menu-overlay${open ? " menu-overlay-open" : ""}`}
        aria-hidden={!open}
      >
        <nav className="menu-nav" aria-label="Sections">
          {t.nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${140 + i * 55}ms` : "0ms" }}
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
