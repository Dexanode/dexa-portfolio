"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { publishSoundState, publishTrack, TrackRequest } from "./sound-bus";

/* Bring Me The Horizon — "in the dark" (amo, 2019) */
const TRACK_URI = "spotify:track:4swVflM7KtMxzfHBWqPv9S";
const TRACK_URL = "https://open.spotify.com/track/4swVflM7KtMxzfHBWqPv9S";

type SpotifyEmbedController = {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  addListener: (
    event: string,
    cb: (e: { data: { isPaused: boolean } }) => void
  ) => void;
};

type SpotifyIframeApi = {
  createController: (
    element: HTMLElement,
    options: { uri: string; width?: string; height?: string },
    callback: (controller: SpotifyEmbedController) => void
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
  }
}

export default function SoundToggle() {
  const holderRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyEmbedController | null>(null);
  const apiRef = useRef<SpotifyIframeApi | null>(null);
  const trackRef = useRef({
    uri: TRACK_URI,
    title: "Bring Me The Horizon — In The Dark",
    url: TRACK_URL,
  });
  const [playing, setPlaying] = useState(false);
  const [apiBlocked, setApiBlocked] = useState(false);
  const [pillTitle, setPillTitle] = useState(trackRef.current.title);

  useEffect(() => {
    let cancelled = false;

    const boot = (api: SpotifyIframeApi) => {
      if (cancelled || controllerRef.current || !holderRef.current) return;
      apiRef.current = api;
      api.createController(
        holderRef.current,
        { uri: TRACK_URI, width: "1", height: "1" },
        (controller) => {
          if (cancelled) return;
          controllerRef.current = controller;
          controller.addListener("playback_update", (e) => {
            const p = !e.data.isPaused;
            setPlaying(p);
            publishSoundState(p);
          });
        }
      );
    };

    const w = window as unknown as Record<string, unknown>;
    if (w.SpotifyIframeApi) {
      boot(w.SpotifyIframeApi as SpotifyIframeApi);
      return () => {
        cancelled = true;
      };
    }

    const prev = w.onSpotifyIframeApiReady as
      | ((api: SpotifyIframeApi) => void)
      | undefined;
    w.onSpotifyIframeApiReady = (api: SpotifyIframeApi) => {
      if (typeof prev === "function") prev(api);
      boot(api);
    };

    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    script.onerror = () => {
      if (!cancelled) setApiBlocked(true);
    };
    document.body.appendChild(script);
    const timer = window.setTimeout(() => {
      if (!cancelled && !controllerRef.current) setApiBlocked(true);
    }, 9000);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  /* The bottom-nav sound button routes through here. */
  useEffect(() => {
    const onRequest = () => controllerRef.current?.togglePlay();
    window.addEventListener("dexa:toggle-sound", onRequest);
    return () => window.removeEventListener("dexa:toggle-sound", onRequest);
  }, []);

  /* The "On repeat" rows route through here: swap the embed to the
     requested track (the IFrame API has no load-uri, so the controller
     is recreated), then play it. */
  useEffect(() => {
    const onPlayTrack = (e: Event) => {
      const { uri, title, url } = (e as CustomEvent<TrackRequest>).detail;
      const api = apiRef.current;
      const holder = holderRef.current;
      if (apiBlocked || !api || !holder) {
        window.open(url, "_blank", "noopener,noreferrer");
        return;
      }
      trackRef.current = { uri, title, url };
      setPillTitle(title);
      publishTrack(uri);
      holder.innerHTML = "";
      controllerRef.current = null;
      api.createController(
        holder,
        { uri, width: "1", height: "1" },
        (controller) => {
          controllerRef.current = controller;
          controller.addListener("playback_update", (ev) => {
            const p = !ev.data.isPaused;
            setPlaying(p);
            publishSoundState(p);
          });
          controller.play();
        }
      );
    };
    window.addEventListener("dexa:play-track", onPlayTrack);
    return () => window.removeEventListener("dexa:play-track", onPlayTrack);
  }, [apiBlocked]);

  const toggle = useCallback(() => {
    const c = controllerRef.current;
    if (c) {
      c.togglePlay();
    } else if (apiBlocked) {
      /* Spotify embed blocked (e.g. ad-blocker): open the track instead. */
      window.open(trackRef.current.url, "_blank", "noopener,noreferrer");
    }
  }, [apiBlocked]);

  return (
    <>
      <div ref={holderRef} className="spotify-holder" aria-hidden="true" />
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
