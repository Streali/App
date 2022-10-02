import { useEffect } from 'react';
import { Milliseconds, Pixels } from '../../../types/types/custom';
import interact from 'interactjs';
import { AlertText } from '../elements/text';
import { AlertLottie } from '../elements/lottie';
import { AlertVideo } from '../elements/video';
import { AlertImage } from '../elements/image';
import { AlertAudio } from '../elements/audio';
import type {
  AlertElementAudioSettings,
  AlertElementImageSettings,
  AlertElementLottieSettings,
  AlertElements,
  AlertElementTextSettings,
  AlertElementVideoSettings,
} from '../../../types/schemas/alert';

export interface EditorProps {
  width: Pixels;
  height: Pixels;
  onElementMove?: (id: string, x: Pixels, y: Pixels) => void;
  onElementResize?: (id: string, width: Pixels, height: Pixels) => void;
  isHover?: (hover: boolean) => void;
  elements: AlertElements;
  onElementClick?: (id: string) => void;
  zoom: number;
  timestamp: Milliseconds;
}

export const Editor = (props: EditorProps) => {
  const {
    width,
    height,
    onElementMove,
    onElementResize,
    isHover,
    elements,
    onElementClick,
    zoom,
    timestamp,
  } = props;

  const initInteract = () => {
    const container = interact('.draggable-alert');

    container
      .draggable({
        listeners: {
          move: moveElement,
        },
      })
      .resizable({
        edges: {
          left: true,
          right: true,
          bottom: true,
          top: true,
        },
        listeners: {
          move: resizeElement,
        },
      });
  };

  const resizeElement = (event: Interact.ResizeEvent) => {
    const { x, y } = event.target.dataset;
    const id = event.target.getAttribute('data-id');

    if (event.deltaRect && x && y && id) {
      const newX = (parseFloat(x) || 0) + event.deltaRect.left;
      const newY = (parseFloat(y) || 0) + event.deltaRect.top;

      const width = event.rect.width;
      const height = event.rect.height;

      event.target.style.width = `${width}px`;
      event.target.style.height = `${height}px`;
      event.target.style.transform = `translate(${newX}px, ${newY}px)`;

      event.target.setAttribute('data-x', newX.toString());
      event.target.setAttribute('data-y', newY.toString());

      isHover && isHover(true);
      onElementResize &&
        onElementResize(id, event.rect.width as Pixels, event.rect.height as Pixels);
      onElementMove && onElementMove(id, newX as Pixels, newY as Pixels);
    }
  };

  const moveElement = (event: Interact.DragEvent) => {
    const target = event.target;
    const dataX = target.getAttribute('data-x');
    const dataY = target.getAttribute('data-y');
    const id = target.getAttribute('data-id');

    if (dataX && dataY && id) {
      const x = (parseFloat(dataX) || 0) + event.dx / zoom;
      const y = (parseFloat(dataY) || 0) + event.dy / zoom;
      target.style.transform = `translate(${x}px, ${y}px)`;
      target.setAttribute('data-x', x.toString());
      target.setAttribute('data-y', y.toString());
      isHover && isHover(true);
      onElementMove && onElementMove(id, x as Pixels, y as Pixels);
    }
  };

  useEffect(() => {
    initInteract();
  }, [elements]);

  return (
    <div
      style={{ width, height }}
      onMouseOver={() => isHover && isHover(true)}
      onMouseLeave={() => isHover && isHover(false)}
      className="relative border-2 border-dark-300 bg-dark-400"
    >
      {elements.map((element) => (
        <div key={element.id} onClick={() => onElementClick?.(element.id)}>
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
