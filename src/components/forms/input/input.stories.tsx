import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input, InputState } from './input';

export default {
  component: Input,
  title: 'Forms/Input',
  argTypes: {
    state: {
      options: [InputState.Normal, InputState.Error, InputState.Success],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Label Input',
  disabled: false,
  prefix: 'px',
  suffix: '$',
};
