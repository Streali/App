import * as SliderLib from '@radix-ui/react-slider';
import { useEffect, useState } from 'react';
import { Input } from '~/components/forms/input/input';
import { Label } from '~/components/forms/label/label';

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
  haveInput?: boolean;
  inputSuffix?: string;
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
    haveInput = false,
    inputSuffix,
  } = props;

  const [val, setVal] = useState<number[]>(value);

  useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <div className={className}>
      {label && <Label className={`mb-3.5 ${labelClassName}`}>{label}</Label>}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <SliderLib.Root
            value={val}
            onValueChange={(value) => {
              setVal(value);
              onChange && onChange(value);
            }}
            min={min}
            max={max}
            step={step}
            className="relative flex w-full items-center"
            disabled={disabled}
          >
            <SliderLib.Track className="h-3 grow rounded bg-dark-300">
              <SliderLib.Range
                className={`absolute h-full rounded ${disabled ? 'bg-dark-300' : 'bg-primary-500'}`}
              />
            </SliderLib.Track>
            <SliderLib.Thumb className={`block h-4 w-4 rounded-full bg-transparent outline-none`} />
          </SliderLib.Root>
        </div>
        {haveInput && (
          <Input
            className="!w-20"
            min={min}
            max={max}
            type="number"
            value={val[0]}
            suffix={inputSuffix}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setVal([target.valueAsNumber]);
            }}
          />
        )}
      </div>
    </div>
  );
};
