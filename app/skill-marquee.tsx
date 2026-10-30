import { Fragment } from "react";
import { t } from "./copy";

const shortLabels = ["Programming", "Trading & DeFi", "Community"];

export default function SkillMarquee() {
  const groups = t.skillGroups;

  const seq = (prefix: string) =>
    groups.map((g, gi) => (
      <Fragment key={`${prefix}-${gi}`}>
        <span className="skill-glabel">{shortLabels[gi] ?? g.title}</span>
        {g.items.map((item) => (
          <span key={`${prefix}-${item}`} className="skill-tag">
            {item}
          </span>
        ))}
      </Fragment>
    ));

  return (
    <div className="skill-marquee">
      <div className="skill-rows">
        <div className="skill-track">
          {seq("a")}
          <span aria-hidden="true" className="skill-dup">
            {seq("b")}
          </span>
        </div>
        <div className="skill-track rev" aria-hidden="true">
          {seq("c")}
          {seq("d")}
        </div>
      </div>
    </div>
  );
}
