import { AnimatePresence, motion } from 'framer-motion';
import { selectAnimation, selectAnimationOut } from '~/utils/chat/animations';
import type { AlertElementImageSettings } from '~/types/schemas/alert';
import type { Milliseconds, Pixels } from '~/types/types/custom';

export interface AlertImageProps {
  settings: AlertElementImageSettings;
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

export const AlertImage = (props: AlertImageProps) => {
  const {
    settings,
    width,
    height,
    posX,
    posY,
    id,
    lock = false,
    animation_in,
    animation_out,
    timestamp,
    start_time,
    duration,
  } = props;

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
          <div
            className={`absolute block  ${
              !lock &&
              'draggable-alert transition-colors hover:outline hover:outline-1 hover:outline-white/30'
            }`}
            style={{
              width: width,
              height: height,
              transform: `translate(${posX}px, ${posY}px)`,
            }}
            data-id={id}
            data-x={posX}
            data-y={posY}
          >
            <img src={settings.url} alt="img" className="h-full w-full object-cover" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
