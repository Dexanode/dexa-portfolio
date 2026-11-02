"use client";

import { useEffect, useState } from "react";
import Reveal from "./reveal";
import {
  requestSoundTrack,
  requestSoundToggle,
  subscribeSound,
  subscribeTrack,
} from "./sound-bus";
import { t } from "./copy";

type Track = { videoId: string; title: string; meta: string; url: string };

/* Video IDs verified via YouTube oEmbed (official BMTH VEVO uploads), 2026-11-02. */
const TRACKS: Track[] = [
  {
    videoId: "Thazgd1HFus",
    title: "in the dark",
    meta: "amo · 2019",
    url: "https://www.youtube.com/watch?v=Thazgd1HFus",
  },
  {
    videoId: "L5uV3gmOH9g",
    title: "Teardrops",
    meta: "POST HUMAN: SURVIVAL HORROR · 2020",
    url: "https://www.youtube.com/watch?v=L5uV3gmOH9g",
  },
  {
    videoId: "3Nt37RGbVjo",
    title: "DArkSide",
    meta: "POST HUMAN: NeX GEn · 2024",
    url: "https://www.youtube.com/watch?v=3Nt37RGbVjo",
  },
  {
    videoId: "xv-70a6yXfM",
    title: "LosT",
    meta: "POST HUMAN: NeX GEn · 2023",
    url: "https://www.youtube.com/watch?v=xv-70a6yXfM",
  },
  {
    videoId: "FsNGxsrcZas",
    title: "sTraNgeRs",
    meta: "single · 2022",
    url: "https://www.youtube.com/watch?v=FsNGxsrcZas",
  },
];

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <rect x="3.5" y="2.5" width="3.4" height="11" fill="currentColor" />
      <rect x="9.1" y="2.5" width="3.4" height="11" fill="currentColor" />
    </svg>
  );
}

export default function OnRepeat() {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const offTrack = subscribeTrack(setCurrentId);
    const offSound = subscribeSound(setPlaying);
    return () => {
      offTrack();
      offSound();
    };
  }, []);

  const onPlay = (tr: Track) => {
    if (currentId === tr.videoId) {
      requestSoundToggle();
    } else {
      requestSoundTrack({
        videoId: tr.videoId,
        title: `Bring Me The Horizon — ${tr.title}`,
        url: tr.url,
      });
    }
  };

  return (
    <section id="on-repeat" aria-labelledby="on-repeat-title">
      <Reveal>
        <p className="kicker"><span className="kicker-num">08</span>{t.onRepeatKicker}</p>
        <h2 id="on-repeat-title" className="band-headline">
          {t.onRepeatTitle} <span className="dim">{t.onRepeatTitleDim}</span>
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <p className="section-intro">{t.onRepeatSub}</p>
      </Reveal>
      <Reveal delay={160}>
        <ol className="track-list">
          {TRACKS.map((tr, i) => {
            const active = currentId === tr.videoId;
            const showPause = active && playing;
            return (
              <li
                key={tr.videoId}
                className={`track-row${active ? " active" : ""}`}
              >
                <button
                  type="button"
                  className="track-play"
                  onClick={() => onPlay(tr)}
                  aria-label={
                    showPause
                      ? `Pause ${tr.title}`
                      : `Play ${tr.title} by Bring Me The Horizon`
                  }
                  aria-pressed={showPause}
                >
                  <span className="track-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="track-icon" aria-hidden="true">
                    {showPause ? <PauseIcon /> : <PlayIcon />}
                  </span>
                </button>
                <div className="track-info">
                  <p className="track-title">{tr.title}</p>
                  <p className="track-meta">
                    Bring Me The Horizon · {tr.meta}
                  </p>
                </div>
                {showPause && (
                  <span className="track-eq" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                )}
                <a
                  className="track-open"
                  href={tr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${tr.title} on YouTube`}
                >
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
