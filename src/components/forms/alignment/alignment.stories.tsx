import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Alignment } from './alignment';

export default {
  component: Alignment,
  title: 'Forms/Alignment',
} as ComponentMeta<typeof Alignment>;

const Template: ComponentStory<typeof Alignment> = (args) => <Alignment {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
