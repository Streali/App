import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IconSVG } from '../../icon/icon';
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

const Template: ComponentStory<typeof Input> = (args) => (
  <div className="flex flex-col gap-4">
    <Input {...args} suffix="px" prefix="$" />
    <Input {...args} suffixIcon={IconSVG.BorderRight} prefixIcon={IconSVG.BorderLeft} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Label Input',
  disabled: false,
};
