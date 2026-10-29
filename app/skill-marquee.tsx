"use client";

import { Fragment, useState } from "react";
import { t } from "./copy";

const shortLabels = ["Programming", "Trading & DeFi", "Community"];

export default function SkillMarquee() {
  const [active, setActive] = useState(0);
  const groups = t.skillGroups;

  const seq = (live: boolean) =>
    groups.map((g, gi) => (
      <Fragment key={gi}>
        {live ? (
          <button
            type="button"
            className={`skill-glabel${active === gi ? " on" : ""}`}
            onClick={() => setActive(gi)}
            aria-pressed={active === gi}
          >
            {shortLabels[gi] ?? g.title}
          </button>
        ) : (
          <span className="skill-glabel">{shortLabels[gi] ?? g.title}</span>
        )}
        {g.items.map((item) => (
          <span key={item} className="skill-tag">
            {item}
          </span>
        ))}
      </Fragment>
    ));

  return (
    <div className="skill-marquee">
      <div className="skill-rows">
        <div className="skill-track">
          {seq(true)}
          <span aria-hidden="true" className="skill-dup">
            {seq(false)}
          </span>
        </div>
        <div className="skill-track rev" aria-hidden="true">
          {seq(false)}
          {seq(false)}
        </div>
      </div>
      <div className="skill-detail" aria-live="polite">
        <h3 key={`t-${active}`} className="skill-detail-title">
          {groups[active].title}
        </h3>
        <p key={`b-${active}`} className="skill-detail-blurb">
          {groups[active].blurb}
        </p>
      </div>
      <p className="skill-hint" aria-hidden="true">
        Hover to pause — click a group to read more
      </p>
    </div>
  );
}
