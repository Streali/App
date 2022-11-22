import { Editor, EditorState, EditorProps } from 'draft-js';
import { ChangeEvent } from 'react';
import { InputState } from '../input/input';
import { Label } from '../label/label';
import './autocomplete-input.scss';

interface Option {
  trigger: string;
  color?: string;
  options: {
    id: string | number;
    display: string;
  }[];
}

export interface AutocompleteInputProps extends EditorProps {
  label?: string;
  className?: string;
  labelClassName?: string;
  containerClassName?: string;
  state?: InputState;
  errorMessage?: string;
  onChange: (event: EditorState) => void;
  options: Option[];
  disabled?: boolean;
}

export const AutocompleteInput = (props: AutocompleteInputProps) => {
  const {
    label,
    labelClassName = '',
    className = '',
    containerClassName = '',
    state = InputState.Normal,
    errorMessage,
    onChange,
    options,
    ...inputProps
  } = props;
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [isFocused, setIsFocused] = useState(false);

  const stateClassName = {
    [InputState.Normal]: '',
    [InputState.Error]: '!border-error-500',
    [InputState.Success]: '!border-success-500',
  };

  const haveValueClassName =
    editorState.getCurrentContent().getPlainText().length > 0 && state === InputState.Normal
      ? `!border-primary-500`
      : '';

  const disabledClassName = inputProps.disabled ? '!bg-dark-400' : '';

  const handleChange = (state: EditorState) => {
    setEditorState(state);
    onChange(state);
  };

  const inputContainerClassName = `w-full cursor-text rounded-lg bg-dark-400 text-xs text-white py-[11px] px-4 transition border border-transparent ${
    isFocused ? 'border-primary-500' : ''
  } ${stateClassName[state]} ${haveValueClassName} ${disabledClassName} ${className} ${className}`;

  return (
    <label className={`relative block ${containerClassName}`}>
      {label && <Label className={labelClassName}>{label}</Label>}
      <div className={inputContainerClassName}>
        <Editor
          {...inputProps}
          editorState={editorState}
          onChange={(e) => handleChange(e)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      {errorMessage && (
        <span className="mt-1.5 text-xs text-error-500" data-testid="input-errormessage">
          {errorMessage}
        </span>
      )}
    </label>
  );
};
