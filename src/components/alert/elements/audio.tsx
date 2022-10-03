import { useRef } from 'react';
import type { AlertElementAudioSettings } from '~/types/schemas/alert';

export interface AlertAudioProps {
  settings: AlertElementAudioSettings;
  id: string;
}

export const AlertAudio = (props: AlertAudioProps) => {
  const { settings, id } = props;
  const audio = useRef<HTMLAudioElement>(null);

  return (
    <audio
      src={settings.url}
      ref={audio}
      loop={settings.loop}
      autoPlay
      muted={settings.muted}
      className="absolute transition-colors hover:outline hover:outline-1 hover:outline-white/30"
      style={{
        width: 0,
        height: 0,
        transform: `translate(${0}px, ${0}px)`,
      }}
      data-x={0}
      data-y={0}
      data-id={id}
    ></audio>
  );
};
