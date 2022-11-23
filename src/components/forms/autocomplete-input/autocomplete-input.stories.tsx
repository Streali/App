import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IconSVG } from '~/components/icon/icon';
import { InputState } from '../input/input';
import { AutocompleteInput } from './autocomplete-input';

export default {
  component: AutocompleteInput,
  title: 'Forms/AutocompleteInput',
  argTypes: {
    state: {
      options: [InputState.Normal, InputState.Error, InputState.Success],
      defaultValue: InputState.Normal,
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof AutocompleteInput>;

const Template: ComponentStory<typeof AutocompleteInput> = (args) => (
  <AutocompleteInput {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Autocomplete Input',
  placeholder: 'Enter some text here',
  errorMessage: '',
  onChange: (target, newValue, newPlainText, mentions) =>
    console.log(target, newValue, newPlainText, mentions),
  options: [
    {
      trigger: '@',
      options: [
        {
          id: '1',
          display: 'John Doe',
        },
        {
          id: '2',
          display: 'Jane Doe',
        },
      ],
    },
    {
      trigger: '#',
      options: [
        {
          id: '1',
          display: 'React',
        },
        {
          id: '2',
          display: 'Angular',
        },
      ],
    },
  ],
};
