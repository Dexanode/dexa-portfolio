"use client";

import { useEffect, useState } from "react";
import { requestSoundTrack } from "./sound-bus";

/* Hidden BMTH easter egg: type "bmth" anywhere (outside form fields) and
   the site goes metal for a second — screen shake, a giant BLEGH! flash
   (Oli Sykes' signature bark), and DArkSide starts playing through the
   sound pill. Respects reduced-motion: sound only, no shake/flash. */

const CODE = "bmth";
const TRACK = {
  videoId: "3Nt37RGbVjo",
  title: "Bring Me The Horizon — DArkSide",
  url: "https://www.youtube.com/watch?v=3Nt37RGbVjo",
};

export default function EasterEgg() {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    let buffer = "";
    let timer = 0;

    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.tagName === "SELECT" ||
          el.isContentEditable)
      ) {
        return;
      }
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-CODE.length);
      if (buffer !== CODE) return;
      buffer = "";

      // The music always plays; the visuals honor reduced motion.
      requestSoundTrack(TRACK);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      document.body.classList.add("bmth-shake");
      setFlash(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        document.body.classList.remove("bmth-shake");
        setFlash(false);
      }, 1500);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
      document.body.classList.remove("bmth-shake");
    };
  }, []);

  if (!flash) return null;
  return (
    <div className="blegh-flash" aria-hidden="true">
      <span>BLEGH!</span>
    </div>
  );
}
