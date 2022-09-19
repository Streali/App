import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Slider } from './slider';

export default {
  component: Slider,
  title: 'Forms/Slider',
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  max: 100,
  min: 0,
  value: [50],
  step: 1,
  label: 'Slider',
};
