import { hexToHsva } from '@uiw/color-convert';
import { ColorPicker } from '~/components/forms/color-picker/color-picker';
import { InputState } from '~/components/forms/input/input';
import { Label } from '~/components/forms/label/label';
import { Popover } from '~/components/popover/popover';
import type { ChangeEvent, ComponentPropsWithoutRef } from 'react';

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
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const input = useRef<HTMLLabelElement>(null);

  const stateClassName = {
    [InputState.Normal]: '',
    [InputState.Error]: '!border-error-500',
    [InputState.Success]: '!border-success-500',
  };

  const haveValueClassName =
    val.length > 0 && state === InputState.Normal ? `!border-primary-500` : '';

  const disabledClassName = inputProps.disabled ? '!bg-dark-400' : '';

  const onChangeTextValue = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const onChangePickerValue = (value: string) => {
    const newVal = value.substring(7) === 'ff' ? value.slice(0, 7) : value;
    setVal(newVal);
    onColorChange && onColorChange(newVal);
  };

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

  useEffect(() => {
    setVal(value);
  }, [value]);

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
              <div className="h-6 w-6 rounded" style={{ backgroundColor: val }}></div>
            </div>
          }
        >
          <ColorPicker color={hexaToHsva(val)} onChange={(e) => onChangePickerValue(e)} />
        </Popover>

        {haveInput && (
          <input
            type="text"
            className={`h-10 flex-1 rounded-md border border-transparent bg-dark-400 px-4 text-xs text-white outline-none transition focus:border-primary-500 ${stateClassName[state]} ${haveValueClassName} ${disabledClassName} ${inputProps.className}`}
            maxLength={9}
            value={val.includes('#') ? val.toUpperCase() : `#${val.toUpperCase()}`}
            onChange={(e) => onChangeTextValue(e)}
          />
        )}
      </div>
      {errorMessage && (
        <span className="mt-1.5 text-xs text-error-500" data-testid="input-errormessage">
          {errorMessage}
        </span>
      )}
    </label>
  );
};
