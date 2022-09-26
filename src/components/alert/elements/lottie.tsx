import Lottie from 'lottie-react';
import { useEffect, useRef } from 'react';
import { Pixels } from '../../../types/types/custom';

export interface AlertLottieProps {
  play: boolean;
  json: any;
  loop: boolean;
  width: Pixels;
  height: Pixels;
  posX: Pixels;
  posY: Pixels;
}

export const AlertLottie = (props: AlertLottieProps) => {
  const { play, json, loop, width, height, posX, posY } = props;

  const animation = useRef<any>(null);

  useEffect(() => {
    if (play) {
      animation.current.play();
    } else {
      animation.current.stop();
    }
  }, [play, loop, json]);

  return (
    <Lottie
      className="draggable-alert hover:outline hover:outline-1 hover:outline-white/30 transition-colors absolute"
      animationData={json}
      loop={loop}
      lottieRef={animation}
      style={{
        width: width,
        height: height,
        transform: `translate(${posX}px, ${posY}px)`,
      }}
      data-x={posX}
      data-y={posY}
    />
  );
};
