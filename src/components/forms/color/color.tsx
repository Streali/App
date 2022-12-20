import { hexToHsva } from '@uiw/color-convert';
import TransparencyBg from '~/assets/transparency-bg.png';
import { ColorPicker } from '~/components/forms/color-picker/color-picker';
import { InputState } from '~/components/forms/input/input';
import { Label } from '~/components/forms/label/label';
import { Popover } from '~/components/popover/popover';
import type { ChangeEvent, ComponentPropsWithoutRef } from 'react';
import './color.scss';

export interface ColorProps extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  haveInput?: boolean;
  state?: InputState;
  errorMessage?: string;
  value?: string;
  onColorChange?: (value: string) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

const hexToDecimal = (hex: string) => {
  return parseInt(hex, 16);
};

const hexaToHsva = (hexa: string) => {
  const { h, s, v } = hexToHsva(hexa);
  return {
    h,
    s,
    v,
    a: hexa.length > 7 ? hexToDecimal(hexa.substring(7)) / 255 : 1,
  };
};

export const Color = (props: ColorProps) => {
  const {
    label,
    haveInput = true,
    labelClassName = '',
    containerClassName = '',
    state = InputState.Normal,
    errorMessage,
    onColorChange,
    value = '#ff0000',
    side = 'bottom',
    align = 'start',
    ...inputProps
  } = props;

  const [val, setVal] = useState<string>(value || '#000000');
  const [hsva, setHsva] = useState<{ h: number; s: number; v: number; a: number }>(
    hexaToHsva(value) || { h: 0, s: 0, v: 0, a: 1 }
  );
  const [error, setError] = useState<string | undefined>(errorMessage);
  const [currentState, setCurrentState] = useState<InputState>(state);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const input = useRef<HTMLLabelElement>(null);

  const stateClassName = {
    [InputState.Normal]: '',
    [InputState.Error]: 'color-picker__input--error !border-error-500 ',
    [InputState.Success]: 'color-picker__input--success !border-success-500 ',
  };

  const haveValueClassName =
    val.length > 0 && state === InputState.Normal ? `!border-primary-500` : '';

  const disabledClassName = inputProps.disabled ? '!bg-dark-400' : '';

  const onChangeTextValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    const hexRegex = /^#(?:[0-9a-fA-F]{3,4}){1,2}$/;

    if (hexRegex.test(newVal)) {
      setError('');
      setCurrentState(InputState.Normal);
      setHsva(hexaToHsva(newVal));
    }

    if (!hexRegex.test(newVal)) {
      setError('Invalid color');
      setCurrentState(InputState.Error);
    }

    setVal(newVal);
  };

  const onChangePickerValue = (value: string) => {
    const newVal = value.substring(7) === 'ff' ? value.slice(0, 7) : value;
    setVal(newVal);
    setHsva(hexaToHsva(newVal));
    onColorChange?.(newVal);
  };

  return (
    <label className={`relative block ${containerClassName}`} ref={input}>
      {label && <Label className={labelClassName}>{label}</Label>}
      <div className="flex items-center gap-2">
        <Popover
          open={showPicker}
          className="!p-0"
          width="220px"
          onOpenChange={(open) => setShowPicker(open)}
          align={align}
          side={side}
          trigger={
            <div
              onClick={() => setShowPicker(true)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-dark-400"
            >
              <div className="relative h-6 w-6 overflow-hidden rounded">
                <div className="absolute h-full w-full" style={{ backgroundColor: val }} />
                <img src={TransparencyBg} alt="transparency background" />
              </div>
            </div>
          }
        >
          <ColorPicker color={hsva} onChange={(e) => onChangePickerValue(e)} />
        </Popover>

        {haveInput && (
          <input
            type="text"
            className={`${stateClassName[currentState]} h-10 flex-1 rounded-md border border-transparent bg-dark-400 px-4 text-xs text-white outline-none transition focus:border-primary-500  ${haveValueClassName} ${disabledClassName} ${inputProps.className}`}
            maxLength={9}
            value={val.includes('#') ? val.toUpperCase() : `#${val.toUpperCase()}`}
            onChange={(e) => onChangeTextValue(e)}
          />
        )}
      </div>
      {error && (
        <span className="mt-1.5 text-xs text-error-500" data-testid="input-errormessage">
          {error}
        </span>
      )}
    </label>
  );
};
