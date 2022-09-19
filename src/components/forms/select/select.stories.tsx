import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Select } from './select';

export default {
  component: Select,
  title: 'Forms/Select',
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
];

export const Primary = Template.bind({});
Primary.args = {
  options: options,
};
