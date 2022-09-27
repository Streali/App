import { Milliseconds } from '../../../types/types/custom';
import { timeToPixel } from '../../../utils/timeline/time-converter';
import duration from '../../../assets/duration.svg';

export interface DurationProps {
  totalTime: Milliseconds;
}

export const Duration = (props: DurationProps) => {
  const { totalTime } = props;
  return (
    <div
      className="ml-[162px] h-4 overflow-hidden bg-dark-400"
      style={{ width: timeToPixel(totalTime) + 1 }}
    >
      <p>
        <img src={duration} alt="Duration timeline" className="h-4 w-[5800px] min-w-[5800px]" />
      </p>
    </div>
  );
};
