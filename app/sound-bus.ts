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
