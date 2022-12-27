import { ComponentStory, ComponentMeta } from '@storybook/react';
import CodeEditor from './code-editor';

export default {
  component: CodeEditor,
  title: 'CodeEditor',
} as ComponentMeta<typeof CodeEditor>;

const Template: ComponentStory<typeof CodeEditor> = (args) => <CodeEditor {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  initialValue: '<p>Coucou</p>',
  className: 'h-screen',
  language: 'css',
};
