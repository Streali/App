import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, ButtonColor, ButtonSize } from './button';

export default {
  component: Button,
  title: 'Button',
  argTypes: {
    color: {
      options: [ButtonColor.Primary, ButtonColor.Dark, ButtonColor.Error, ButtonColor.Accent],
      control: { type: 'select' },
    },
    size: {
      options: [
        ButtonSize.Normal,
        ButtonSize.Big,
        ButtonSize.Small,
        ButtonSize.Very_Small,
        ButtonSize.Micro,
      ],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Button',
};
