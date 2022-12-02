import { AnimatePresence, motion } from 'framer-motion';
import { selectAnimation, selectAnimationOut } from '~/utils/common/animations';
import type { AlertElementVideoSettings } from '~/types/schemas/alert';
import type { Milliseconds, Pixels } from '~/types/types/custom';

export interface AlertVideoProps {
  settings: AlertElementVideoSettings;
  width: Pixels;
  height: Pixels;
  posX: Pixels;
  posY: Pixels;
  id: string;
  lock?: boolean;
  animation_in: string;
  animation_out: string;
  timestamp: Milliseconds;
  start_time: Milliseconds;
  duration: Milliseconds;
}

export const AlertVideo = (props: AlertVideoProps) => {
  const {
    width,
    height,
    posX,
    posY,
    id,
    settings,
    lock = false,
    animation_in,
    animation_out,
    timestamp,
    start_time,
    duration,
  } = props;
  const video = useRef<HTMLVideoElement>(null);

  const animationVariants = {
    initial: selectAnimation(animation_in).initial,
    in: {
      ...selectAnimation(animation_in).animate,
      transition: selectAnimation(animation_in).transition,
    },
    out: {
      ...selectAnimationOut(animation_out).animate,
      transition: selectAnimationOut(animation_out).transition,
    },
  };

  return (
    <AnimatePresence>
      {timestamp >= start_time && timestamp <= start_time + duration && (
        <motion.div variants={animationVariants} initial="initial" animate="in" exit="out">
          <video
            src={settings.url}
            ref={video}
            autoPlay
            muted
            loop
            className={`absolute block  ${
              !lock &&
              'draggable-alert transition-colors hover:outline hover:outline-1 hover:outline-white/30'
            }`}
            style={{
              width: width,
              height: height,
              transform: `translate(${posX}px, ${posY}px)`,
            }}
            data-x={posX}
            data-y={posY}
            data-id={id}
          ></video>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
