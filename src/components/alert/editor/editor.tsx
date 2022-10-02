import { useEffect } from 'react';
import { Pixels } from '../../../types/types/custom';
import interact from 'interactjs';
import { AlertText } from '../elements/text';
import { AlertLottie } from '../elements/lottie';
import { AlertVideo } from '../elements/video';
import AlertImage from '../elements/image';
import { AlertAudio } from '../elements/audio';

export interface EditorProps {
  width: Pixels;
  height: Pixels;
  onElementMove?: (id: string, x: Pixels, y: Pixels) => void;
  onElementResize?: (id: string, width: Pixels, height: Pixels) => void;
  isHover?: (hover: boolean) => void;
  elements: any[];
  onElementClick?: (id: string) => void;
}

export const Editor = (props: EditorProps) => {
  const { width, height, onElementMove, onElementResize, isHover, elements, onElementClick } =
    props;

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

  const resizeElement = (event: any) => {
    let { x, y } = event.target.dataset;
    const id = event.target.getAttribute('data-id');

    x = (parseFloat(x) || 0) + event.deltaRect.left;
    y = (parseFloat(y) || 0) + event.deltaRect.top;

    Object.assign(event.target.style, {
      width: `${event.rect.width}px`,
      height: `${event.rect.height}px`,
      transform: `translate(${x}px, ${y}px)`,
    });

    Object.assign(event.target.dataset, { x, y });

    isHover && isHover(true);
    onElementResize && onElementResize(id, event.rect.width, event.rect.height);
    onElementMove && onElementMove(id, x, y);
  };

  const moveElement = (event: any) => {
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    const id = target.getAttribute('data-id');
    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    isHover && isHover(true);
    onElementMove && onElementMove(id, x, y);
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
          {element.type === 'text' && (
            <AlertText
              width={element.width}
              height={element.height}
              posX={element.posX}
              posY={element.posY}
              settings={element.settings}
              id={element.id}
            />
          )}
          {element.type === 'image' && (
            <AlertImage
              id={element.id}
              src={element.settings.url}
              width={element.width}
              height={element.height}
              posX={element.posX}
              posY={element.posY}
            />
          )}
          {element.type === 'video' && (
            <AlertVideo
              muted={element.settings.muted}
              src={element.settings.url}
              loop={element.settings.loop}
              width={element.width}
              height={element.height}
              posX={element.posX}
              posY={element.posY}
              id={element.id}
            />
          )}
          {element.type === 'lottie' && (
            <AlertLottie
              play
              loop
              json={element.settings.url}
              width={element.width}
              height={element.height}
              posX={element.posX}
              posY={element.posY}
              id={element.id}
            />
          )}
          {element.type === 'audio' && (
            <AlertAudio
              src={element.settings.url}
              muted={element.settings.muted}
              loop={element.settings.loop}
              id={element.id}
            />
          )}
        </div>
      ))}
    </div>
  );
};
