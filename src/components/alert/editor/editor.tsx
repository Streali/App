import { useEffect } from 'react';
import { Pixels } from '../../../types/types/custom';
import interact from 'interactjs';
import { AlertText } from '../elements/text';
import { testAnimation } from '../../../utils/lottie/test-lottie-animation';
import { AlertLottie } from '../elements/lottie';
import { AlertVideo } from '../elements/video';
import AlertImage from '../elements/image';

export interface EditorProps {
  width: Pixels;
  height: Pixels;
  onElementMove?: (x: Pixels, y: Pixels) => void;
  onElementResize?: (width: Pixels, height: Pixels) => void;
  isHover?: (hover: boolean) => void;
  elements: any[];
}

export const Editor = (props: EditorProps) => {
  const { width, height, onElementMove, onElementResize, isHover, elements } = props;

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

    x = (parseFloat(x) || 0) + event.deltaRect.left;
    y = (parseFloat(y) || 0) + event.deltaRect.top;

    Object.assign(event.target.style, {
      width: `${event.rect.width}px`,
      height: `${event.rect.height}px`,
      transform: `translate(${x}px, ${y}px)`,
    });

    Object.assign(event.target.dataset, { x, y });

    isHover && isHover(true);
    onElementResize && onElementResize(event.rect.width, event.rect.height);
    onElementMove && onElementMove(x, y);
  };

  const moveElement = (event: any) => {
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    isHover && isHover(true);
    onElementMove && onElementMove(x, y);
  };

  useEffect(() => {
    initInteract();
  }, []);

  return (
    <div
      style={{ width, height }}
      onMouseOver={() => isHover && isHover(true)}
      onMouseLeave={() => isHover && isHover(false)}
      className="rounded-md border-2 border-dark-300 bg-dark-400 relative">
      {elements.map((element, index) => (
        <div key={index}>
          {element.type === 'text' && (
            <AlertText
              text="Coucou ça va ?"
              width={200 as Pixels}
              height={50 as Pixels}
              posX={50 as Pixels}
              posY={400 as Pixels}
              settings={{ color: 'red' }}
            />
          )}
          {element.type === 'image' && (
            <AlertImage
              src="https://seeklogo.com/images/T/twitch-logo-4931D91F85-seeklogo.com.png"
              width={100 as Pixels}
              height={100 as Pixels}
              posX={200 as Pixels}
              posY={200 as Pixels}
            />
          )}
          {element.type === 'video' && (
            <AlertVideo
              src="https://dl8.webmfiles.org/big-buck-bunny_trailer.webm"
              play={true}
              loop={true}
              width={200 as Pixels}
              height={100 as Pixels}
              posX={50 as Pixels}
              posY={50 as Pixels}
            />
          )}
          {element.type === 'lottie' && (
            <AlertLottie
              play={true}
              loop
              json={testAnimation}
              width={300 as Pixels}
              height={300 as Pixels}
              posX={10 as Pixels}
              posY={50 as Pixels}
            />
          )}
        </div>
      ))}
    </div>
  );
};
