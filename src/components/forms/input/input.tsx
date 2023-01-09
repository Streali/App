import './input.scss';
import { Label } from '~/components/forms/label/label';
import { Icon, IconSVG } from '~/components/icon/icon';
import type { ChangeEvent, ComponentPropsWithoutRef } from 'react';

export enum InputState {
  Normal = 'normal',
  Error = 'error',
  Success = 'success',
}

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  value?: string;
  className?: string;
  labelClassName?: string;
  containerClassName?: string;
  state?: InputState;
  errorMessage?: string;
  onChange?: (event: ChangeEvent) => void;
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
    value = '',
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

  const [val, setVal] = useState<string>(value);

  const stateClassName = {
    [InputState.Normal]: '',
    [InputState.Error]: '!border-error-500',
    [InputState.Success]: '!border-success-500',
  };

  const haveValueClassName =
    val.length > 0 && state === InputState.Normal ? `!border-primary-500` : '';

  const disabledClassName = inputProps.disabled ? '!bg-dark-400' : '';

  const onChangeValue = (event: ChangeEvent) => {
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
        value={value}
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
