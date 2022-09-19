import React, { useState } from 'react';
import { Label } from '../label/label';

export enum InputState {
  Normal = 'normal',
  Error = 'error',
  Success = 'success',
}

export interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  className?: string;
  labelClassName?: string;
  containerClassName?: string;
  state?: InputState;
  errorMessage?: string;
  onChange?: (event: React.ChangeEvent) => void;
}

export const Input = (props: InputProps) => {
  const {
    label,
    labelClassName = '',
    className = '',
    containerClassName = '',
    state = InputState.Normal,
    errorMessage,
    onChange,
    ...inputProps
  } = props;

  const [val, setVal] = useState<string>('');

  const stateClassName = {
    [InputState.Normal]: '',
    [InputState.Error]: '!border-error-500',
    [InputState.Success]: '!border-success-500',
  };

  const haveValueClassName =
    val.length > 0 && state === InputState.Normal ? `!border-primary-300` : '';

  const disabledClassName = inputProps.disabled ? '!bg-dark-400' : '';

  const onChangeValue = (event: React.ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    setVal(value);
    onChange && onChange(event);
  };

  return (
    <label className={containerClassName}>
      {label && <Label className={labelClassName}>{label}</Label>}
      <input
        className={`h-10 w-full border border-transparent text-xs text-white bg-dark-400 rounded-md px-4 outline-none focus:border-primary-300 transition ${stateClassName[state]} ${haveValueClassName} ${disabledClassName} ${className}`}
        data-testid="input"
        onChange={onChangeValue}
        {...inputProps}
      />
      {errorMessage && (
        <span className="text-xs text-error-500 mt-1.5" data-testid="input-errormessage">
          {errorMessage}
        </span>
      )}
    </label>
  );
};
