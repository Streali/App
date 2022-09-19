import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox } from './checkbox';

export default {
  component: Checkbox,
  title: 'Forms/Checkbox',
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Label Checkbox',
};
