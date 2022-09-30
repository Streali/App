import Lottie from 'lottie-react';
import { useEffect, useRef, useState } from 'react';
import { useLottieJson } from '../../../hooks/elements/use-lottie-json';
import { Pixels } from '../../../types/types/custom';
import { testAnimation } from '../../../utils/lottie/test-lottie-animation';

export interface AlertLottieProps {
  play: boolean;
  json: any;
  loop: boolean;
  width: Pixels;
  height: Pixels;
  posX: Pixels;
  posY: Pixels;
  id: string;
}

export const AlertLottie = (props: AlertLottieProps) => {
  const { play, json, loop, width, height, posX, posY, id } = props;

  const animation = useRef<any>(null);
  const { data: animationData } = useLottieJson(json);

  useEffect(() => {
    if (animationData && play) {
      animation.current?.play();
    }
  }, [json]);

  // return <p>{JSON.stringify(animationData)}</p>;

  return (
    <>
      {animationData && (
        <Lottie
          className="draggable-alert absolute transition-colors hover:outline hover:outline-1 hover:outline-white/30"
          animationData={animationData}
          loop={loop}
          lottieRef={animation}
          style={{
            width: width,
            height: height,
            transform: `translate(${posX}px, ${posY}px)`,
          }}
          data-x={posX}
          data-y={posY}
          data-id={id}
        />
      )}
    </>
  );
};
