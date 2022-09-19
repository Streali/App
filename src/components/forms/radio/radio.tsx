import { Label } from '../label/label';

export interface RadioProps extends React.ComponentPropsWithoutRef<'input'> {
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
        className={`w-0 h-0 -mt-[22px] relative before:content-[''] before:absolute before:top-0 before:left-0 before:block before:w-4 before:h-4 before:border-2 before:border-dark-300 before:rounded-full focus:before:border-primary-300 outline-none checked:before:border-primary-300 checked:after:content[''] checked:after:block checked:after:w-2 checked:after:h-2 checked:after:bg-primary-300 checked:after:rounded-full checked:after:mt-1 checked:after:ml-1 ${disabledClassName}`}
        {...inputProps}
      />
      {label && <Label className={`!text-sm font-normal mb-0 ${labelClassName}`}>{label}</Label>}
    </label>
  );
};
