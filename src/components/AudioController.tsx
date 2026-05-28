import { useEffect, useRef } from 'react';

type AudioControllerProps = {
  isMuted: boolean;
  source?: string;
};

export function AudioController({ isMuted, source }: AudioControllerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !source || isMuted) {
      return;
    }

    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Browser autoplay can be blocked until the user interacts with the page.
    });
  }, [isMuted, source]);

  return <audio ref={audioRef} src={source} preload="auto" />;
}
