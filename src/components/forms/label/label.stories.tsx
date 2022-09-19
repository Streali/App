import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Label } from './label';

export default {
  component: Label,
  title: 'Forms/Label',
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Label',
};
