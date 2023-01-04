import './select.scss';
import ReactSelect, { MultiValue, SingleValue } from 'react-select';
import { Label } from '~/components/forms/label/label';

export enum SelectState {
  Normal = 'normal',
  Error = 'error',
  Success = 'success',
}

export interface SelectProps {
  options: { value: string; label: string }[];
  onChange?: (
    value:
      | SingleValue<{ value: string; label: string }>
      | MultiValue<{ value: string; label: string }>
  ) => void;
  placeholder?: string;
  state?: SelectState;
  label?: string;
  labelClassName?: string;
  className?: string;
  errorMessage?: string;
  disabled?: boolean;
  defaultValue?: { value: string; label: string };
  multiple?: boolean;
  containerClassName?: string;
  isPortal?: boolean;
  placement?: 'top' | 'auto' | 'bottom';
}

export const Select = (props: SelectProps) => {
  const {
    options,
    onChange,
    placeholder,
    state = SelectState.Normal,
    label,
    labelClassName = '',
    className = '',
    errorMessage,
    disabled = false,
    defaultValue,
    multiple = false,
    containerClassName = '',
    isPortal = true,
    placement = 'auto',
  } = props;

  const [val, setVal] = useState<
    | SingleValue<{
        value: string;
        label: string;
      }>
    | MultiValue<{ value: string; label: string }>
    | null
  >(null);

  const handleChange = (
    value:
      | SingleValue<{ value: string; label: string }>
      | MultiValue<{ value: string; label: string }>
  ) => {
    setVal(value);
    onChange && onChange(value);
  };

  const hasValueClassName = val ? 'select--has-value' : '';

  const isDisabledClassName = disabled ? 'select--disabled' : '';

  const stateClassName = {
    [SelectState.Normal]: '',
    [SelectState.Error]: 'select--error',
    [SelectState.Success]: 'select--success',
  };

  return (
    <label className={containerClassName}>
      {label && <Label className={labelClassName}>{label}</Label>}
      <ReactSelect
        options={options}
        isMulti={multiple}
        classNamePrefix="select"
        className={`${hasValueClassName} ${isDisabledClassName} ${stateClassName[state]} ${className}`}
        onChange={handleChange}
        placeholder={placeholder ? placeholder : 'Select...'}
        data-testid="select"
        isDisabled={disabled}
        value={defaultValue}
        menuPortalTarget={typeof document !== 'undefined' && isPortal ? document.body : null}
        menuPlacement={placement}
      />
      {errorMessage && (
        <span className="mt-1.5 text-xs text-error-500" data-testid="input-errormessage">
          {errorMessage}
        </span>
      )}
    </label>
  );
};
