import Lottie, { LottieRef } from 'lottie-react';
import { useEffect, useRef } from 'react';
import { useLottieJson } from '../../../hooks/elements/use-lottie-json';
import type { AlertElementLottieSettings } from '../../../types/schemas/alert';
import type { Pixels } from '../../../types/types/custom';

export interface AlertLottieProps {
  settings: AlertElementLottieSettings;
  width: Pixels;
  height: Pixels;
  posX: Pixels;
  posY: Pixels;
  id: string;
}

export const AlertLottie = (props: AlertLottieProps) => {
  const { width, height, posX, posY, id, settings } = props;

  const animation = useRef<any>(null);
  const { data: animationData } = useLottieJson(settings.url);

  useEffect(() => {
    if (animationData) {
      animation.current?.play();
    }
  }, [settings]);

  return (
    <>
      {animationData && (
        <Lottie
          className="draggable-alert absolute transition-colors hover:outline hover:outline-1 hover:outline-white/30"
          animationData={animationData}
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
