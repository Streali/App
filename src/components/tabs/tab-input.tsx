import type { ComponentPropsWithoutRef } from 'react';
import { InputState } from '../forms/input/input';

export interface TabInputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  className?: string;
  state?: InputState;
}

const stateClassName = {
  [InputState.Normal]: '',
  [InputState.Error]: 'color-picker__input--error',
  [InputState.Success]: 'color-picker__input--success ',
};

export const TabInput = (props: TabInputProps) => {
  const { label, className = '', state = InputState.Normal, ...InputProps } = props;

  const resetInputStyle =
    'bg-transparent border-transparent appearance-none focus:outline-none focus:shadow-outline ';

  const focusInputStyle =
    'focus:text-white border-b border-transparent focus:border-primary-400 focus:border-solid focus:border-b';

  return (
    <label className="flex gap-0.5 text-xs">
      <label className="text-light-200">{label?.toUpperCase()}</label>
      <input
        className={`appearance-none text-left font-bold text-dark-100 focus:text-white ${focusInputStyle} ${resetInputStyle} ${className} ${stateClassName[state]}`}
        {...InputProps}
      />
    </label>
  );
};
