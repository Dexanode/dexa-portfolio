"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { projects } from "@/content";
import Magnetic from "./magnetic";
import { t } from "./copy";
import Reveal from "./reveal";

function hostOf(href: string) {
  return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

const VISUALS = ["proj-visual-a", "proj-visual-b", "proj-visual-c"];

export default function ProjectCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const page = useCallback((dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".proj-card");
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(
      track.querySelectorAll<HTMLElement>(".proj-card")
    );
    const monos = cards.map((c) =>
      c.querySelector<HTMLElement>(".proj-mono")
    );
    const onScroll = () => {
      const card = track.querySelector<HTMLElement>(".proj-card");
      const step = card ? card.offsetWidth + 24 : track.clientWidth;
      setIndex(Math.round(track.scrollLeft / step));
      if (reduce) return;
      // Parallax: monogram drifts against the card's travel direction.
      const vw = window.innerWidth;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const offset = (r.left + r.width / 2 - vw / 2) / vw;
        const mono = monos[i];
        if (mono) {
          gsap.to(mono, {
            x: offset * -60,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="proj-carousel">
      <div className="proj-track" ref={trackRef}>
        {projects.map((project, i) => (
          <article className="proj-card" key={project.href}>
            <Reveal className="proj-visual-wrap">
              <div
                className={`proj-visual ${VISUALS[i % VISUALS.length]}`}
                aria-hidden="true"
              >
                {project.screenshot ? (
                  <img
                    className="proj-shot"
                    src={project.screenshot}
                    alt=""
                    draggable={false}
                    loading="lazy"
                  />
                ) : project.logo ? (
                  <img
                    className={`proj-mono proj-logo${
                      project.logoInvertLight ? " invert-light" : ""
                    }`}
                    src={project.logo}
                    alt=""
                    draggable={false}
                  />
                ) : (
                  <span className="proj-mono">{initials(project.name)}</span>
                )}
                <span className="proj-glow" />
              </div>
            </Reveal>
            <div className="proj-info">
              <h3 className="proj-title">{project.name}</h3>
              <p className="proj-kind">
                {(project.kind === "Own project" ? t.kindOwn : t.kindClient) +
                  " — " +
                  hostOf(project.href)}
              </p>
              <Magnetic>
                <a
                  className="touch-btn proj-open"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.openProject}
                  <span className="touch-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </Magnetic>
            </div>
          </article>
        ))}
      </div>
      <div className="proj-nav">
        <button
          type="button"
          onClick={() => page(-1)}
          aria-label="Previous project"
          disabled={index === 0}
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => page(1)}
          aria-label="Next project"
          disabled={index >= projects.length - 1}
        >
          →
        </button>
        <span className="proj-counter" aria-hidden="true">
          {String(Math.min(index + 1, projects.length)).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
