import interact from 'interactjs';
import { useEffect, useRef } from 'react';
import { Milliseconds, Pixels } from '../../../types/types/custom';
import { pixelToTime, timeToPixel } from '../../../utils/timeline/time-converter';
import { Icon } from '../../icon/icon';

export interface TimelineProps {
  className?: string;
  onElementMove?: (startTime: Milliseconds) => void;
  onElementResize?: (duration: Milliseconds) => void;
  type: 'image' | 'video' | 'text' | 'audio' | 'lottie';
  title: string;
  duration: Milliseconds;
  startTime: Milliseconds;
  totalTime: Milliseconds;
  onClick?: () => void;
  color?: string;
}

export const Timeline = (props: TimelineProps) => {
  const {
    onElementMove,
    onElementResize,
    type,
    title,
    duration,
    startTime,
    totalTime,
    onClick,
    color = '#ff0000',
  } = props;
  const containerDrag = useRef<HTMLDivElement>(null);

  const elementIcon = {
    image: 'image-line',
    video: 'film-line',
    text: 'text',
    audio: 'music-fill',
    lottie: 'pencil-ruler-2-line',
  };

  const initInteract = () => {
    const container = interact('.draggable');

    container
      .draggable({
        listeners: {
          move: moveElement,
        },
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
          }),
        ],
      })
      .resizable({
        edges: {
          left: false,
          right: true,
          bottom: false,
          top: false,
        },
        listeners: {
          move: resizeElement,
        },
      });
  };

  const resizeElement = (event: any) => {
    onElementResize && onElementResize(pixelToTime(event.rect.width as Pixels));
    Object.assign(event.target.style, {
      width: `${timeToPixel(duration)}px`,
    });
  };

  const moveElement = (event: any) => {
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    onElementMove && onElementMove(pixelToTime(x as Pixels));
    target.setAttribute('data-x', x);
  };

  useEffect(() => {
    initInteract();
  }, [duration, startTime]);

  return (
    <div
      className="w-full h-10 bg-dark-600 rounded"
      style={{
        width: `${timeToPixel(totalTime)}px`,
      }}
      ref={containerDrag}>
      <div
        className={`h-full w-20 rounded draggable relative flex items-center px-1.5 overflow-hidden gap-2`}
        style={{
          transform: `translateX(${timeToPixel(startTime as Milliseconds)}px)`,
          width: `${timeToPixel(duration)}px`,
          maxWidth: `${timeToPixel(totalTime)}px`,
          background: color,
        }}
        onClick={onClick}>
        <div className="w-7 h-7 rounded-sm flex items-center justify-center bg-white shrink-0">
          <Icon name={elementIcon[type]} className="text-black" />
        </div>
        <p className="whitespace-nowrap font-bold text-sm">{title}</p>
      </div>
    </div>
  );
};
