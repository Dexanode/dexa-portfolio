"use client";

import { useRef } from "react";
import { experience } from "@/content";

export default function ExperienceCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const nudge = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".exp-card");
    const step = card ? card.offsetWidth + 16 : 320;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="carousel">
      <div className="carousel-track" ref={trackRef}>
        {experience.map((job) => (
          <article className="card exp-card" key={`${job.org}-${job.dates}`}>
            <div className="exp-top">
              <div>
                <h3>{job.role}</h3>
                <p className="org">{job.org}</p>
              </div>
              <p className="dates">{job.dates}</p>
            </div>
            <ul className="points">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="carousel-controls">
        <button
          type="button"
          className="btn btn-ghost carousel-btn"
          onClick={() => nudge(-1)}
          aria-label="Scroll experience backward"
        >
          ← Prev
        </button>
        <button
          type="button"
          className="btn btn-ghost carousel-btn"
          onClick={() => nudge(1)}
          aria-label="Scroll experience forward"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
