"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Magnetic from "./magnetic";
import { t } from "./copy";
import Reveal from "./reveal";

function CodeIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 16 8 24l9 8" />
      <path d="M31 16l9 8-9 8" />
      <path d="M27 10l-6 28" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 8v32h32" />
      <path d="M14 30l8-9 6 6 10-13" />
      <path d="M32 14h6v6" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="15" r="6" />
      <path d="M6 40c1-8 6-12 12-12s11 4 12 12" />
      <circle cx="34" cy="17" r="5" />
      <path d="M35 28c5 1 8 5 9 10" />
    </svg>
  );
}

const ICONS = [CodeIcon, ChartIcon, UsersIcon];

export default function SkillCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const page = useCallback((dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".skill-card");
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const card = track.querySelector<HTMLElement>(".skill-card");
      const step = card ? card.offsetWidth + 24 : track.clientWidth;
      setIndex(Math.round(track.scrollLeft / step));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const groups = t.skillGroups;

  return (
    <Reveal className="skill-carousel">
      <div className="skill-track" ref={trackRef}>
        {groups.map((group, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <article className="skill-card" key={group.title}>
              <div className="skill-card-top">
                <h3 className="skill-card-title">{group.title}</h3>
                <span className="skill-icon" aria-hidden="true">
                  <Icon />
                </span>
              </div>
              <p className="skill-blurb">{group.blurb}</p>
              <p className="skill-items">{group.items.join("  ·  ")}</p>
              <Magnetic>
                <a className="touch-btn skill-cta" href="#contact">
                  {t.findOutMore}
                  <span className="touch-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </Magnetic>
            </article>
          );
        })}
      </div>
      <div className="proj-nav skill-nav">
        <button
          type="button"
          onClick={() => page(-1)}
          aria-label="Previous skill"
          disabled={index === 0}
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => page(1)}
          aria-label="Next skill"
          disabled={index >= groups.length - 1}
        >
          →
        </button>
        <span className="proj-counter" aria-hidden="true">
          {String(Math.min(index + 1, groups.length)).padStart(2, "0")} /{" "}
          {String(groups.length).padStart(2, "0")}
        </span>
      </div>
    </Reveal>
  );
}
