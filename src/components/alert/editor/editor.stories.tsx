import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Pixels } from '../../../types/types/custom';
import { Editor } from './editor';

export default {
  component: Editor,
  title: 'Alert/Editor',
} as ComponentMeta<typeof Editor>;

const Template: ComponentStory<typeof Editor> = (args) => <Editor {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  width: 500 as Pixels,
  height: 500 as Pixels,
};
