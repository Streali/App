import {
  Editor,
  EditorState,
  EditorProps,
  CompositeDecorator,
  ContentBlock,
  DraftComponent,
} from 'draft-js';
import { ReactNode } from 'react';
import { InputState } from '../input/input';
import { Label } from '../label/label';
import './autocomplete-input.scss';

interface Option {
  trigger: string;
  color?: string;
  optionClass?: string;
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

const findWithRegex = (
  regex: RegExp,
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void
) => {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
};

const strategies = (options: Option[]) => {
  return options.map((option) => {
    const regex = new RegExp(`\\B(\\${option.trigger}[a-zA-Z]+\\b)(?!;)`, 'g');
    const { color, optionClass } = option;
    return {
      strategy: (contentBlock: ContentBlock, callback: (start: number, end: number) => void) =>
        findWithRegex(regex, contentBlock, callback),
      component: (props: { children: ReactNode }) => {
        return (
          <span
            className={`font-bold ${!color && 'text-primary-500'} ${option.optionClass}`}
            style={{ color }}
          >
            {props.children}
          </span>
        );
      },
    };
  });
};

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

  const decorator = new CompositeDecorator([...strategies(options)]);

  console.log(decorator);

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorator));
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
