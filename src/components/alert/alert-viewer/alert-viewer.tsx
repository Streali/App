import { useEffect, useState } from 'react';
import type {
  AlertElementAudioSettings,
  AlertElementImageSettings,
  AlertElementLottieSettings,
  AlertElements,
  AlertElementTextSettings,
  AlertElementVideoSettings,
} from '../../../types/schemas/alert';
import type { Milliseconds, Pixels } from '../../../types/types/custom';
import { AlertAudio } from '../elements/audio';
import { AlertImage } from '../elements/image';
import { AlertLottie } from '../elements/lottie';
import { AlertText } from '../elements/text';
import { AlertVideo } from '../elements/video';

export interface AlertViewerProps {
  width: Pixels;
  height: Pixels;
  elements: AlertElements;
  totalTime: Milliseconds;
}

export const AlertViewer = (props: AlertViewerProps) => {
  const { width, height, elements, totalTime } = props;

  const [timestamp, setTimestamp] = useState<Milliseconds>(0 as Milliseconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp((prev) => (prev + 100) as Milliseconds);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (timestamp >= totalTime) {
    setTimestamp(0 as Milliseconds);
  }

  return (
    <div className="relative overflow-hidden bg-transparent" style={{ width, height }}>
      {elements.map((element) => (
        <div key={element.id}>
          {timestamp >= element.start_time && timestamp <= element.start_time + element.duration && (
            <>
              {element.type === 'text' && (
                <AlertText
                  width={element.width as Pixels}
                  height={element.height as Pixels}
                  posX={element.posX as Pixels}
                  posY={element.posY as Pixels}
                  settings={element.settings as AlertElementTextSettings}
                  id={element.id}
                  lock
                />
              )}
              {element.type === 'image' && (
                <AlertImage
                  id={element.id}
                  settings={element.settings as AlertElementImageSettings}
                  width={element.width as Pixels}
                  height={element.height as Pixels}
                  posX={element.posX as Pixels}
                  posY={element.posY as Pixels}
                  lock
                />
              )}
              {element.type === 'video' && (
                <AlertVideo
                  settings={element.settings as AlertElementVideoSettings}
                  width={element.width as Pixels}
                  height={element.height as Pixels}
                  posX={element.posX as Pixels}
                  posY={element.posY as Pixels}
                  id={element.id}
                  lock
                />
              )}
              {element.type === 'lottie' && (
                <AlertLottie
                  settings={element.settings as AlertElementLottieSettings}
                  width={element.width as Pixels}
                  height={element.height as Pixels}
                  posX={element.posX as Pixels}
                  posY={element.posY as Pixels}
                  id={element.id}
                  lock
                />
              )}
              {element.type === 'audio' && (
                <AlertAudio
                  settings={element.settings as AlertElementAudioSettings}
                  id={element.id}
                />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};
