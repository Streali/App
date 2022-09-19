import * as SliderLib from '@radix-ui/react-slider';
import { Label } from '../label/label';

export interface SliderProps {
  value?: number[];
  min?: number;
  max: number;
  step?: number;
  label?: string;
  labelClassName?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (value: number[]) => void;
}

export const Slider = (props: SliderProps) => {
  const {
    value = [0],
    min,
    max,
    step = 1,
    label,
    labelClassName,
    disabled = false,
    className = '',
    onChange,
  } = props;

  return (
    <div className={className}>
      {label && <Label className={`mb-3.5 ${labelClassName}`}>{label}</Label>}
      <SliderLib.Root
        defaultValue={value}
        onValueChange={(value) => onChange && onChange(value)}
        min={min}
        max={max}
        step={step}
        className="relative flex items-center w-full"
        disabled={disabled}>
        <SliderLib.Track className="bg-dark-300 grow rounded h-3">
          <SliderLib.Range
            className={`absolute rounded h-full ${disabled ? 'bg-dark-300' : 'bg-primary-500'}`}
          />
        </SliderLib.Track>
        <SliderLib.Thumb className={`block w-4 h-4 rounded-full outline-none bg-transparent`} />
      </SliderLib.Root>
    </div>
  );
};
