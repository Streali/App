import * as React from 'react';
import { hexToHsva } from '@uiw/color-convert';
import { useRef, useState } from 'react';
import { InputState } from '../input/input';
import { Label } from '../label/label';
import { ColorPicker } from '../color-picker/color-picker';
import { useEffect } from 'react';

export interface ColorProps extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  state?: InputState;
  errorMessage?: string;
  value?: string;
  onColorChange?: (value: string) => void;
}

export const Color = (props: ColorProps) => {
  const {
    label,
    labelClassName = '',
    containerClassName = '',
    state = InputState.Normal,
    errorMessage,
    onColorChange,
    value = '#ff0000',
    ...inputProps
  } = props;

  const [val, setVal] = useState<string>(value || '#000000');
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const input = useRef<HTMLLabelElement>(null);
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);

  const stateClassName = {
    [InputState.Normal]: '',
    [InputState.Error]: '!border-error-500',
    [InputState.Success]: '!border-success-500',
  };

  const haveValueClassName =
    val.length > 0 && state === InputState.Normal ? `!border-primary-300` : '';

  const disabledClassName = inputProps.disabled ? '!bg-dark-400' : '';

  const onChangeTextValue = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setTop(input.current?.offsetTop || 0);
    setLeft(input.current?.offsetLeft || 0);
  }, [input]);

  return (
    <label className={`relative block ${containerClassName}`} ref={input}>
      {label && <Label className={labelClassName}>{label}</Label>}
      <div
        className={`h-10 w-full border-2 border-dark-300 text-sm text-white flex items-center gap-2 bg-dark-500 rounded-md px-4 outline-none focus:border-primary-300 transition ${stateClassName[state]} ${haveValueClassName} ${disabledClassName} ${inputProps.className}`}
        {...inputProps}
      >
        {showPicker && input.current && (
          <>
            <ColorPicker
              top={top}
              left={left}
              className=""
              color={hexaToHsva(val)}
              onChange={(e) => onChangePickerValue(e)}
            />
            <div
              className="fixed w-screen h-screen top-0 left-0"
              onClick={() => setShowPicker(false)}
            />
          </>
        )}
        <div
          onClick={() => setShowPicker(true)}
          className="w-4 h-4 rounded-sm border border-dark-300"
          style={{ backgroundColor: val }}
        ></div>
        <input
          type="text"
          className="flex grow bg-transparent border-none outline-none"
          maxLength={9}
          value={val.includes('#') ? val.toUpperCase() : `#${val.toUpperCase()}`}
          onChange={(e) => onChangeTextValue(e)}
        />
      </div>
      {errorMessage && (
        <span className="text-xs text-error-500 mt-1.5" data-testid="input-errormessage">
          {errorMessage}
        </span>
      )}
    </label>
  );
};

export default Color;
