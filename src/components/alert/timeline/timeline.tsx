//import interact from 'interactjs';
import Draggable from 'react-draggable';
import { useEffect, useRef, useState } from 'react';
import { Milliseconds, Pixels } from '../../../types/types/custom';
import { pixelToTime, timeToPixel } from '../../../utils/timeline/time-converter';
import { Icon } from '../../icon/icon';
import { ResizableBox } from 'react-resizable';

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
  id: string;
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
    id,
  } = props;
  const containerDrag = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<Pixels>(0 as Pixels);
  const [left, setLeft] = useState<Pixels>(0 as Pixels);
  const [disabledDrag, setDisabledDrag] = useState<boolean>(false);

  const elementIcon = {
    image: 'image-line',
    video: 'film-line',
    text: 'text',
    audio: 'music-fill',
    lottie: 'pencil-ruler-2-line',
  };

  useEffect(() => {
    setWidth(timeToPixel(duration));
    setLeft(timeToPixel(startTime));
  }, [duration, startTime]);

  return (
    <div
      className="relative h-10 w-full rounded bg-transparent"
      style={{
        width: `${timeToPixel(totalTime)}px`,
      }}
      ref={containerDrag}>
      <Draggable
        axis="x"
        disabled={disabledDrag}
        defaultPosition={{ x: left, y: 0 }}
        bounds="parent"
        onStop={(e, data) => {
          setLeft(data.x as Pixels);
          onElementMove && onElementMove(pixelToTime(data.x as Pixels));
        }}
        scale={1}>
        <ResizableBox
          axis="x"
          width={width}
          height={40}
          className="relative"
          handleSize={[20, 20]}
          minConstraints={[100, 40]}
          maxConstraints={[timeToPixel(totalTime), 40]}
          handle={
            <span
              className="absolute right-0.5 top-0.5 flex h-9 w-5 cursor-ew-resize items-center justify-center rounded bg-black"
              onMouseOver={() => setDisabledDrag(true)}
              onMouseOut={() => setDisabledDrag(false)}>
              <Icon name="menu-5-line" className="text-xs" />
            </span>
          }
          onResizeStop={(e, data) => {
            onElementResize && onElementResize(pixelToTime(data.size.width as Pixels));
          }}>
          <div
            className={`relative flex h-10 w-full cursor-grab items-center gap-2 overflow-hidden rounded px-1.5`}
            style={{ background: color }}
            onClick={onClick}>
            <div className="w-7 h-7 rounded-sm flex items-center justify-center bg-white shrink-0">
              <Icon name={elementIcon[type]} className="text-black" />
            </div>
            <p className="whitespace-nowrap text-sm font-bold">{title}</p>
          </div>
        </ResizableBox>
      </Draggable>
    </div>
  );
};
