import { MentionsInput, Mention, SuggestionDataItem, MentionsInputProps } from 'react-mentions';
import './autocomplete.scss';

interface Option {
  trigger: string;
  options: SuggestionDataItem[];
}

export interface AutocompleteInputProps extends MentionsInputProps {
  value: string;
  options?: Option[];
  className?: string;
}

export const AutocompleteInput = (props: AutocompleteInputProps) => {
  const { value = '', options, ...rest } = props;
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (e: any) => {
    setCurrentValue(e.target.value);
    console.log(e.target.value);
  };

  return (
    <MentionsInput className="autocomplete" value={currentValue} onChange={handleChange} {...rest}>
      {options!.map((option) => (
        <Mention key={option.trigger} trigger={option.trigger} data={option.options} />
      ))}
    </MentionsInput>
  );
};
