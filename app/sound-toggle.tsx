"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { publishSoundState, publishTrack, TrackRequest } from "./sound-bus";

/* Bring Me The Horizon — "in the dark" (amo, 2019), official video.
   YouTube IFrame Player API: full tracks, no Premium needed to embed —
   the viewer's own YouTube Premium (like the user's) makes it ad-free.
   The API script is lazy-loaded on the first play intent so the initial
   page load stays light. */
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
        onReady?: () => void;
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

type Pending = { run: () => void; fallback: () => void };

export default function SoundToggle() {
  const holderRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const playingRef = useRef(false);
  const trackRef = useRef({
    videoId: DEFAULT_VIDEO_ID,
    title: DEFAULT_TITLE,
    url: DEFAULT_URL,
  });
  const apiStateRef = useRef<"idle" | "loading" | "ready" | "blocked">("idle");
  const pendingRef = useRef<Pending[]>([]);
  const [playing, setPlaying] = useState(false);
  const [apiBlocked, setApiBlocked] = useState(false);
  const [pillTitle, setPillTitle] = useState(DEFAULT_TITLE);

  const setPlayingState = (p: boolean) => {
    playingRef.current = p;
    setPlaying(p);
    publishSoundState(p);
  };

  const markBlocked = useCallback(() => {
    apiStateRef.current = "blocked";
    setApiBlocked(true);
    const fns = pendingRef.current;
    pendingRef.current = [];
    fns.forEach((f) => f.fallback());
  }, []);

  /* Inject the YouTube IFrame API on first actual use, then run the action.
     If the API is blocked, run the fallback (open the video URL) instead. */
  const ensurePlayer = useCallback(
    (action: Pending) => {
      if (apiStateRef.current === "blocked") {
        action.fallback();
        return;
      }
      if (playerRef.current) {
        action.run();
        return;
      }
      pendingRef.current.push(action);
      if (apiStateRef.current !== "idle") return;
      apiStateRef.current = "loading";

      const flush = () => {
        const fns = pendingRef.current;
        pendingRef.current = [];
        fns.forEach((f) => f.run());
      };

      const boot = () => {
        const YT = window.YT;
        const holder = holderRef.current;
        if (!YT?.Player || !holder) {
          markBlocked();
          return;
        }
        apiStateRef.current = "ready";
        playerRef.current = new YT.Player(holder, {
          height: "1",
          width: "1",
          videoId: trackRef.current.videoId,
          playerVars: { rel: 0, iv_load_policy: 3, disablekb: 1 },
          events: {
            onReady: flush,
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
        return;
      }
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prev === "function") prev();
        boot();
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = markBlocked;
      document.body.appendChild(script);
      window.setTimeout(() => {
        if (!playerRef.current) markBlocked();
      }, 9000);
    },
    [markBlocked]
  );

  /* The bottom-nav sound button routes through here. */
  useEffect(() => {
    const onRequest = () =>
      ensurePlayer({
        run: () => {
          const p = playerRef.current;
          if (!p) return;
          if (playingRef.current) p.pauseVideo();
          else p.playVideo();
        },
        fallback: () =>
          window.open(trackRef.current.url, "_blank", "noopener,noreferrer"),
      });
    window.addEventListener("dexa:toggle-sound", onRequest);
    return () => window.removeEventListener("dexa:toggle-sound", onRequest);
  }, [ensurePlayer]);

  /* The "On repeat" rows route through here: swap the video and play it.
     loadVideoById autoplays; the click counts as the user gesture. */
  useEffect(() => {
    const onPlayTrack = (e: Event) => {
      const { videoId, title, url } = (e as CustomEvent<TrackRequest>).detail;
      ensurePlayer({
        run: () => {
          trackRef.current = { videoId, title, url };
          setPillTitle(title);
          publishTrack(videoId);
          playerRef.current?.loadVideoById(videoId);
        },
        fallback: () => window.open(url, "_blank", "noopener,noreferrer"),
      });
    };
    window.addEventListener("dexa:play-track", onPlayTrack);
    return () => window.removeEventListener("dexa:play-track", onPlayTrack);
  }, [ensurePlayer]);

  const toggle = useCallback(() => {
    ensurePlayer({
      run: () => {
        const p = playerRef.current;
        if (!p) return;
        if (playingRef.current) p.pauseVideo();
        else p.playVideo();
      },
      fallback: () =>
        window.open(trackRef.current.url, "_blank", "noopener,noreferrer"),
    });
  }, [ensurePlayer]);

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
