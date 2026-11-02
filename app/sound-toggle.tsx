"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { publishSoundState, publishTrack, TrackRequest } from "./sound-bus";

/* Bring Me The Horizon — "in the dark" (amo, 2019), official video.
   YouTube IFrame Player API: full tracks, no Premium needed to embed —
   the viewer's own YouTube Premium (like the user's) makes it ad-free. */
const DEFAULT_VIDEO_ID = "Thazgd1HFus";
const DEFAULT_TITLE = "Bring Me The Horizon — in the dark";
const DEFAULT_URL = "https://www.youtube.com/watch?v=Thazgd1HFus";

type YTPlayerInstance = {
  loadVideoById: (videoId: string) => void;
  playVideo: () => void;
  pauseVideo: () => void;
};

type YTNamespace = {
  Player: new (
    element: HTMLElement,
    options: {
      height?: string;
      width?: string;
      videoId?: string;
      playerVars?: Record<string, number | string>;
      events?: {
        onStateChange?: (e: { data: number }) => void;
      };
    }
  ) => YTPlayerInstance;
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
};

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: YTNamespace;
  }
}

export default function SoundToggle() {
  const holderRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const playingRef = useRef(false);
  const trackRef = useRef({
    videoId: DEFAULT_VIDEO_ID,
    title: DEFAULT_TITLE,
    url: DEFAULT_URL,
  });
  const [playing, setPlaying] = useState(false);
  const [apiBlocked, setApiBlocked] = useState(false);
  const [pillTitle, setPillTitle] = useState(DEFAULT_TITLE);

  const setPlayingState = (p: boolean) => {
    playingRef.current = p;
    setPlaying(p);
    publishSoundState(p);
  };

  useEffect(() => {
    let cancelled = false;

    const boot = () => {
      const YT = window.YT;
      if (cancelled || playerRef.current || !holderRef.current || !YT) return;
      playerRef.current = new YT.Player(holderRef.current, {
        height: "1",
        width: "1",
        videoId: trackRef.current.videoId,
        playerVars: { rel: 0, iv_load_policy: 3, disablekb: 1 },
        events: {
          onStateChange: (e) => {
            const PS = window.YT?.PlayerState;
            if (!PS) return;
            if (e.data === PS.PLAYING) setPlayingState(true);
            else if (e.data === PS.PAUSED || e.data === PS.ENDED)
              setPlayingState(false);
          },
        },
      });
    };

    if (window.YT?.Player) {
      boot();
      return () => {
        cancelled = true;
      };
    }

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === "function") prev();
      boot();
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => {
      if (!cancelled) setApiBlocked(true);
    };
    document.body.appendChild(script);
    const timer = window.setTimeout(() => {
      if (!cancelled && !playerRef.current) setApiBlocked(true);
    }, 9000);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* The bottom-nav sound button routes through here. */
  useEffect(() => {
    const onRequest = () => {
      const p = playerRef.current;
      if (!p) return;
      if (playingRef.current) p.pauseVideo();
      else p.playVideo();
    };
    window.addEventListener("dexa:toggle-sound", onRequest);
    return () => window.removeEventListener("dexa:toggle-sound", onRequest);
  }, []);

  /* The "On repeat" rows route through here: swap the video and play it.
     loadVideoById autoplays; the click counts as the user gesture. */
  useEffect(() => {
    const onPlayTrack = (e: Event) => {
      const { videoId, title, url } = (e as CustomEvent<TrackRequest>).detail;
      const p = playerRef.current;
      if (apiBlocked || !p) {
        window.open(url, "_blank", "noopener,noreferrer");
        return;
      }
      trackRef.current = { videoId, title, url };
      setPillTitle(title);
      publishTrack(videoId);
      p.loadVideoById(videoId);
    };
    window.addEventListener("dexa:play-track", onPlayTrack);
    return () => window.removeEventListener("dexa:play-track", onPlayTrack);
  }, [apiBlocked]);

  const toggle = useCallback(() => {
    const p = playerRef.current;
    if (p) {
      if (playingRef.current) p.pauseVideo();
      else p.playVideo();
    } else if (apiBlocked) {
      /* YouTube API blocked (e.g. ad-blocker): open the video instead. */
      window.open(trackRef.current.url, "_blank", "noopener,noreferrer");
    }
  }, [apiBlocked]);

  return (
    <>
      <div ref={holderRef} className="youtube-holder" aria-hidden="true" />
      <button
        type="button"
        className={`sound-pill${playing ? " playing" : ""}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pause music" : "Play music"}
        title={pillTitle}
      >
        <span>Sound</span>
        <span className="eq" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      </button>
    </>
  );
}
