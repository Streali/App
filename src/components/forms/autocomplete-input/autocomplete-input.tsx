import {
  MentionsInput,
  Mention,
  SuggestionDataItem,
  MentionsInputProps,
  OnChangeHandlerFunc,
} from 'react-mentions';

import { InputState } from '../input/input';
import { Label } from '../label/label';
import './autocomplete-input.scss';

interface Option {
  trigger: string;
  options: SuggestionDataItem[];
}

export interface AutocompleteInputProps extends Omit<MentionsInputProps, 'children'> {
  label?: string;
  value: string;
  className?: string;
  labelClassName?: string;
  containerClassName?: string;
  state?: InputState;
  errorMessage?: string;
  options: Option[];
  disabled?: boolean;
}

export const AutocompleteInput = (props: AutocompleteInputProps) => {
  const {
    label,
    value = '',
    labelClassName = '',
    className = '',
    containerClassName = '',
    state = InputState.Normal,
    errorMessage,
    onChange,
    options,
    ...inputProps
  } = props;

  const [currentValue, setCurrentValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const stateClassName = {
    [InputState.Normal]: '',
    [InputState.Error]: '!border-error-500',
    [InputState.Success]: '!border-success-500',
  };

  const haveValueClassName =
    value.length > 0 && state === InputState.Normal ? `!border-primary-500` : '';

  const disabledClassName = inputProps.disabled ? '!bg-dark-400' : '';

  const handleChange: OnChangeHandlerFunc = (target, newValue, newPlainText, mentions) => {
    setCurrentValue(newValue);
    onChange?.(target, newValue, newPlainText, mentions);
  };

  const inputContainerClassName = `w-full cursor-text rounded-lg bg-dark-400 text-xs text-white py-[11px] px-4 transition border border-transparent ${
    isFocused ? 'border-primary-500' : ''
  } ${stateClassName[state]} ${haveValueClassName} ${disabledClassName} ${className} ${className}`;

  return (
    <label className={`relative block ${containerClassName}`}>
      {label && <Label className={labelClassName}>{label}</Label>}
      <div className={inputContainerClassName}>
        <MentionsInput
          className="autocomplete"
          value={currentValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...inputProps}
        >
          {options?.map((option) => (
            <Mention
              key={option.trigger}
              trigger={option.trigger}
              data={option.options}
              markup={'{{__display__}}'}
            />
          ))}
        </MentionsInput>
      </div>
      {errorMessage && (
        <span className="mt-1.5 text-xs text-error-500" data-testid="input-errormessage">
          {errorMessage}
        </span>
      )}
    </label>
  );
};
