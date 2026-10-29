"use client";

import { useState } from "react";
import { experienceLogos } from "@/content";
import { t } from "./copy";
import Reveal from "./reveal";

function indexOf(i: number) {
  return String(i + 1).padStart(2, "0");
}

export default function ExperienceAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  const jobs = t.experience;

  return (
    <Reveal className="exp-list-wrap">
      <div className="exp-list">
        {jobs.map((job, i) => {
          const open = openIndex === i;
          const logo = experienceLogos[job.org];
          return (
            <div className={`exp-item${open ? " open" : ""}`} key={`${job.org}-${job.dates}`}>
              <button
                type="button"
                className="exp-head"
                onClick={() => setOpenIndex(open ? -1 : i)}
                aria-expanded={open}
                aria-controls={`exp-panel-${i}`}
              >
                <span className="row-index">{indexOf(i)}</span>
                <span className="exp-head-main">
                  {logo && (
                    <span className="exp-logo" aria-hidden="true">
                      <img
                        src={logo.logo}
                        alt=""
                        draggable={false}
                        className={logo.logoInvertLight ? "invert-light" : ""}
                      />
                    </span>
                  )}
                  <span className="exp-head-text">
                    <span className="exp-org">{job.org}</span>
                    <span className="exp-sub">
                      {job.role} — {job.dates}
                    </span>
                  </span>
                </span>
                <span className="exp-icon" aria-hidden="true">
                  {open ? "×" : "+"}
                </span>
              </button>
              <div className="exp-body" id={`exp-panel-${i}`} role="region">
                <ul className="exp-points">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
