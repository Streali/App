import { Label } from '../label/label';
import './checkbox.scss';

export interface CheckboxProps extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  labelClassName?: string;
}

export const Checkbox = (props: CheckboxProps) => {
  const { label, labelClassName, ...inputProps } = props;

  const disabledClassName = props.disabled ? 'before:bg-dark-400' : '';

  return (
    <label className={`flex items-center gap-6`}>
      <input
        type="checkbox"
        className={`checked:after:content[''] relative -mt-[22px] h-0 w-0 outline-none before:absolute before:top-0 before:left-0 before:block before:h-4 before:w-4 before:rounded-sm before:border-2 before:border-dark-300 before:content-[''] checked:before:border-primary-300 checked:after:mt-1 checked:after:ml-1 checked:after:block checked:after:h-2 checked:after:w-2 checked:after:bg-primary-300 focus:before:border-primary-300 ${disabledClassName}`}
        {...inputProps}
      />
      {label && <Label className={`mb-0 !text-sm font-normal ${labelClassName}`}>{label}</Label>}
    </label>
  );
};
