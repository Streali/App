import { useRef } from 'react';

export interface AlertVideoProps {
  src: string;
  muted: boolean;
  loop: boolean;
  id: string;
}

export const AlertAudio = (props: AlertVideoProps) => {
  const { src, loop, muted, id } = props;
  const audio = useRef<HTMLAudioElement>(null);

  return (
    <audio
      src={src}
      ref={audio}
      loop={loop}
      autoPlay
      muted={muted}
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
