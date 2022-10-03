import './radio.scss';
import { Label } from '~/components/forms/label/label';
import type { ComponentPropsWithoutRef } from 'react';

export interface RadioProps extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  labelClassName?: string;
}

export const Radio = (props: RadioProps) => {
  const { label, labelClassName, ...inputProps } = props;

  const disabledClassName = props.disabled ? 'before:bg-dark-400' : '';

  return (
    <label className={`flex items-center gap-6`}>
      <input
        type="radio"
        className={`checked:after:content[''] relative -mt-[22px] h-0 w-0 outline-none before:absolute before:top-0 before:left-0 before:block before:h-4 before:w-4 before:rounded-full before:border-2 before:border-dark-300 before:content-[''] checked:before:border-primary-300 checked:after:mt-1 checked:after:ml-1 checked:after:block checked:after:h-2 checked:after:w-2 checked:after:rounded-full checked:after:bg-primary-300 focus:before:border-primary-300 ${disabledClassName}`}
        {...inputProps}
      />
      {label && <Label className={`mb-0 !text-sm font-normal ${labelClassName}`}>{label}</Label>}
    </label>
  );
};
