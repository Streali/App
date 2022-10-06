import { Milliseconds } from '~/types/types/custom';
import type { AlertElementAudioSettings } from '~/types/schemas/alert';

export interface AlertAudioProps {
  settings: AlertElementAudioSettings;
  id: string;
  timestamp: Milliseconds;
  start_time: Milliseconds;
  duration: Milliseconds;
}

export const AlertAudio = (props: AlertAudioProps) => {
  const { settings, id, timestamp, start_time, duration } = props;
  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audio.current) {
      audio.current.play();
    }

    return () => {
      if (audio.current) {
        audio.current.pause();
      }
    };
  }, [audio]);

  return (
    <>
      {timestamp >= start_time && timestamp <= start_time + duration && (
        <audio
          src={settings.url}
          ref={audio}
          autoPlay
          loop
          data-x={0}
          data-y={0}
          data-id={id}
          className="absolute -top-[9999px] -left-[9999px] -z-[9999]"
          controls
        ></audio>
      )}
    </>
  );
};
