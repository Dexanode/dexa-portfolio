/* Tiny pub/sub so the header SoundToggle and the bottom-nav sound button
   stay in sync while a single Spotify controller owns playback. */

type SoundListener = (playing: boolean) => void;

const listeners = new Set<SoundListener>();

export function subscribeSound(listener: SoundListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function publishSoundState(playing: boolean): void {
  listeners.forEach((l) => l(playing));
}

export function requestSoundToggle(): void {
  window.dispatchEvent(new CustomEvent("dexa:toggle-sound"));
}

/* ---- current-track pub/sub (drives the "On repeat" rows) ---- */

export type TrackRequest = { uri: string; title: string; url: string };

type TrackListener = (uri: string) => void;

const trackListeners = new Set<TrackListener>();

export function subscribeTrack(listener: TrackListener): () => void {
  trackListeners.add(listener);
  return () => {
    trackListeners.delete(listener);
  };
}

export function publishTrack(uri: string): void {
  trackListeners.forEach((l) => l(uri));
}

export function requestSoundTrack(req: TrackRequest): void {
  window.dispatchEvent(new CustomEvent("dexa:play-track", { detail: req }));
}
