import { ComponentStory, ComponentMeta } from '@storybook/react';
import { File } from './file';

export default {
  component: File,
  title: 'Forms/File',
} as ComponentMeta<typeof File>;

const Template: ComponentStory<typeof File> = (args) => <File {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
