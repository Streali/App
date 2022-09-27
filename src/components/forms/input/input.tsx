import React, { useState } from 'react';
import { Icon, IconSVG } from '../../icon/icon';
import { Label } from '../label/label';
import './input.scss';

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
  prefixIconSvg?: IconSVG;
  prefixIcon?: string;
  prefix?: string;
  suffixIconSvg?: IconSVG;
  suffixIcon?: string;
  suffix?: string;
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
    prefixIcon,
    prefixIconSvg,
    prefix,
    suffixIcon,
    suffixIconSvg,
    suffix,
    ...inputProps
  } = props;

  const [val, setVal] = useState<string>('');

  const stateClassName = {
    [InputState.Normal]: '',
    [InputState.Error]: '!border-error-500',
    [InputState.Success]: '!border-success-500',
  };

  const haveValueClassName =
    val.length > 0 && state === InputState.Normal ? `!border-primary-500` : '';

  const disabledClassName = inputProps.disabled ? '!bg-dark-400' : '';

  const onChangeValue = (event: React.ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    setVal(value);
    onChange && onChange(event);
  };

  return (
    <label className={`relative block ${containerClassName}`}>
      {label && <Label className={labelClassName}>{label}</Label>}
      {(prefixIconSvg || prefixIcon) && (
        <Icon
          svg={prefixIconSvg}
          name={prefixIcon}
          width={32}
          height={32}
          className="absolute bottom-1 left-1 inline-flex  h-8 items-center rounded bg-dark-500 px-2 leading-none"
        />
      )}
      {prefix && (
        <span className="absolute bottom-1 left-1 inline-flex  h-8 items-center rounded bg-dark-500 px-2 leading-none">
          {prefix}
        </span>
      )}
      {(suffixIconSvg || suffixIcon) && (
        <Icon
          svg={suffixIconSvg}
          name={suffixIcon}
          width={32}
          height={32}
          className="absolute bottom-1 right-1 inline-flex h-8 items-center rounded bg-dark-500 px-2 text-xs font-bold leading-none"
        />
      )}
      {suffix && (
        <span className="absolute bottom-1 right-1 inline-flex h-8 items-center rounded bg-dark-500 px-2 text-xs font-bold leading-none">
          {suffix}
        </span>
      )}
      <input
        className={`h-10 w-full rounded-lg border border-transparent bg-dark-400 text-xs text-white outline-none transition focus:border-primary-500 ${
          prefix || prefixIcon || prefixIconSvg ? 'pl-11' : 'pl-4'
        } ${suffix || suffixIcon || suffixIconSvg ? 'pr-11' : 'pr-4'} ${
          stateClassName[state]
        } ${haveValueClassName} ${disabledClassName} ${className}`}
        data-testid="input"
        onChange={onChangeValue}
        {...inputProps}
      />
      {errorMessage && (
        <span className="mt-1.5 text-xs text-error-500" data-testid="input-errormessage">
          {errorMessage}
        </span>
      )}
    </label>
  );
};
