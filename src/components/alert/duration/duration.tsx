import * as SliderLib from '@radix-ui/react-slider';
import duration from '~/assets/duration.svg';
import { timeToPixel } from '~/utils/timeline/time-converter';
import type { Milliseconds } from '~/types/types/custom';

export interface DurationProps {
  totalTime: Milliseconds;
  onTimestampChange: (timestamp: Milliseconds) => void;
}

export const Duration = (props: DurationProps) => {
  const { totalTime, onTimestampChange } = props;

  const [timestamp, setTimestamp] = useState<number[]>([0]);

  const handleTimestampChange = (value: number[]) => {
    setTimestamp(value);
    const timestampToMilliseconds = (timestamp[0] * totalTime) / 100;
    onTimestampChange(timestampToMilliseconds as Milliseconds);
  };

  return (
    <div
      className="relative ml-[162px] h-4 overflow-hidden bg-transparent"
      style={{ width: timeToPixel(totalTime) + 1 }}
    >
      <div className="absolute top-0 left-0 w-full">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <SliderLib.Root
              value={timestamp}
              onValueChange={handleTimestampChange}
              min={-1}
              max={101}
              step={1}
              className="relative flex w-full items-center"
            >
              <SliderLib.Track className="h-4 grow bg-transparent">
                <SliderLib.Range className="absolute h-full rounded bg-transparent" />
              </SliderLib.Track>
              <SliderLib.Thumb className="block h-4 w-4 rounded-full bg-primary-500 outline-none" />
            </SliderLib.Root>
          </div>
        </div>
      </div>

      <p>
        <img src={duration} alt="Duration timeline" className="h-4 w-[5800px] min-w-[5800px]" />
      </p>
    </div>
  );
};
