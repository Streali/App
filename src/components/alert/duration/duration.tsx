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
      className="bg-dark-400 overflow-hidden h-4 ml-[162px]"
      style={{ width: timeToPixel(totalTime) + 1 }}>
      <p>
        <img src={duration} alt="Duration timeline" className="w-[5800px] min-w-[5800px] h-4" />
      </p>
    </div>
  );
};
