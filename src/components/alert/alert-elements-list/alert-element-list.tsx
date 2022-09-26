import { Milliseconds } from '../../../types/types/custom';
import { timeToPixel } from '../../../utils/timeline/time-converter';
import { Button, ButtonColor, ButtonSize } from '../../button/button';
import { Color } from '../../forms/color/color';
import { Duration } from '../duration/duration';
import { Timeline } from '../timeline/timeline';

export interface AlertElementsListProps {
  elements: any[];
  totalTime: Milliseconds;
  onDeleteElement?: (id: string) => void;
  onColorChange?: (id: string, color: string) => void;
  onStartChange?: (id: string, startTime: Milliseconds) => void;
  onDurationChange?: (id: string, duration: Milliseconds) => void;
}

export const AlertElementsList = (props: AlertElementsListProps) => {
  const { elements, totalTime, onDeleteElement, onColorChange, onDurationChange, onStartChange } =
    props;

  return (
    <div className="w-full h-[300px] bg-dark-600 rounded-xl overflow-y-auto custom-scrollbar">
      <div>
        <Duration totalTime={totalTime} />
      </div>
      {[...elements].reverse().map((element, index) => (
        <div
          key={element.id}
          className="pl-4 py-2 flex gap-2 items-center border-b border-dark-400"
          style={{ width: timeToPixel(totalTime) + 171 + 'px' }}>
          <div className="flex gap-2 items-center h-12">
            <Button
              buttonIcon="delete-bin-line"
              color={ButtonColor.Error}
              size={ButtonSize.Small}
              onClick={() => onDeleteElement && onDeleteElement(element.id)}
            />
            <Button buttonIcon="menu-5-line" color={ButtonColor.Dark} size={ButtonSize.Small} />
            <Color
              haveInput={false}
              onColorChange={(value) => onColorChange && onColorChange(element.id, value)}
            />
          </div>
          <Timeline
            type={element.type}
            id={element.id}
            title={element.title}
            totalTime={totalTime}
            color={element.color}
            duration={element.duration}
            startTime={element.startTime}
            onElementMove={(startTime) => onStartChange && onStartChange(element.id, startTime)}
            onElementResize={(duration) =>
              onDurationChange && onDurationChange(element.id, duration)
            }
          />
        </div>
      ))}
    </div>
  );
};
