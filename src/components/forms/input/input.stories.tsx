import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IconSVG } from '~/components/icon/icon';
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
    <Input {...args} suffixIconSvg={IconSVG.BorderRight} prefixIconSvg={IconSVG.BorderLeft} />
    <Input {...args} suffixIcon="pencil-line" prefixIcon="ruler-line" />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Label Input',
  disabled: false,
};
