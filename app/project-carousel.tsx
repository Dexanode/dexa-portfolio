"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/content";
import { useLang } from "./i18n";
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
  const { t } = useLang();
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
    const onScroll = () => {
      const card = track.querySelector<HTMLElement>(".proj-card");
      const step = card ? card.offsetWidth + 24 : track.clientWidth;
      setIndex(Math.round(track.scrollLeft / step));
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
                <span className="proj-mono">{initials(project.name)}</span>
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
