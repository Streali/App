import { useRef } from 'react';
import { useEffect } from 'react';
import { Pixels } from '../../../types/types/custom';

export interface AlertVideoProps {
  src: string;
  muted: boolean;
  loop: boolean;
  width: Pixels;
  height: Pixels;
  posX: Pixels;
  posY: Pixels;
  id: string;
}

export const AlertVideo = (props: AlertVideoProps) => {
  const { src, loop, width, height, posX, posY, muted, id } = props;
  const video = useRef<HTMLVideoElement>(null);

  return (
    <video
      src={src}
      ref={video}
      loop={loop}
      autoPlay
      muted={muted}
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
