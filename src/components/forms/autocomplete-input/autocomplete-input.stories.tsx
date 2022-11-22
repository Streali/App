import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IconSVG } from '~/components/icon/icon';
import { AutocompleteInput } from './autocomplete-input';

export default {
  component: AutocompleteInput,
  title: 'Forms/AutocompleteInput',
} as ComponentMeta<typeof AutocompleteInput>;

const Template: ComponentStory<typeof AutocompleteInput> = (args) => (
  <AutocompleteInput {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'Enter some text here',
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
