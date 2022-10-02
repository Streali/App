import { useRef } from 'react';
import { AlertElementVideoSettings } from '../../../types/schemas/alert';
import type { Pixels } from '../../../types/types/custom';

export interface AlertVideoProps {
  settings: AlertElementVideoSettings;
  width: Pixels;
  height: Pixels;
  posX: Pixels;
  posY: Pixels;
  id: string;
}

export const AlertVideo = (props: AlertVideoProps) => {
  const { width, height, posX, posY, id, settings } = props;
  const video = useRef<HTMLVideoElement>(null);

  return (
    <video
      src={settings.url}
      ref={video}
      loop={settings.loop}
      autoPlay
      muted={settings.muted}
      className="draggable-alert absolute transition-colors hover:outline hover:outline-1 hover:outline-white/30"
      style={{
        width: width,
        height: height,
        transform: `translate(${posX}px, ${posY}px)`,
      }}
      data-x={posX}
      data-y={posY}
      data-id={id}
    ></video>
  );
};
