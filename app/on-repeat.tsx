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

type Track = { uri: string; title: string; meta: string; url: string };

/* Track IDs verified via Spotify oEmbed, 2026-10-31. */
const TRACKS: Track[] = [
  {
    uri: "spotify:track:4swVflM7KtMxzfHBWqPv9S",
    title: "in the dark",
    meta: "amo · 2019",
    url: "https://open.spotify.com/track/4swVflM7KtMxzfHBWqPv9S",
  },
  {
    uri: "spotify:track:5DNMDU7gxgmRyD9XwVVVl5",
    title: "Can You Feel My Heart",
    meta: "Sempiternal · 2013",
    url: "https://open.spotify.com/track/5DNMDU7gxgmRyD9XwVVVl5",
  },
  {
    uri: "spotify:track:4OpmC94xXTITiYKfNJtHrb",
    title: "Throne",
    meta: "That's the Spirit · 2015",
    url: "https://open.spotify.com/track/4OpmC94xXTITiYKfNJtHrb",
  },
  {
    uri: "spotify:track:6o39Ln9118FKTMbM4BvcEy",
    title: "Drown",
    meta: "That's the Spirit · 2015",
    url: "https://open.spotify.com/track/6o39Ln9118FKTMbM4BvcEy",
  },
  {
    uri: "spotify:track:5fpq1wF8xa5tSSlcKHdmGQ",
    title: "sTraNgeRs",
    meta: "single · 2022",
    url: "https://open.spotify.com/track/5fpq1wF8xa5tSSlcKHdmGQ",
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
  const [currentUri, setCurrentUri] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const offTrack = subscribeTrack(setCurrentUri);
    const offSound = subscribeSound(setPlaying);
    return () => {
      offTrack();
      offSound();
    };
  }, []);

  const onPlay = (tr: Track) => {
    if (currentUri === tr.uri) {
      requestSoundToggle();
    } else {
      requestSoundTrack({
        uri: tr.uri,
        title: `Bring Me The Horizon — ${tr.title}`,
        url: tr.url,
      });
    }
  };

  return (
    <section id="on-repeat" aria-labelledby="on-repeat-title">
      <Reveal>
        <p className="kicker">{t.onRepeatKicker}</p>
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
            const active = currentUri === tr.uri;
            const showPause = active && playing;
            return (
              <li
                key={tr.uri}
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
                  aria-label={`Open ${tr.title} on Spotify`}
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
